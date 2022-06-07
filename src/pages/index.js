import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage.js';
import '../pages/index.css';
import { initialCards } from '../utils/constants.js';
import { api } from '../components/Api.js';

const editButton = document.querySelector('.profile__edit-button');
const inputTitle = document.querySelector('.popup__form-input_input_name');
const inputSubtitle = document.querySelector('.popup__form-input_input_description');
const cardList = document.querySelector('.cards__list');
const cardAddButton = document.querySelector('.profile__add-button');

const userInfo = new UserInfo({
  titleSelector: '.profile__info-title',
  subtitleSelector: '.profile__info-subtitle',
  avatarSelector: '.profile__avatar-image'
})

api.getProfileInfo().then(data => {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
})



const popupWithImage = new PopupWithImage('.popup_picture')
popupWithImage.setEventListeners();

const formValidators = {}

const createCard = (card) => {
  return new Card(card.name, card.link, card.likes, '#cards__item', popupWithImage.open.bind(popupWithImage)).generateCard();
}
api.getInitialCards().then(data => {

  const defaultCardList = new Section({
    items: data,
    renderer: (item) => {
      const cardElement = createCard(item);
      defaultCardList.addItem(cardElement);
    }
  }, '.cards__list');

  defaultCardList.renderItems();
})

function handleSubmitProfileForm(values) {
  api.sendUserInfo(values.name, values.description).then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar)
  })
}

const userInfoPopup = new PopupWithForm('.popup_profile', handleSubmitProfileForm, false)
userInfoPopup.setEventListeners();

function handleCardOpen() {
  formValidators['popup-card-form'].resetValidation();
}

const handleSubmitCardForm = (values) => {
  const placeName = values['place-name'];
  const placeLink = values['place-link'];
  api.addCard(placeName, placeLink).then((data) => {
    const card = createCard({
      name: placeName,
      link: placeLink,
    });
    cardList.prepend(card);
    formValidators['popup-card-form'].resetValidation();
  })
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

