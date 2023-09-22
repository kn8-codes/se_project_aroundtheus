// export const initialCards = [
//     {
//       name: "Yosemite Valley",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//     },
  
//     {
//       name: "Lake Louise",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//     },
  
//     {
//       name: "Bald Mountains",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//     },
  
//     {
//       name: "Latemar",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//     },
  
//     {
//       name: "Vanoise National Park",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//     },
  
//     {
//       name: "Lago di Braies",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//     },
//   ];


export const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

export const options = {
  formSelector : ".modal__form",
  inputSelector: ".modal__input",  
  submitButtonSelector: ".modal__button",  
  inactiveButtonSelector: "modal__button_disabled",  
  inputErrorClass: "modal__input_type_error",  
  errorClass: "modal__error_visable",

  cardList: ".cards__container",
  cardTemplate: "#card-template",
  // Popups
  previewPopup: "image-modal",
  editPopup: "edit-modal",
  addPopup: "add-modal",
  avatarPopup: "avatar-modal",
  deletePopup: "delete-modal",
  // Forms
  addForm: ".modal__form_add",
  editForm: ".modal__form_edit",
  avatarForm: ".modal__form_avatar",
  // Profile Elements
  userName: ".profile__name",
  userAboutMe: ".profile__description",
  userAvatar: ".profile__avatar",
  // Buttons
  closeButtons: "modal__close-button",
  editProfileButton: ".profile__edit-button",
  addCardButton: ".profile__add-button",
};

export const cardSelector = '#card-template'