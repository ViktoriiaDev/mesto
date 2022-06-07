export class Card {
  constructor(name, link, likes = [], cardSelector, openImagePopup) {
    this._name = name;
    this._link = link;
    this._likes = likes;
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
    this._cardImage = this._element.querySelector('.cards__item-image')
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', this._name);
    this._element.querySelector('.cards__item-title').textContent = this._name;
    this._element.querySelector('.cards__item-likes').textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  };


  _toggleLike = (event) => {
    event.target.classList.toggle('cards__item-button_active');
  };

  _deleteCard = () => {
    this._element.remove()
  };

  _handleImageClick = () => {
    this._openImagePopup(this._name, this._link)
  };

  _setEventListeners() {
    this._element.querySelector('.cards__item-button').addEventListener('click', this._toggleLike);
    this._element.querySelector('.cards__trash-button').addEventListener('click', this._deleteCard);
    this._element.querySelector('.cards__item-image').addEventListener('click', this._handleImageClick);
  }
}

