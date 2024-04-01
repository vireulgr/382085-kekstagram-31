import { getFilteredPicturesData } from './data-storage';

/**
*/
function fillPictureItem(data, template) {

  const pictureImg = template.querySelector('.picture__img');
  pictureImg.src = data.url;
  pictureImg.alt = data.description;
  pictureImg.dataset.id = data.id;

  const commentsCount = template.querySelector('span.picture__comments');
  const likesCount = template.querySelector('span.picture__likes');

  commentsCount.textContent = data.comments.length;
  likesCount.textContent = data.likes;

  return template;
}

/**
* Удаляет все картинки из контейнера
*/
export function cleanupPictures() {
  const picturesEls = document.querySelectorAll('.pictures .picture');
  for (const el of picturesEls) {
    el.remove();
  }
}

/**
* Создаёт элемент картинки по шаблону, заполняет данными и добавляет в контейнер
* Данные берёт фильтрованные, из data-storage
*/
export function renderPicturesList() {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplateContent = document.querySelector('#picture').content;
  const pictureTemplateElement = pictureTemplateContent.querySelector('.picture');

  const fragment = document.createDocumentFragment();
  const data = getFilteredPicturesData();
  for (const picture of data) {
    const pictureEl = pictureTemplateElement.cloneNode(true);
    fillPictureItem(picture, pictureEl);
    fragment.append(pictureEl);
  }

  picturesContainer.append(fragment);
}

