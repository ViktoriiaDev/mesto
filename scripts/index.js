import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const ESC_CODE = 'Escape';


const editButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');
const picturePopup = document.querySelector('.popup_picture');

const profilePopupCloseButton = document.querySelector('.popup__close_profile');
const cardPopupCloseButton = document.querySelector('.popup__close_card');
const picturePopupCloseButton = document.querySelector('.popup__close_picture');
const profileForm = document.querySelector('.popup__form');
const title = document.querySelector('.profile__info-title');
const subtitle = document.querySelector('.profile__info-subtitle');
const inputTitle = document.querySelector('.popup__form-input_input_name');
const inputSubtitle = document.querySelector('.popup__form-input_input_description');
const popupCardForm = document.querySelector('.popup__card-form');
const cardList = document.querySelector('.cards__list');
const inputPlaceName = document.querySelector('.popup__form-input_place_name');
const inputPlaceLink = document.querySelector('.popup__form-input_place_link');
const cardAddButton = document.querySelector('.profile__add-button');
const picture = document.querySelector('.picture');
const pictureImage = document.querySelector('.picture__image');
const pictureDescription = document.querySelector('.picture__description');
const popupWindowProfile = profilePopup.querySelector('.popup__window');
const popupWindowCard = cardPopup.querySelector('.popup__window');
const popupWindowPicture = picturePopup.querySelector('.picture');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

const openImagePopup = (name, link) => {
  openPopup(picturePopup);
  pictureImage.setAttribute('src', link);
  pictureImage.setAttribute('alt', name);
  pictureDescription.textContent = name;
}

const cards = initialCards.map(card => {
  return new Card(card.name, card.link, '#cards__item', openImagePopup).generateCard();
});

cardList.append(...cards);


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(event) {
  if (event.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleProfileOpen() {
  openPopup(profilePopup);
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
}

function handleProfileClose() {
  closePopup(profilePopup);
}

function handleSubmitProfileForm(event) {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent = inputSubtitle.value;
  handleProfileClose();
}

function handleCardOpen() {
  openPopup(cardPopup);
}

function handleCardClose() {
  inputPlaceName.value = '';
  inputPlaceLink.value = '';
  closePopup(cardPopup);
}


const handleSubmitCardForm = (event) => {
  event.preventDefault();
  const placeName = inputPlaceName.value;
  const placeLink = inputPlaceLink.value;
  const card = new Card(placeName, placeLink, '#cards__item', openImagePopup).generateCard()
  cardList.prepend(card);
  handleCardClose();
  const buttonElement = popupCardForm.querySelector('.popup__form-submit');
  buttonElement.classList.add('popup__form-submit_disabled');
  buttonElement.disabled = true;
}

function handlePictureClose() {
  closePopup(picturePopup);
}

editButton.addEventListener('click', handleProfileOpen);
profilePopupCloseButton.addEventListener('click', handleProfileClose);
profileForm.addEventListener('submit', handleSubmitProfileForm);
cardAddButton.addEventListener('click', handleCardOpen);
cardPopupCloseButton.addEventListener('click', handleCardClose);
popupCardForm.addEventListener('submit', handleSubmitCardForm);
picturePopupCloseButton.addEventListener('click', handlePictureClose);

profilePopup.addEventListener('click', handleProfileClose);
cardPopup.addEventListener('click', handleCardClose);
picturePopup.addEventListener('click', handlePictureClose);

function overlay(evt) {
  evt.stopPropagation();
}

popupWindowProfile.addEventListener('click', overlay);
popupWindowCard.addEventListener('click', overlay);
popupWindowPicture.addEventListener('click', overlay);
