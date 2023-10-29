import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
    this._submitButton = this._popupElement.querySelector(".modal__submit-button");
    this._confirmButton = this._popupElement.querySelector(".modal__submit-button_delete");
    this._submitButtonText = this._submitButton.textContent;
}

renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
        this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  handleConfirm = () => {
    this._handleConfirm(this);
  }

  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", this.handleConfirm);
  }

//   removeEventListeners() {
//     this._submitButton.removeEventListener("click", this.handleConfirm);
//   }
}
