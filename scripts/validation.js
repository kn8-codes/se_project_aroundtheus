function showInputError(formElements , inputElement , {inputErrorClass , errorClass}){
  const errorMessageElement = formElements.querySelector(`#${inputElement.id}_error`)
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);

}

function hideInputError(formElements , inputElement , {inputErrorClass , errorClass}){
  const errorMessageElement = formElements.querySelector(`#${inputElement.id}_error`)
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = " ";
  errorMessageElement.classList.remove(errorClass);

}

function checkInputValidity(formElements , inputElement , options){
    if(!inputElement.validity.valid) {
       return showInputError(formElements , inputElement , options);
    }
       hideInputError(formElements , inputElement , options)
    
}

function hasInvalidInput(input){
   return !input.every((inputElements) => inputElements.validity.valid)
}

function toggleButtonState(inputElements , submitButton, {inactiveButtonSelector}){
    let foundInvalid = false;
    inputElements.forEach(input => {
      if(hasInvalidInput(inputElements)){
        foundInvalid = true;
      } 
    });
    if(foundInvalid) {
        submitButton.classList.add(inactiveButtonSelector)
        return submitButton.disabled = true;
    }
   
        submitButton.classList.remove(inactiveButtonSelector)
        submitButton.disabled = false;
}

function setEventListeners(formElements, options){
    const { inputSelector } = options;
    const inputElements = [...formElements.querySelectorAll(inputSelector)];
    const submitButton = formElements.querySelector('.modal__button');
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input" , (e) => {
          checkInputValidity(formElements , inputElement , options);  
          toggleButtonState(inputElements,submitButton, options);        
      });    
    });
}

function enableValidation(options){
  const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElements) => {
        formElements.addEventListener("submit" , (e) => {
            e.preventDefault();
        })
        setEventListeners(formElements , options);
    })


};


const config = {
  formSelector : ".modal__form",
  inputSelector: ".modal__input",  
  submitButtonSelector: ".modal__button",  
  inactiveButtonSelector: "modal__button_disabled",  
  inputErrorClass: "modal__input_type_error",  
  errorClass: "modal__error_visable",  
};

enableValidation(config);