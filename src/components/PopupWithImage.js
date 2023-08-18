import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageElement = this._popupElement.querySelector(".modal__preview-image");
    this._previewImageCaption = this._popupElement.querySelector(
      ".modal__caption"
    );
  }

  open(data) {
    this._name = data.name;
    this._link = data.link;

    this._previewImageElement.src = data.link;
    this._previewImageElement.alt = data.name;
    this._previewImageCaption.textContent = data.name;
    super.open();
  }
}

export default PopupWithImage;