import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage.js';
import '../pages/index.css';
import { ownId } from '../utils/constants.js';
import { api } from '../components/Api.js';

const editButton = document.querySelector('.profile__edit-button');
const inputTitle = document.querySelector('.popup__form-input_input_name');
const inputSubtitle = document.querySelector('.popup__form-input_input_description');
const cardList = document.querySelector('.cards__list');
const cardAddButton = document.querySelector('.profile__add-button');
const cardId = document.querySelector('.popup__form-input_cardId');

const userInfo = new UserInfo({
  titleSelector: '.profile__info-title',
  subtitleSelector: '.profile__info-subtitle',
  avatarSelector: '.profile__avatar-image'
})

//получение данных профиля с сервера
api.getProfileInfo().then(data => {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
})


//создание попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_picture')

//обработчики для попапа с картинкой
popupWithImage.setEventListeners();

const formValidators = {}


//попап с удалением карточки
const popupDelete = new PopupWithForm('.popup_remove', handleDeleteCard)

popupDelete.setEventListeners();

//удаление карточки с сервера
function handleDeleteCard(values) {
  return api.deleteCard(values.cardId).then(() => {
    popupDelete.card.remove();
  })
}

//создание экземпляра карточки
const createCard = (card) => {
  const isMeOwner = card.owner._id === ownId;

  function deletePopupOpen(cardElement) {
    cardId.value = card._id;
    popupDelete.card = cardElement;
    popupDelete.open.bind(popupDelete)();
  }

  return new Card(card.name, card.link, card.likes, card._id, isMeOwner, '#cards__item', popupWithImage.open.bind(popupWithImage), deletePopupOpen).generateCard();
}

//получение карточек и их отрисовка
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

//отправка данных профиля и изменение их на странице
function handleSubmitProfileForm(values) {
  return api.sendUserInfo(values.name, values.description).then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar)
  })
}

//создание попапа с профилем
const userInfoPopup = new PopupWithForm('.popup_profile', handleSubmitProfileForm, false)

//обработчики для попапа с профилем
userInfoPopup.setEventListeners();

function handleSubmitProfileAvatar(values) {
  return api.changeAvatar(values.avatar).then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar)
  })
}

const changeProfileAvatar = new PopupWithForm('.popup_avatar', handleSubmitProfileAvatar, false);

changeProfileAvatar.setEventListeners();

document.querySelector('.profile__avatar').addEventListener('click', changeProfileAvatar.open.bind(changeProfileAvatar))

//создание карточки, сброс валидации
const handleSubmitCardForm = (values) => {
  const placeName = values['place-name'];
  const placeLink = values['place-link'];
  return api.addCard(placeName, placeLink).then((data) => {
    const card = createCard(data);
    cardList.prepend(card);
    formValidators['popup-card-form'].resetValidation();
  })
}

//создание попапа с карточкой
const cardPopup = new PopupWithForm('.popup_card', handleSubmitCardForm, true)

//обработчики для попапа с карточкой
cardPopup.setEventListeners();

//открывает попап профиля
editButton.addEventListener('click', () => {
  formValidators['popup-form'].resetValidation();
  const info = userInfo.getUserInfo();
  inputTitle.value = info.title;
  inputSubtitle.value = info.subtitle;
  userInfoPopup.open.bind(userInfoPopup)();
});

//открытие попапа с карточкой
cardAddButton.addEventListener('click', () => {
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

