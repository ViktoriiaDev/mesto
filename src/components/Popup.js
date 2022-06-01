const ESC_CODE = 'Escape';

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close')
    this._popupWindow = this._popupSelector.querySelector('.popup__content');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popupWindow.addEventListener('click', this._stopPropagation)
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupWindow.removeEventListener('click', this._stopPropagation)
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
    this._popupSelector.addEventListener('click', this.close.bind(this))
  }

}
