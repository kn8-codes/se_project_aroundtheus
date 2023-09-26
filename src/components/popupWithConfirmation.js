import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector}) {
    console.log(popupSelector)
    super({popupSelector});
    this._submitButton = this._popupElement.querySelector(".modal__submit-button");
    this._confirmButton = this._popupElement.querySelector(".modal__submit-button_delete");
    this._submitButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  handleConfirm = () => {
    this._handleConfirm(this);
    console.log(test)
  }
  
  test = () => {
    console.log(test)
    this._handleConfirm(this);
  }

  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }

  setEventsListeners() {
    super.setEventsListeners();
    this._submitButton.addEventListener("click", this.handleConfirm);
    this._confirmButton.addEventListener("click", this.test);
  }

  removeEventsListeners() {
    super.removeEventsListeners();
    this._submitButton.removeEventListener("click", this.handleConfirm);
  }
}