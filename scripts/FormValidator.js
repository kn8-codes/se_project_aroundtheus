export default class FormValidator{
    constructor(options, formElement){
      this._form = formElement;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;  
      this._inactiveButtonSelector = settings.inactiveButtonSelector;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
    }

    _hasValidInput(){
      
    }

    _toggleButtonState(){
      if(!getFormValidity(inputElements)) {
          submitButton.classList.add(inactiveButtonSelector)
          submitButton.disabled = true;
      } else {
          submitButton.classList.remove(inactiveButtonSelector)
          submitButton.disabled = false;
      }
  }

    _setEventListeners(){
      this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
      this._inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input" , (e) => {
          checkInputValidity(this._form , inputElement , options);  
          toggleButtonState(this._inputElements , this._submitButton, this.inactiveButtonSelector);        
      });    
    });
    }
    
    enableValidation(){
      this._form.forEach((formElements) => {
        formElements.addEventListener("submit" , (e) => {
            e.preventDefault();
        })
        setEventListeners(formElements , options);
      })
}
}
