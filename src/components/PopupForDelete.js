import { Popup } from "./Popup";

export class PopupForDelete extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupElement.querySelector('form');
    this._submitButton = this._formElement.querySelector('.popup__form-submit');
  }

  setId(cardId) {
    this._cardId = cardId;
  }

  getId() {
    return this._cardId;
  }

  setRemoveCardFunction(fn) {
    this._callBack = fn;
  }

  getRemoveCardFunction() {
    return this._callBack
  }

  setSubmitButtonText(text, isDisabled) {
    this._submitButton.textContent = text;
    this._submitButton.disabled = isDisabled;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitForm()
    })
  }
}
