import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageElement = this._popupElement.querySelector("#preview");
    this._previewImageCaption = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    console.log(this._previewImageElement)
    this._previewImageElement.src = data.link;
    this._previewImageElement.alt = `Image of ${data.name}`;
    this._previewImageCaption.textContent = data.name;
    super.open();
  }
}

export default PopupWithImage;