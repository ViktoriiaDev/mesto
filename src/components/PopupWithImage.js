import { Popup } from './Popup.js';


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureImage = this._popupElement.querySelector('.picture__image');
    this._pictureDescription = this._popupElement.querySelector('.picture__description')
  }

  open(name, link) {
    super.open();
    this._pictureImage.setAttribute('src', link);
    this._pictureImage.setAttribute('alt', name);
    this._pictureDescription.textContent = name;
  }
}
