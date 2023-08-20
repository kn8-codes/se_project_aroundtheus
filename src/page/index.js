import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, cardData, options } from "../utils/constants.js";
import '../page/index.css';
import Popup from "../components/Popup";

/*********************************************************************************************/
/***************************************ELEMENTS**********************************************/
/*********************************************************************************************/

//const cardsContainer = document.querySelector(".cards"); 
const cardsWrap = document.querySelector(".cards__list")
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileCloseEditModal = profileEditModal.querySelector("#profile-edit-close");
const profileCloseAddModal = profileAddModal.querySelector("#profile-add-close");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#edit-modal-input-title");
const profileDescriptionInput = document.querySelector("#edit-modal-input-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardContainerElement = document.querySelector(".cards__container");
//const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const addCardButton = document.querySelector("#profile-add-button")
const addForm = document.querySelector("#add-form");
const titleInputField = document.querySelector("#title");
const linkInputField = document.querySelector("#link");
//const createButton = document.querySelector("#create-btn");
const previewModal = document.querySelector("#preview");
//const previewModalImage = previewModal.querySelector(".modal__preview-image");
const previewModalCloseButton = previewModal.querySelector("#preview-close");
//const overlay = document.querySelector(".page");
//const modalPreviewPictureCaption = previewModal.querySelector(".modal__caption");
//const openedModal = document.querySelector(".modal_opened");
const cardSelector = '#card-template'
  
const addCardPopup = new PopupWithForm('#profile-add-modal',  handleProfileEditSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('#profile-edit-modal');
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
export const popupImageTitle = imagePreview.querySelector(
  ".modal__caption"
);
  
  
const userInfo = new UserInfo(profileTitle , profileDescription);

const editFormValidator = new FormValidator(options, profileEditForm);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(options, addForm)
addCardValidator.enableValidation();

const imagePreviewPopup = new PopupWithImage("#preview_modal");
imagePreviewPopup.setEventListeners();

function handleImageClick(data) {
  imagePreviewPopup.open(data);
};

addCardButton.addEventListener("click", () => {
  addCardValidator.toggleButtonState();
  addCardPopup.open();
});

/*
 * Events
 */
function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick)
  return card.getView()
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardContainerElement.prepend(cardElement);
}

function handleProfileEditSubmit(e){
//   console.log(e);
//   e.preventDefault();
  userInfo.setUserInfo(profileTitleInput.value , profileDescriptionInput.value)
  editProfilePopup.close();

} 

function fillProfileForm(){
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

function openProfileForm(){
  fillProfileForm();
  editProfilePopup.open();
};

function handleAddCard(e) {
  e.preventDefault();
  const name = titleInputField.value;
  const link = linkInputField.value;
  renderCard( {name , link} , cardsWrap )
  addForm.reset();
  addCardValidator.toggleButtonState();
};


profileEditButton.addEventListener('click' , openProfileForm);
profileCloseEditModal.addEventListener('click' , () => addCardPopup.close());  
profileCloseAddModal.addEventListener('click' , () => editProfilePopup.close());
profileEditForm.addEventListener('submit' , handleProfileEditSubmit);
addCardButton.addEventListener('click' , () => addCardPopup.open());
addForm.addEventListener("submit" , handleAddCard);
previewModalCloseButton.addEventListener('click' , () => imagePreviewPopup.close());
previewModal.addEventListener('click', () => imagePreviewPopup.open());

initialCards.forEach((cardData) => renderCard(cardData , cardsWrap));

