import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, resetAfterClose) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupElement.querySelector('form');
    this._submitButton = this._formElement.querySelector('.popup__form-submit');
    this._baseSubmitText = this._submitButton.textContent;
    this._resetAfterClose = resetAfterClose;
    this._inputList = this._popupElement.querySelectorAll('.popup__form-input');
    this._formValues = {};
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //изменение текста кнопки при отправке запроса на сервер
  setSubmitButtonText(text, isDisabled) {
    this._submitButton.textContent = text;
    this._submitButton.disabled = isDisabled;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitForm(this._getInputValues())
    })
  }

  _clearForm() {
    this._formElement.reset();
  }

  close() {
    super.close();
    if (this._resetAfterClose) {
      this._clearForm()
    }
  }

}
