import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { closeModal, openModal } from "../utils/utils.js";
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
const addNewCardButton = document.querySelector("#profile-add-button")
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

  /*********************************************************************************************/
  /***************************************FUNCTIONS*********************************************/
  /*********************************************************************************************/
  
const newCardPopup = new PopupWithForm('#profile-add-modal',  handleProfileEditSubmit)

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
  
  
  const userInfo = new UserInfo( profileTitle , profileDescription  );
  
  const editFormValidator = new FormValidator(options, profileEditForm);
  editFormValidator.enableValidation();
  
  const addCardValidator = new FormValidator(options, addForm)
  addCardValidator.enableValidation();
  
  const imagePreviewPopup = new PopupWithImage(".card__image");
  imagePreviewPopup.setEventListeners();

  
  editPopup.setEventListeners();
  
  profileEditButton.addEventListener("click", function () {
    const userData = userInfo.getUserInfo();
    nameInputValue.value = userData.name;
    professionInputValue.value = userData.profession;
    editPopup.open();
  });

  function handleImageClick({ name, link }) {
    PopupWithImage.openPopupWindow({ name, link });
  };
  
  addCardButton.addEventListener("click", function () {
    addFormValidator.disableSubmitButton();
    addCardPopup.open();
  });


  /*********************************************************************************************/
  /***************************************EVENT HANDLERS****************************************/
  /*********************************************************************************************/
  
  function createCard(cardData) {
    const card = new Card(cardData, cardSelector, handlePreviewClick)
    return card.getView()
  }
  
  function renderCard(cardData) {
    const cardElement = createCard(cardData);
    cardContainerElement.prepend(cardElement);
  }
  
  function handleProfileEditSubmit(e){
    e.preventDefault();
    // profileTitle.textContent = profileTitleInput.value;
    // profileDescription.textContent = profileDescriptionInput.value;
    userInfo.setUserInfo(profileTitleInput.value , profileDescriptionInput.value)
    closeModal(profileEditModal);
  
  } 
  
  function fillProfileForm(){
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  };
  
  function openProfileForm(){
    fillProfileForm();
    openModal(profileEditModal);
  };
  
  function handleAddCard(e) {
    e.preventDefault();
    const name = titleInputField.value;
    const link = linkInputField.value;
    renderCard( {name , link} , cardsWrap )
    closeModal(profileAddModal);
    addForm.reset();
    //this.querySelector('.modal__button').classList.toggle('modal__button_disabled')
    addCardValidator.toggleButtonState();
  };

  function handlePreviewClick(cardData){
    console.log(cardData)
    // const modalPreview = document.querySelector("#preview")
    // const modalImage = document.querySelector(".modal__preview-image");
    // const imageTitle = document.querySelector(".modal__caption");
    // modalImage.src = this._link;
    // modalImage.alt = "Image of " + this._name;
    // imageTitle.textContent = this._name;
    // openModal(modalPreview);
  popupWithImage.openPopupWindow(cardData);
}
  
  /*********************************************************************************************/
  /***********************************EVENT LISTENERS*******************************************/
  /*********************************************************************************************/
  
  profileEditButton.addEventListener('click' , openProfileForm);
  profileCloseEditModal.addEventListener('click' , () => closeModal(profileEditModal));  
  profileCloseAddModal.addEventListener('click' , () => closeModal(profileAddModal));
  profileEditForm.addEventListener('submit' , handleProfileEditSubmit);
  addNewCardButton.addEventListener('click' , () => openModal(profileAddModal));
  addForm.addEventListener("submit" , handleAddCard);
  previewModalCloseButton.addEventListener('click' , () => closeModal(previewModal));
  
  initialCards.forEach((cardData) => renderCard(cardData , cardsWrap));

