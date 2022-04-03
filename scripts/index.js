const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const title = document.querySelector('.profile__info-title');
const subtitle = document.querySelector('.profile__info-subtitle');
const inputTitle = document.querySelector('.popup__form-input_input_name');
const inputSubtitle = document.querySelector('.popup__form-input_input_description');
const popupForm = document.querySelector('.popup__form');
const profileForm = document.querySelector('.profile-form');
const cardForm = document.querySelector('.card-form');
const popupCardForm = document.querySelector('.popup__card-form');
const cardList = document.querySelector('.cards__list');
const inputPlaceName = document.querySelector('.popup__form-input_place_name');
const inputPlaceLink = document.querySelector('.popup__form-input_place_link');
const cardAddButton = document.querySelector('.profile__add-button');

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
  const heartButton = cardItem.querySelector('.cards__item-button');
  heartButton.addEventListener('click', function(event) {
    event.target.classList.toggle('cards__item-button_active');
  })
  return cardItem
}

const cards = initialCards.map(createPlace);

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
  cardForm.classList.remove('card-form_open');
}

function handleSubmitForm(event) {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent = inputSubtitle.value;

}

const handleSubmitCardForm = (event) =>{
  event.preventDefault();
  const placeName = inputPlaceName.value;
  const placeLink = inputPlaceLink.value;
  const card = createPlace({
    name: placeName,
    link: placeLink,
  })
  cardList.prepend(card);
  handlePopupClose();
}


editButton.addEventListener('click', handleProfileOpen);
popupCloseButton.addEventListener('click', handlePopupClose);
popupForm.addEventListener('submit', handleSubmitForm);
cardAddButton.addEventListener('click', handleCardOpen);
popupCardForm.addEventListener('submit', handleSubmitCardForm);
