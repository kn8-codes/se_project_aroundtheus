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


/*********************************************************************************************/
/***************************************ELEMENTS**********************************************/
/*********************************************************************************************/
  const cardsContainer = document.querySelector(".cards"); 
  const profileEditButton = document.querySelector('#profile-edit-button');
  const profileEditModal = document.querySelector('#profile-edit-modal');
  const profileAddModal = document.querySelector('#profile-add-modal');
  const profileCloseEditModal = profileEditModal.querySelector('#profile-edit-close');
  const profileCloseAddModal = profileAddModal.querySelector('#profile-add-close');
  const profileTitle = document.querySelector('#profile-title');
  const profileDescription = document.querySelector('#profile-description');
  const profileTitleInput = document.querySelector('#edit-modal-input-title');
  const profileDescriptionInput = document.querySelector('#edit-modal-input-description');
  const profileEditForm = profileEditModal.querySelector('.modal__form');
  const cardContainerElement = document.querySelector('.cards__container');
  const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
  const addNewCardButton = document.querySelector('#profile-add-button')
  
  
  const addForm = document.querySelector("#add-form");
  const titleInputField = document.querySelector("#title");
  const linkInputField = document.querySelector("#link");
  const createButton = document.querySelector("#create-btn");
  /*********************************************************************************************/
  /***************************************FUNCTIONS*********************************************/
  /*********************************************************************************************/
  
  
  function openModal(modal){
    modal.classList.add('modal_opened');
  }
  function closeModal(modal){
    modal.classList.remove('modal_opened');
  }
  
  function renderCard(cardData){
    const cardElement = getCardElement(cardData); 
    cardContainerElement.prepend(cardElement);
  }

  function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__label-title');      
    const cardLikeButtons = cardElement.querySelector('.card__like-button');
    
    cardLikeButtons.addEventListener('click',()=>{
       cardLikeButtons.classList.toggle('.card__like-button-active');
       console.log('click');
     });
    
    cardImageElement.src = cardData.link;
    cardImageElement.alt = cardData.name;
    cardTitleElement.textContent = cardData.name;
    
    return cardElement;
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
    openModal(profileEditModal);
  };

  function handleAddCard(e) {
    e.preventDefault();
    const titleValue = titleInputField.value
    const urlValue = urlInputField.value

    return console.log(titleValue , urlValue)
    //cardsContainer.prepend(getCardElement(createdCard));

    //closePopup(addWindow);
    //profileAddForm.reset();
  }
  /*********************************************************************************************/
  /***********************************EVENT LISTENERS*******************************************/
  /*********************************************************************************************/
  profileEditButton.addEventListener('click' , fillProfileForm);
  
  profileCloseEditModal.addEventListener('click' , () => closeModal(profileEditModal));
  profileCloseAddModal.addEventListener('click' , () => closeModal(profileAddModal));
  
  profileEditForm.addEventListener('submit' , handleProfileEditSubmit);
  
  
  addNewCardButton.addEventListener('click', () => openModal(profileAddModal))
  
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardContainerElement.prepend(cardElement);
  });
  
  createButton.addEventListener("sumbit", handleAddCard);
  
 