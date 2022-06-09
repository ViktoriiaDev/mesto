import { api } from './Api';
import { ownId } from '../utils/constants';
export class Card {
  constructor(name, link, likes = [], cardId, isMeOwner, cardSelector, openImagePopup, openDeletePopup) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = cardId;
    this._isMeOwner = isMeOwner;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
    this._openDeletePopup = openDeletePopup;
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
    if (!this._isMeOwner) {
      this._element.querySelector('.cards__trash-button').classList.add('hidden')
    }
    if (this._likes.find(item => item._id === ownId)) {
      this._element.querySelector('.cards__item-button').classList.add('cards__item-button_active')
    }
    this._setEventListeners();

    return this._element;
  };


  _toggleLike = (event) => {
    if (this._likes.find(item => item._id === ownId)) {
      this._deleteLike().then(() => {
        event.target.classList.toggle('cards__item-button_active');
      })
    } else {
      this._setLike().then(() => {
        event.target.classList.toggle('cards__item-button_active');
      });
    }
  };

  _setLike() {
    return api.like(this._cardId).then((data) => {
      this._likes = data.likes;
      this._element.querySelector('.cards__item-likes').textContent = this._likes.length;
    })
  }

  _deleteLike() {
    return api.deleteLike(this._cardId).then((data) => {
      this._likes = data.likes;
      this._element.querySelector('.cards__item-likes').textContent = this._likes.length;
    })
  }

  _deleteCard = () => {
    this._element.remove()
  };

  _handleDelete = () => {
    this._openDeletePopup(this._element)
  }

  _handleImageClick = () => {
    this._openImagePopup(this._name, this._link)
  };

  _setEventListeners() {
    this._element.querySelector('.cards__item-button').addEventListener('click', this._toggleLike);
    if (this._isMeOwner) {
      this._element.querySelector('.cards__trash-button').addEventListener('click', this._handleDelete)
    };
    this._element.querySelector('.cards__item-image').addEventListener('click', this._handleImageClick);
  }
}
