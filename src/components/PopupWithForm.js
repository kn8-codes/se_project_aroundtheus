import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
      super({popupSelector});
      this.handleFormSubmit = handleFormSubmit;
      this._popupForm = this._popupElement.querySelector(".modal__form");
      this._inputList = this._popupForm.querySelectorAll(".modal__input");
    }
    _getInputValues() {
        this._formValues = {};
        console.log(this._inputList)
        this._inputList.forEach(
          (input) => (this._formValues[input.name] = input.value)
        );
        console.log(this._formValues)
        return this._formValues;
      };
   
      close(){
        this._popupForm.reset();
        super.close();
        
    }

    setEventListeners() {
        this._popupForm.addEventListener("submit", () => {
          this.handleFormSubmit(this._getInputValues());
          });
          super.setEventListeners();
    }
}