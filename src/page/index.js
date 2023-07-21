import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import { closeModal, openModal } from "../utils/utils.js";
import { initialCards, cardData, options } from "../utils/constants.js";
import '../page/index.css';

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
const overlay = document.querySelector(".page");
const modalPreviewPictureCaption = previewModal.querySelector(".modal__caption");
const openedModal = document.querySelector(".modal_opened");
const cardSelector = '#card-template'

  /*********************************************************************************************/
  /***************************************FUNCTIONS*********************************************/
  /*********************************************************************************************/
  
  function createCard(cardData) {
    const card = new Card(cardData, cardSelector)
    return card.getView()
  }
  
  function renderCard(cardData) {
    const cardElement = createCard(cardData);
    cardContainerElement.prepend(cardElement);
  }

  /*********************************************************************************************/
  /***************************************EVENT HANDLERS****************************************/
  /*********************************************************************************************/
  
  function handleProfileEditSubmit(e){
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
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


const editFormValidator = new FormValidator(options, profileEditForm);
const addCardValidator = new FormValidator(options, addForm)
editFormValidator.enableValidation();
addCardValidator.enableValidation();