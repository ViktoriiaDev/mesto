import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithForm } from './PopupWithForm';
import { PopupWithImage } from './PopupWithImage.js';
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

const editButton = document.querySelector('.profile__edit-button');

const inputTitle = document.querySelector('.popup__form-input_input_name');
const inputSubtitle = document.querySelector('.popup__form-input_input_description');
const cardList = document.querySelector('.cards__list');
const cardAddButton = document.querySelector('.profile__add-button');

const userInfo = new UserInfo({
  titleSelector: '.profile__info-title',
  subtitleSelector: '.profile__info-subtitle'
})

const popupWithImage = new PopupWithImage('.popup_picture')
popupWithImage.setEventListeners();

const formValidators = {}

const createCard = (card) => {
  return new Card(card.name, card.link, '#cards__item', popupWithImage.open.bind(popupWithImage)).generateCard();
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCardList.addItem(cardElement);
  }
}, '.cards__list');

defaultCardList.renderItems();

function handleSubmitProfileForm(values) {
  userInfo.setUserInfo(values.name, values.description);
}

const userInfoPopup = new PopupWithForm('.popup_profile', handleSubmitProfileForm, false)
userInfoPopup.setEventListeners();

function handleCardOpen() {
  formValidators['popup-card-form'].resetValidation();
}

const handleSubmitCardForm = (values) => {
  const placeName = values['place-name'];
  const placeLink = values['place-link'];
  const card = createCard({
    name: placeName,
    link: placeLink,
  });
  cardList.prepend(card);
  formValidators['popup-card-form'].resetValidation();
}

const cardPopup = new PopupWithForm('.popup_card', handleSubmitCardForm, true)
cardPopup.setEventListeners();

editButton.addEventListener('click', () => {
  formValidators['popup-form'].resetValidation();
  const info = userInfo.getUserInfo();
  inputTitle.value = info.title;
  inputSubtitle.value = info.subtitle;
  userInfoPopup.open.bind(userInfoPopup)();
});
cardAddButton.addEventListener('click', () => {
  handleCardOpen();
  cardPopup.open();
});

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

