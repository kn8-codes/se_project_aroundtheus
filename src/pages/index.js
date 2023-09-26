import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, cardData, options , cardSelector } from "../utils/constants.js";
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
const profileAvatar = document.querySelector("#profile-avatar");
const addCardButton = document.querySelector("#profile-add-button")
const addForm = document.querySelector("#add-form");
const previewModal = document.querySelector("#preview");
const deleteConfirmationButton = document.querySelector("#delete-confirm");
const avatarChangeButton = document.querySelector("#avatar-save");

const addCardPopup = new PopupWithForm('#profile-add-modal', handleAddCardSubmit );
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('#profile-edit-modal', handleProfileEditSubmit);
editProfilePopup.setEventListeners();

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






export const imagePreview = document.querySelector(".modal__preview");
export const popupImage = imagePreview.querySelector(".modal__preview-image");
export const popupImageTitle = imagePreview.querySelector(".modal__caption");

const userInfo = new UserInfo(
  profileTitle, 
  profileDescription,
  profileAvatar
  );

const editFormValidator = new FormValidator(options, profileEditForm);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(options, addForm)
addCardValidator.enableValidation();

const imagePreviewPopup = new PopupWithImage("#preview");
imagePreviewPopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation({popupSelector: options.deletePopup});
confirmationPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-modal", () => {});
avatarPopup.setEventListeners();

function handleImageClick(data) {
  imagePreviewPopup.open(data);
};



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
              confirmationPopup.closePopup();
            })
            .catch((err) => console.log(`An error occured: ${err}`))
            .finally(() => confirmationPopup.renderLoading(false));
        });
      },
      handleLikeClick: () => {
        if (cardElement.isLiked()) {
          api
            .removeLike(cardElement._cardId)
            .then((res) => {
              cardElement.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`An error occured: ${err}`);
            });
        } else {
          api
            .addLike(cardElement._cardId)
            .then((res) => {
              cardElement.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`An error occured: ${err}`);
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
    console.log(`An error occured: ${err}`);
  });
  editProfilePopup.close();
}  

function handleAvatarChange(data) {
  api.updateAvatar(data)
  .then((data) => {
    console.log("here")
  })
  .catch((err) => {
    console.log(`An error occured: ${err}`);
  });
  editProfilePopup.close();
}  

function handleAddCardSubmit(data){
  api.uploadCard(data)
    .then((res) => {
      console.log(res);
      createCard(res);
      cardSection.addItem(res);
      cardSection.renderItems();
      addCardPopup.close();
    })
  .catch((err) => {
    console.log(`An error occured: ${err}`);
  });;
}

function handleConfirmDelete(data) {
  api.deleteCard(data).then((res) => {console.log(res)})
  confirmationPopup.close();
};

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
previewModal.addEventListener('click', () => imagePreviewPopup.open());
console.log(avatarPopup)
profileAvatar.addEventListener('click', () => avatarPopup.open());

deleteConfirmationButton.addEventListener("click", handleConfirmDelete());
avatarChangeButton.addEventListener("click", handleAvatarChange())

