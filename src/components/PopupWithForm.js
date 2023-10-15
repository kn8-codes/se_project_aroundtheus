import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(".modal__button")
    this.close = this.close.bind(this)
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  };

  renderLoading(isLoading) {
    console.log(isLoading)
    if (isLoading) {
      this._submitButton.textContent = "Saving";
    } else {
      this._submitButton.textContent = "Save";
    }
  }
  _setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name]
    })
  }

  close() {
    console.trace(this)
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