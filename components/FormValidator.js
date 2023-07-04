class FormValidator{
    constructor(options, formElement){
      this._form = formElement;
      this._inputSelector = options.inputSelector;
      this._submitButtonSelector = options.submitButtonSelector;  
      this._inactiveButtonSelector = options.inactiveButtonSelector;
      this._inputErrorClass = options.inputErrorClass;
      this._errorClass = options.errorClass;
    }
    
    _showInputError(inputElement){
      const errorMessageElement = this._form.querySelector(`#${inputElement.id}_error`)
      inputElement.classList.add(this._inputErrorClass);
      errorMessageElement.textContent = inputElement.validationMessage;
      errorMessageElement.classList.add(this._errorClass);
    }
    
    _hideInputError(inputElement){

      const errorMessageElement = this._form.querySelector(`#${inputElement.id}_error`)
      inputElement.classList.remove(this._inputErrorClass);
      errorMessageElement.textContent = " ";
      errorMessageElement.classList.remove(this._errorClass);
    
    }

    _getFormValidity(inputElements) {
      return this._inputElements.every(input => this._hasValidInput(input));
    }

    _checkInputValidity(inputElement){
      if(!inputElement.validity.valid) {
        return this._showInputError(inputElement);
      }
        this._hideInputError(inputElement);
        
    }

    _hasValidInput(input){
      return input.validity.valid
    }

    toggleButtonState(){
      if(!this._getFormValidity(this._inputElements)) {
          this._submitButton.classList.add(this._inactiveButtonSelector)
          this._submitButton.disabled = true;
      } else {
          this._submitButton.classList.remove(this._inactiveButtonSelector)
          this._submitButton.disabled = false;
      }
  }

    _setEventListeners(){
      this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
      this._inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input" , (e) => {
          this._checkInputValidity(inputElement);  
          this.toggleButtonState();        
      });    
    });
    }
    
    enableValidation(){
      this._form.addEventListener("submit" , (e) => {
            e.preventDefault();
        })
        this._setEventListeners();
      }
}


export default FormValidator;