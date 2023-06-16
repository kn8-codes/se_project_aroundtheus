function setEventListeners(formElements, options){
    const { inputSelector } = options;
    const inputElements = [...formElements.querySelectorAll(inputSelector)];
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input" , (e) => {
        console.log(inputElement.validity);
        
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
  submitButtonSelector: ".popup_button",  
  inactiveButtonSelector: ".popup_button_disabled",  
  inputErrorClass: ".popup_input_type_error",  
  errorClass: ".popup_error_visable",  
};

enableValidation(config);