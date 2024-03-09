import { generatePicturesData } from './data-generator';

/**
*/
function createElementFromPictureItem(item, templateEl) {

  const pictureItem = templateEl.cloneNode(true);

  const pictureImg = pictureItem.querySelector('img.picture__img');
  pictureImg.src = item.url;
  pictureImg.alt = item.description;

  const commentsCount = pictureItem.querySelector('span.picture__comments');
  const likesCount = pictureItem.querySelector('span.picture__likes');

  commentsCount.textContent = item.comments.length;
  likesCount.textContent = item.likes;

  return pictureItem;
}

/**
*
*/
export function render(where) {
  const pictureTemplateContent = document.querySelector('#picture').content;
  const pictureTemplateElement = pictureTemplateContent.querySelector('a.picture');

  const picturesData = generatePicturesData();

  const fragment = document.createDocumentFragment();
  for (const picture of picturesData) {
    const domNode = createElementFromPictureItem(picture, pictureTemplateElement);
    fragment.append(domNode);
  }

  where.append(fragment);
}

