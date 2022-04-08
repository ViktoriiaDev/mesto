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
const popupWindow = document.querySelector('.popup__window');


const createPlace = (card) => {
  const template = document.querySelector('#cards__item');
  const cardItem = template.content.querySelector('.cards__item').cloneNode(true);
  const name = cardItem.querySelector('.cards__item-title');
  const image = cardItem.querySelector('.cards__item-image');
  const heartButton = cardItem.querySelector('.cards__item-button');
  const removeCard = cardItem.querySelector('.cards__trash-button');
  name.textContent = card.name;
  image.setAttribute('src', card.link);
  image.setAttribute('alt', card.name);

  heartButton.addEventListener('click', function (event) {
    event.target.classList.toggle('cards__item-button_active');
  })

  removeCard.addEventListener('click', function () {
    cardItem.remove();
  })

  image.addEventListener('click', function () {
    openPopup(picturePopup);
    pictureImage.setAttribute('src', card.link);
    pictureImage.setAttribute('alt', card.name);
    pictureDescription.textContent = card.name;
  })

  return cardItem
}

const cards = initialCards.map(createPlace);

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
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
  const card = createPlace({
    name: placeName,
    link: placeLink,
  })
  cardList.prepend(card);
  handleCardClose();
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
