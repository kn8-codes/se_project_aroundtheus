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

function toggleButtonState(inputElements , submitButton, {inactiveButtonSelector}){
    const foundInvalid = false;
    inputElements.forEach(input => {
      if(!inputElement.validity.valid){
        foundInvalid = true;
      } 
    });

    if(foundInvalid) {
        submitButton.classList.add(inactiveButtonSelector)
        return submitButton.disabled = true;
    }
   
        submitButton.classList.remove(inactiveButtonSelector)
        submitButton.disabled = flase;
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
    console.log(options)
    const formElements = [...document.querySelectorAll(options.formSelector)];
    console.log(formElements)
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
  inactiveButtonSelector: ".modal_button_disabled",  
  inputErrorClass: "modal_input_type_error",  
  errorClass: "modal_error_visable",  
};

enableValidation(config);