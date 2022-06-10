import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage.js';
import '../pages/index.css';
import { api } from '../components/Api.js';
import { PopupForDelete } from '../components/PopupForDelete.js';

const editButton = document.querySelector('.profile__edit-button');
const inputTitle = document.querySelector('.popup__form-input_input_name');
const inputSubtitle = document.querySelector('.popup__form-input_input_description');
const cardAddButton = document.querySelector('.profile__add-button');

const userInfo = new UserInfo({
  titleSelector: '.profile__info-title',
  subtitleSelector: '.profile__info-subtitle',
  avatarSelector: '.profile__avatar-image'
})

//получение данных профиля с сервера
const profilePromise = api.getProfileInfo()

const defaultCardList = new Section((item) => {
  const info = userInfo.getUserInfo();
  const cardElement = createCard(item, info.ownId);
  defaultCardList.addItem(cardElement);
}, '.cards__list');

//получение карточек и их отрисовка
const cardsPromise = api.getInitialCards()

Promise.all([profilePromise, cardsPromise])
.then(([profileData, cardsData]) => {
  userInfo.setUserInfo(profileData.name, profileData.about, profileData.avatar, profileData._id);
  defaultCardList.renderItems(cardsData);
})
.catch((err) => {
  console.log(err);
});

//установка лайка
function setLike(cardId) {
  return api.like(cardId)
}

//удаление лайка
function deleteLike(cardId) {
  return api.deleteLike(cardId)
}

//создание попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_picture')

//обработчики для попапа с картинкой
popupWithImage.setEventListeners();

const formValidators = {}


//попап с удалением карточки
const popupDelete = new PopupForDelete('.popup_remove', handleDeleteCard)

popupDelete.setEventListeners();

//удаление карточки с сервера
function handleDeleteCard() {
  popupDelete.setSubmitButtonText('Удаление...', true);
  api.deleteCard(popupDelete.getId()).then(() => {
    popupDelete.close();
    popupDelete.getRemoveCardFunction()();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupDelete.setSubmitButtonText('Да', false)
  })
}

//создание экземпляра карточки
const createCard = (card, ownId) => {
  const isMeOwner = card.owner._id === ownId;

  function deletePopupOpen(fn) {
    popupDelete.setId(card._id);
    popupDelete.open.bind(popupDelete)();
    popupDelete.setRemoveCardFunction(fn)
  }

  return new Card(card.name, card.link, card.likes, card._id, isMeOwner, ownId, '#cards__item', popupWithImage.open.bind(popupWithImage), deletePopupOpen, setLike, deleteLike).generateCard();
}



//создание попапа с профилем
const userInfoPopup = new PopupWithForm('.popup_profile', handleSubmitProfileForm, false)

//отправка данных профиля и изменение их на странице
function handleSubmitProfileForm(values) {
  userInfoPopup.setSubmitButtonText('Сохранение...', true)
  api.sendUserInfo(values.name, values.description)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
      userInfoPopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      userInfoPopup.setSubmitButtonText('Сохранить', false)
    })
}

//обработчики для попапа с профилем
userInfoPopup.setEventListeners();


const changeProfileAvatar = new PopupWithForm('.popup_avatar', handleSubmitProfileAvatar, true);

function handleSubmitProfileAvatar(values) {
  changeProfileAvatar.setSubmitButtonText('Сохранение...', true);
  api.changeAvatar(values.avatar).then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
    changeProfileAvatar.close()
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeProfileAvatar.setSubmitButtonText('Сохранить', false)
    })
}

changeProfileAvatar.setEventListeners();


document.querySelector('.profile__avatar').addEventListener('click', changeProfileAvatar.open.bind(changeProfileAvatar))

//создание попапа с карточкой
const cardPopup = new PopupWithForm('.popup_card', handleSubmitCardForm, true)

//создание карточки, сброс валидации
function handleSubmitCardForm(values) {
  const placeName = values['place-name'];
  const placeLink = values['place-link'];
  cardPopup.setSubmitButtonText('Сохранение...', true);
  api.addCard(placeName, placeLink).then((data) => {
    const info = userInfo.getUserInfo()
    const card = createCard(data, info.ownId);
    defaultCardList.addItem(card);
    formValidators['popup-card-form'].resetValidation();
    cardPopup.close()
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.setSubmitButtonText('Сохранить', false)
    })
}

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

