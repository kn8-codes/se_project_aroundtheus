import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    const previewImageElement = document.querySelector(".modal__preview-image");
    const previewImageCaption = document.querySelector(
      ".modal__preview-caption"
    );
    this.previewImageElement = previewImageElement;
    this.previewImageCaption = previewImageCaption;
  }

  _addImagePreview() {
    this.previewImageElement.src = this.link;
    this.previewImageElement.alt = this.name;
    this.previewImageCaption.textContent = this.name;
  }

  openPopupWindow(data) {
    this.name = data.name;
    this.link = data.link;
    this._addImagePreview();
    super.openPopupWindow();
  }
}

export default PopupWithImage;