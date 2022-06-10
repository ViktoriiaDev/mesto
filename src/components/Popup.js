const ESC_CODE = 'Escape';

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close')
    this._popupWindow = this._popupElement.querySelector('.popup__content');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }


  _handleEscClose(event) {
    if (event.key === ESC_CODE) {

      this.close()
    }
  }

  _stopPropagation(evt) {
    evt.stopPropagation();
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('click', this.close.bind(this));
    this._popupWindow.addEventListener('click', this._stopPropagation);
  }

}
