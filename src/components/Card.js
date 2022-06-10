export class Card {
  constructor(name, link, likes = [], cardId, isMeOwner, ownerId, cardSelector, openImagePopup, openDeletePopup, setLike, deleteLike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = cardId;
    this._isMeOwner = isMeOwner;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
    this._openDeletePopup = openDeletePopup;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    this._ownerId = ownerId
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
    this._itemLikes = this._element.querySelector('.cards__item-likes');
    this._itemLikes.textContent = this._likes.length;
    this._trashButton = this._element.querySelector('.cards__trash-button');
    this._itemButton = this._element.querySelector('.cards__item-button');
    if (!this._isMeOwner) {
      this._trashButton.classList.add('hidden')
    }
    if (this._likes.find(item => item._id === this._ownerId)) {
      this._itemButton.classList.add('cards__item-button_active')
    }
    this._setEventListeners();

    return this._element;
  };

  _rerenderLikes(event, data) {
    event.target.classList.toggle('cards__item-button_active');
    this._likes = data.likes;
    this._itemLikes.textContent = this._likes.length;
  }

  _toggleLike = (event) => {
    if (this._likes.find(item => item._id === this._ownerId)) {
      this._deleteLike(this._cardId).then((data) => {
        this._rerenderLikes(event, data)
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      this._setLike(this._cardId).then((data) => {
        this._rerenderLikes(event, data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  _deleteCard = () => {
    this._element.remove()
  };

  _handleDelete = () => {
    this._openDeletePopup(this._deleteCard)
  }

  _handleImageClick = () => {
    this._openImagePopup(this._name, this._link)
  };

  _setEventListeners() {
    this._itemButton.addEventListener('click', this._toggleLike);
    if (this._isMeOwner) {
      this._trashButton.addEventListener('click', this._handleDelete)
    };
    this._cardImage.addEventListener('click', this._handleImageClick);
  }
}
