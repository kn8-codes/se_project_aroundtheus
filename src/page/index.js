import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, cardData, options , cardSelector } from "../utils/constants.js";
import '../page/index.css';
import Popup from "../components/Popup";


const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardButton = document.querySelector("#profile-add-button")
const addForm = document.querySelector("#add-form");
const previewModal = document.querySelector("#preview");

const addCardPopup = new PopupWithForm('#profile-add-modal', handleAddCardSubmit );
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('#profile-edit-modal', handleProfileEditSubmit);
editProfilePopup.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    },
  },
  ".cards__container"
);
section.renderItems()

export const imagePreview = document.querySelector(".modal__preview");
export const popupImage = imagePreview.querySelector(".modal__preview-image");
export const popupImageTitle = imagePreview.querySelector(".modal__caption");

const userInfo = new UserInfo(profileTitle, profileDescription);

const editFormValidator = new FormValidator(options, profileEditForm);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(options, addForm)
addCardValidator.enableValidation();

const imagePreviewPopup = new PopupWithImage("#preview_modal");
imagePreviewPopup.setEventListeners();

function handleImageClick(data) {
  imagePreviewPopup.open(data);
};


function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick)
  return card.getView()
}

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data.name, data.profession)
  editProfilePopup.close()
}  

function handleAddCardSubmit(data){
  const cardElement = createCard(data);
  section.addItem(cardElement);
  addCardValidator.resetValidation();
  addCardPopup.close();
}

function openProfileForm() {
  userInfo.getUserInfo();
  userInfo.setUserInfo();
  editProfilePopup.open();
};

profileEditButton.addEventListener('click', openProfileForm);
addCardButton.addEventListener('click', () => addCardPopup.open());
previewModal.addEventListener('click', () => imagePreviewPopup.open());



