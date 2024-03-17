import { getPicturesData } from './data-generator';

const postContainer = document.querySelector('.big-picture');

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

  const imageEl = postContainer.querySelector('.big-picture__img>img');
  imageEl.src = data.url;

  postContainer.querySelector('.likes-count').textContent = data.likes;

  postContainer.querySelector('.social__comment-shown-count')
    .textContent = data.comments.length; // TODO пока это будет скрыто
  postContainer.querySelector('.social__comment-total-count')
    .textContent = data.comments.length; // TODO пока это будет скрыто

  postContainer.querySelector('.social__caption').textContent = data.description;

  // комментарии
  const commentsContainerEl = postContainer.querySelector('.social__comments');
  const commentTemplate = commentsContainerEl.querySelector('.social__comment');

  const fragment = document.createDocumentFragment();
  for (const commentItem of data.comments) {
    const commentEl = commentTemplate.cloneNode(true);
    fillComment(commentItem, commentEl);
    fragment.append(commentEl);
  }
  commentsContainerEl.innerHTML = '';
  commentsContainerEl.append(fragment);

  // Прячем блоки счётчика комментариев
  postContainer.querySelector('.social__comment-count').classList.add('hidden');
  postContainer.querySelector('.comments-loader').classList.add('hidden');
}

export function clearPost() {
  // Тут я не понял. В презентации содержимое очищали
  // но видимо в случае кекстограма, это не подходит, т.к. разметка
  // для содержимого диалогового окна теряется

  //postContainer.innerHTML = '';
}
