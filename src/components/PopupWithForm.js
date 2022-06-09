import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, resetAfterClose) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupSelector.querySelector('form');
    this._submitButton = this._formElement.querySelector('.popup__form-submit');
    this._baseSubmitText = this._submitButton.textContent;
    this._resetAfterClose = resetAfterClose;
    this._inputList = this._popupSelector.querySelectorAll('.popup__form-input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._submitButton.disabled = true;
      this._submitForm(this._getInputValues())
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._submitButton.disabled = false;
          this._submitButton.textContent = this._baseSubmitText;
        });
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
