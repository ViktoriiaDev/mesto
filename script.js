let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let title = document.querySelector('.profile__info-title');
let subtitle = document.querySelector('.profile__info-subtitle');
let inputTitle = document.querySelector('.popup__form-name');
let inputSubtitle = document.querySelector('.popup__form-description');
let popupForm = document.querySelector('.popup__form');

function handlePopupOpen() {
  popup.classList.add('popup_open');
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
}

editButton.addEventListener('click', handlePopupOpen);

function handlePopupClose() {
  popup.classList.remove('popup_open');
}

popupCloseButton.addEventListener('click', handlePopupClose);

function handleSubmitForm(event) {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent = inputSubtitle.value;
  handlePopupClose();
}

popupForm.addEventListener('submit', handleSubmitForm);
