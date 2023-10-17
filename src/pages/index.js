import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, cardData, options, cardSelector } from "../utils/constants.js";
import '../pages/index.css';
import Popup from "../components/Popup";
import { data } from "autoprefixer";
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileTitleInput = document.querySelector("#edit-modal-input-title");
const profileDescriptionInput = document.querySelector("#edit-modal-input-description");
const addCardButton = document.querySelector("#profile-add-button")
const addForm = document.querySelector("#add-form");
const profileAvatar = document.querySelector("#profile-avatar");
const profileAvatarEdit = document.querySelector("#avatar-btn");
const avatarForm = document.querySelector("#avatar-form");
export const imagePreview = document.querySelector(".modal__preview");
export const popupImage = imagePreview.querySelector(".modal__preview-image");
export const popupImageTitle = imagePreview.querySelector(".modal__caption");

const addCardPopup = new PopupWithForm('#profile-add-modal', handleAddCardSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('#profile-edit-modal', handleProfileEditSubmit);
editProfilePopup.setEventListeners();

const editFormValidator = new FormValidator(options, profileEditForm);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(options, addForm)
addCardValidator.enableValidation();

const avatarValidator = new FormValidator(options, avatarForm)
avatarValidator.enableValidation();

const imagePreviewPopup = new PopupWithImage("#preview-modal");
imagePreviewPopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation({ popupSelector: options.deletePopup });
confirmationPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-modal", handleAvatarChange);
avatarPopup.setEventListeners();

const api = new Api({
  url: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "0d8f734d-caf1-45e3-b9d3-764b4099955a",
    "Content-Type": "application/json"
  }
});

let cardSection;

const renderCard = (data) => {
  const card = createCard(data);
  cardSection.addItem(card);
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      options.cardList
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo(
  profileTitle,
  profileDescription,
  profileAvatar
);

function createCard(data) {
  const cardElement = new Card(
    {
      data,
      handleImageClick: (imgData) => {
        imagePreviewPopup.open(imgData);
      },
      handleDeleteClick: () => {
        confirmationPopup.open(() => {
          confirmationPopup.renderLoading(true);
          api.deleteCard(data._id)
            .then(() => {
              cardElement.removeCard();
              confirmationPopup.close();
            })
            .catch(() => console.log(console.error))
            .finally(() => confirmationPopup.renderLoading(false));
        });
      },
      handleLikeClick: () => {
        if (cardElement.isLiked()) {
          api
            .removeLike(cardElement.cardId)
            .then((res) => {
              cardElement.setLikes(res.isLiked);
            })
            .catch((err) => {
              console.log(console.error);
            });
        } else {
          api
            .addLike(cardElement.cardId)
            .then((res) => {
              cardElement.setLikes(res.isLiked);
            })
            .catch((err) => {
              console.log(console.error);
            });
        }
      },
      userId: userInfo.getId(),
    },
    options.cardTemplate
  );
  return cardElement.getView();
}


function handleProfileEditSubmit(data) {
  api.updateProfile(data.name, data.profession)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .catch((err) => {
      console.log(console.error);
    });
  editProfilePopup.close();
}

function handleAvatarChange(data) {
  api.updateAvatar(data)
    .then((data) => {
      avatarPopup.renderLoading(false)
      userInfo.setUserInfo(data)
    })
    .then(avatarPopup.close)
    .finally(avatarPopup.renderLoading(true))
    .catch((err) => {
      console.log(console.error);
    });

}

function handleAddCardSubmit(data) {
  api.uploadCard(data)
    .then((res) => {
      const card = createCard(res);
      addCardPopup.renderLoading(true);
      cardSection.addItem(card);
    })
    .then(addCardPopup.close)
    .finally(() => {
      addCardPopup.renderLoading(false)})
    .catch((err) => {
      console.error(err);
    });;
}

function openProfileForm(e) {
  const { profession, name } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = profession;
  editProfilePopup.open();
};

profileEditButton.addEventListener('click', (e) => openProfileForm(e));

addCardButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardValidator.resetValidation();
});

profileAvatarEdit.addEventListener('click', () => {
  avatarPopup.open();
  avatarValidator.resetValidation();
});


