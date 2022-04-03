let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let title = document.querySelector('.profile__info-title');
let subtitle = document.querySelector('.profile__info-subtitle');
let inputTitle = document.querySelector('.popup__form-input_input_name');
let inputSubtitle = document.querySelector('.popup__form-input_input_description');
let popupForm = document.querySelector('.popup__form');
const profileForm = document.querySelector('.profile-form');
const cardForm = document.querySelector('.card-form');
const popupCardForm = document.querySelector('.popup__card-form');
const cardList = document.querySelector('.cards__list');
const inputPlaceName = document.querySelector('.popup__form-input_place_name');
const inputPlaceLink = document.querySelector('.popup__form-input_place_link');
const profileAddButton = document.querySelector('.profile__add-button');

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg'
  },

  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },

  {
    name: 'Домбай',
    link: './images/dombai.jpg'
  },

  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },

  {
    name: 'Домбай',
    link: './images/dombai.jpg'
  },

  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg'
  },

];

const createPlace = (card) => {
  const template = document.querySelector('#cards__item');
  const cardItem = template.content.querySelector('.cards__item').cloneNode(true);
  const name = cardItem.querySelector('.cards__item-title');
  const image = cardItem.querySelector('.cards__item-image');
  name.textContent = card.name;
  image.setAttribute('src', card.link);

  return cardItem
}

const cards = initialCards.map(createPlace)

cardList.append(...cards);

function handleProfileOpen() {
  popup.classList.add('popup_open');
  profileForm.classList.add('profile-form_open');
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
}

function handleCardOpen() {
  popup.classList.add('popup_open');
  cardForm.classList.add('card-form_open');
  inputPlaceName.value = '';
  inputPlaceLink.value = '';
}

function handlePopupClose() {
  popup.classList.remove('popup_open');
  profileForm.classList.remove('profile-form_open');
}

function handleSubmitForm(event) {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent = inputSubtitle.value;
  handlePopupClose();
}

editButton.addEventListener('click', handleProfileOpen);
popupCloseButton.addEventListener('click', handlePopupClose);
popupForm.addEventListener('submit', handleSubmitForm);
profileAddButton.addEventListener('click', handleCardOpen);

