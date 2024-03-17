import { renderPost, clearPost } from './post';

const dialogContainer = document.querySelector('.big-picture');
const closeButton = dialogContainer.querySelector('#picture-cancel');

// открытие диалога сделано через делегирование обработки
// событий клика для каждого изображения
const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    // dataset.id нужно чтобы содержимое диалога знало откуда
    // брать данные для отображения
    openDialog(evt.target.dataset.id);
  }
});

// Напишите код для закрытия окна по нажатию клавиши
// Esc и клике по иконке закрытия.
function closeDialog() {
  dialogContainer.classList.add('hidden');
  // При закрытии окна не забудьте удалить этот класс.
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  closeButton.removeEventListener('click', onBtnCloseClicked);
  clearPost();
}

function openDialog(data) {
  // После открытия окна добавьте тегу <body> класс modal-open,
  // чтобы контейнер с фотографиями позади не прокручивался при скролле.
  document.body.classList.add('modal-open');
  // Для отображения окна нужно удалять класс hidden у элемента .
  // big-picture и каждый раз заполнять его данными о конкретной фотографии:
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


