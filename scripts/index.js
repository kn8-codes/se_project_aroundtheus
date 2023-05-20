const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
  
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
  
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
  
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
  
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
  
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];

//elements
  const profileEditButton = document.querySelector('#profile-edit-button');
  const profileEditModal = document.querySelector('#profile-edit-modal');
  const profileCloseModal = document.querySelector('#profile-edit-close');
  const profileTitle = document.querySelector('#profile-title');
  const profileDescription = document.querySelector('#profile-description');
  const profileTitleInput = document.querySelector('#edit-modal-input-title');
  const profileDescriptionInput = document.querySelector('#edit-modal-input-description');
  const profileEditForm = profileEditModal.querySelector('.modal__form');
  const cardContainerElement = document.querySelector('.cards__container');
  const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
  

/*********************************************************************************************/
/***************************************FUNCTIONS*********************************************/
/*********************************************************************************************/
  

  function openModal(){
    profileEditModal.classList.add('modal_opened');
}
  function closeModal(){
    profileEditModal.classList.remove('modal_opened');
}

  function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__label-title');
    cardTitleElement.textContent = cardData.name;
    cardImageElement.src = cardData.link;
    cardImageElement.alt = cardData.name;
    return cardElement;
}

/*********************************************************************************************/
/***************************************EVENT HANDLERS****************************************/
/*********************************************************************************************/
function handleProfileEditSubmit(e){
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
} 

function fillProfileForm(){
  profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal();
};

/*********************************************************************************************/
/***********************************EVENT LISTENERS*******************************************/
/*********************************************************************************************/
profileEditButton.addEventListener('click' , fillProfileForm);
  
profileCloseModal.addEventListener('click' , closeModal);
  
profileEditForm.addEventListener('submit' , handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardContainerElement.prepend(cardElement);
});