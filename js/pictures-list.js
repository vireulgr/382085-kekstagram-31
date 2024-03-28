import { getPicturesData } from './data-storage';

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
*
*/
export function renderPicturesList() {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplateContent = document.querySelector('#picture').content;
  const pictureTemplateElement = pictureTemplateContent.querySelector('.picture');

  const fragment = document.createDocumentFragment();
  const data = getPicturesData();
  for (const picture of data) {
    const pictureEl = pictureTemplateElement.cloneNode(true);
    fillPictureItem(picture, pictureEl);
    fragment.append(pictureEl);
  }

  picturesContainer.append(fragment);
}

