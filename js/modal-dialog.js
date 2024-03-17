import { renderPost, clearPost } from './post';

const dialogContainer = document.querySelector('.big-picture');
const closeButton = dialogContainer.querySelector('#picture-cancel');

const picturesContainer = document.querySelector('.pictures');
// открытие диалога по клику сделано через делегирование обработки
// событий клика для каждого изображения
picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault(); // чтобы не переходить по ссылке
    // dataset.id нужно чтобы содержимое диалога знало откуда
    // брать данные для отображения
    openDialog(evt.target.dataset.id);
  }
});

// открытие диалога по Enter сделано через делегирование обработки
// событий клика для каждой ссылки
picturesContainer.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter'
    && evt.target.tagName === 'A'
    && evt.target.classList.contains('picture')) {
    evt.preventDefault(); // чтобы не переходить по ссылке
    const id = evt.target.querySelector('.picture__img').dataset.id;
    // dataset.id нужно чтобы содержимое диалога знало откуда
    // брать данные для отображения
    openDialog(id);
  }
});

function closeDialog() {
  dialogContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  closeButton.removeEventListener('click', onBtnCloseClicked);
  clearPost();
}

/**
  * @param {any} data данные для внутренности диалога
  */
function openDialog(data) {
  document.body.classList.add('modal-open');
  dialogContainer.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  closeButton.addEventListener('click', onBtnCloseClicked);
  renderPost(data);
}

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeDialog();
  }
}

function onBtnCloseClicked(evt) {
  evt.preventDefault();
  closeDialog();
}

