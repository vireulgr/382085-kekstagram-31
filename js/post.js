import { ModalDialog } from './utils/modal-dialog';
import { getPicturesData } from './data-generator';

const COMMENTS_SHOW_STEP = 5;

const postContainer = document.querySelector('.big-picture');
const loadCommentsBtn = postContainer.querySelector('.comments-loader');
const shownCommentsEl = postContainer.querySelector('.social__comment-shown-count');
const commentsContainerEl = postContainer.querySelector('.social__comments');
const commentTemplate = commentsContainerEl.querySelector('.social__comment');

let commentsData = []; // все комментарии поста
let visibleComments = 0; // кол-во видимых комментариев

/** @description обработчик нажатия кнопки "загрузить ещё" для комментариев
 */
function onLoadCommentsClicked() {
  visibleComments += COMMENTS_SHOW_STEP;

  visibleComments = visibleComments > commentsData.length ? commentsData.length : visibleComments;

  if (commentsData.length <= visibleComments) {
    loadCommentsBtn.classList.add('hidden');
  }
  shownCommentsEl.textContent = visibleComments;

  renderNComments(visibleComments);
}

const dialog = new ModalDialog({
  dialogSelector: '.big-picture',
  closeButtonSelector: '#picture-cancel',
  renderFn: renderPost,
  cleanupFn: clearPost
});

/**
  * @param {object} data объект комментария
  * @param {HtmlElement} template шаблон, который будем заполнять данными из data
  */
function fillComment(data, template) {
  const imgEl = template.querySelector('.social__picture');
  imgEl.src = data.avatar;
  imgEl.alt = data.name;

  template.querySelector('.social__text').textContent = data.message;
}

/**
  * @param {string} id ИД, по которому будем определять отображаемый элемент данных
  */
export function renderPost(id) {
  const postId = Number.parseInt(id, 10);
  const data = getPicturesData().find((item) => item.id === postId);

  commentsData = data.comments;

  postContainer.querySelector('.big-picture__img>img')
    .src = data.url;
  postContainer.querySelector('.likes-count')
    .textContent = data.likes;
  postContainer.querySelector('.social__caption')
    .textContent = data.description;
  postContainer.querySelector('.social__comment-total-count')
    .textContent = data.comments.length;

  loadCommentsBtn.addEventListener('click', onLoadCommentsClicked);
  onLoadCommentsClicked();
}

/**
 * @param {number} quantity количество комментариев
 */
function renderNComments(quantity) {

  const commentsToDisplay = commentsData.slice(0, quantity);

  const fragment = document.createDocumentFragment();
  for (const commentItem of commentsToDisplay) {
    const commentEl = commentTemplate.cloneNode(true);
    fillComment(commentItem, commentEl);
    fragment.append(commentEl);
  }
  commentsContainerEl.innerHTML = '';
  commentsContainerEl.append(fragment);
}

export function clearPost() {
  // Тут я не понял. В презентации содержимое очищали
  // но видимо в случае кекстограма, это не подходит, т.к. разметка
  // для содержимого диалогового окна теряется

  //postContainer.innerHTML = '';

  visibleComments = 0;
  loadCommentsBtn.removeEventListener('click', onLoadCommentsClicked);
  loadCommentsBtn.classList.remove('hidden');
}

const picturesContainer = document.querySelector('.pictures');
// открытие диалога по клику сделано через делегирование обработки
// событий клика для каждого изображения
picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault(); // чтобы не переходить по ссылке
    // dataset.id нужно чтобы содержимое диалога знало откуда
    // брать данные для отображения
    dialog.openDialog(evt.target.dataset.id);
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
    dialog.openDialog(id);
  }
});

