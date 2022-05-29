import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import '../pages/index.css';
import karachaevskUrl from '../images/karachaevsk.jpg';
import elbrusUrl from '../images/elbrus.jpg';
import dombaiUrl from '../images/dombai.jpg';

const initialCards = [
  {
    name: 'Карачаевск',
    link: karachaevskUrl
  },

  {
    name: 'Гора Эльбрус',
    link: elbrusUrl
  },

  {
    name: 'Домбай',
    link: dombaiUrl
  },

  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },

  {
    name: 'Домбай',
    link: dombaiUrl
  },

  {
    name: 'Карачаевск',
    link: karachaevskUrl
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

const formValidators = {}

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

const createCard = (card) => {
  const cardElement = new Card(card.name, card.link, '#cards__item', openImagePopup).generateCard();
  return cardElement;
}

const cards = initialCards.map(card => {
  return createCard(card);
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
  formValidators['popup-form'].resetValidation();
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
  formValidators['popup-card-form'].resetValidation();

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
  const card = createCard({
    name: placeName,
    link: placeLink,
  });
  cardList.prepend(card);
  handleCardClose();
  formValidators['popup-card-form'].resetValidation();
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

function stopPropagation(evt) {
  evt.stopPropagation();
}

popupWindowProfile.addEventListener('click', stopPropagation);
popupWindowCard.addEventListener('click', stopPropagation);
popupWindowPicture.addEventListener('click', stopPropagation);

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation({
  formSelector: 'form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_disabled',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-input-error_visible',
});

