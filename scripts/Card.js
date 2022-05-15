export class Card {
  constructor(name, link, cardSelector, openImagePopup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
  }


  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardItem;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.cards__item-image').setAttribute('src', this._link);
    this._element.querySelector('.cards__item-image').setAttribute('alt', this._name);
    this._element.querySelector('.cards__item-title').textContent = this._name;

    return this._element;
  };


  _setEventListeners() {
    this._element.querySelector('.cards__item-button').addEventListener('click', (event) => {
      event.target.classList.toggle('cards__item-button_active');
    });
    this._element.querySelector('.cards__trash-button').addEventListener('click', () => {
     this._element.remove();
    });

    this._element.querySelector('.cards__item-image').addEventListener('click', () => {
      this._openImagePopup(this._name, this._link);
    })
  }
}

