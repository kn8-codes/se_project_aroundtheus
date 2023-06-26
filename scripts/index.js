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
  const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
  const addNewCardButton = document.querySelector("#profile-add-button")
  const addForm = document.querySelector("#add-form");
  const titleInputField = document.querySelector("#title");
  const linkInputField = document.querySelector("#link");
  const createButton = document.querySelector("#create-btn");
  const previewModal = document.querySelector("#preview");
  const previewModalImage = previewModal.querySelector(".modal__preview-image");
  const previewModalCloseButton = previewModal.querySelector("#preview-close");
  const overlay = document.querySelector(".page");
  const modalPreviewPictureCaption = previewModal.querySelector(".modal__caption");
  const openedModal = document.querySelector(".modal_opened");

  /*********************************************************************************************/
  /***************************************FUNCTIONS*********************************************/
  /*********************************************************************************************/
  
  
  function openModal(modal){
    modal.classList.add("modal_opened");
    overlay.addEventListener('mousedown' , closeModalByClick);
    document.addEventListener('keydown' , closeModalByEscape);
  }
  
  function closeModal(modal){
    modal.classList.remove("modal_opened");
    overlay.removeEventListener('mousedown' , closeModalByClick);
    document.removeEventListener('keydown' , closeModalByEscape);
  }
  
  function renderCard(cardData, wrapper){
    const cardElement = getCardElement(cardData); 
    cardContainerElement.prepend(cardElement);
  }  

  function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = cardElement.querySelector(".card__image");
    const cardTitleElement = cardElement.querySelector(".card__label-title");      
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button")
    const handleLikeIcon = (e) => {
      e.target.classList.toggle("card__like-active");
    };  
    function deleteCard(e) {
      e.target.closest(".card").remove();
    }  
    cardImageElement.addEventListener('click', () => handlePreviewClick(cardData)); 
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', handleLikeIcon);
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
    toggleButtonState([titleInputField , linkInputField], createButton, config);
  };
  
  function handlePreviewClick(cardData) {
    const previewLink = cardData.link;
    const previewAlt = cardData.name;
    const previewCaption = cardData.name; 
    previewModalImage.setAttribute("src", previewLink);
    previewModalImage.setAttribute("alt", previewAlt);
    modalPreviewPictureCaption.textContent = cardData.name;
    openModal(previewModal);
  }
  
  function closeModalByEscape(event) {
    if(event.key === 'Escape') {
      const openedModal = document.querySelector(".modal_opened");
      closeModal(openedModal);
  }};

  function closeModalByClick(event) {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
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