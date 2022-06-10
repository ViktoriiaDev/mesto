import { PopupWithForm } from "./PopupWithForm";

export class PopupForDelete extends PopupWithForm {
  constructor(popupSelector, submitForm) {
    super(popupSelector, submitForm, false);
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
}
