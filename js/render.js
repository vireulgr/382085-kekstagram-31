import { generatePicturesData } from './data-generator';
// WORK IN PROGRESS

function createHtmlElement(tag, classList = [], textContent = '') {
  const elem = document.createElement(tag);
  if (classList.length > 0) {
    elem.classList.add(...classList);
  }
  if (textContent) {
    elem.textContent = textContent;
  }
  return elem;
}

function createCommentComponent() {
/*
  <li class='comment'>
    <img class='comment__avatar' src='img/avatar-1.svg' alt='Аватар'>
    <b class='comment__name'>Артём</b>
    <p class='comment__message'>Lorem ipsum dolor sit amet. Сообщение</p>
  </li>
*/
  const listItem = createHtmlElement('li', ['comment']);

  const imageEl = createHtmlElement('img', ['comment__avatar']);
  imageEl.alt = 'Аватар';
  imageEl.src = 'img/avatar-1.svg';
  const boldEl = createHtmlElement('b', ['comment__name'], 'Имя пользователя');
  const paraEl = createHtmlElement('p', ['comment__message'], 'Lorem ipsum dolor sit amet. Сообщение.');

  listItem.appendChild(imageEl);
  listItem.appendChild(boldEl);
  listItem.appendChild(paraEl);

  return listItem;
}

function createPictureItemComponent() {
/*
<li class='social picture'>
  <div class='social__header' >
    <img class="social__picture" src="img/avatar-2.svg" alt="Аватар автора фотографии" width="35" height="35">
    <p class='social__caption'>ipsum</p>
    <p class="social__likes" style='min-width: 0;'><span class="likes-count">356</span></p>
  </div>
  <figure>
    <img class='post__picture' src='img/logo-background-1.jpg' alt='Изображение'>
  </figure>
  <p class='post__description'>Описание поста</p>
  <ul class='comments'> </ul>
</li>
*/
  const listItem = createHtmlElement('li', ['social', 'picture']);

  const socHeaderEl = createHtmlElement('div', ['social__header']);

  {
    const imageEl = createHtmlElement('img', ['social__picture']);
    imageEl.width = '35';
    imageEl.height = '35';
    imageEl.alt = 'Аватар автора';
    imageEl.src = 'img/avatar-1.svg';

    const captionEl = createHtmlElement('p', ['social__caption'], 'Заголовок поста');

    const likesEl = createHtmlElement('p', ['social__likes']);
    likesEl.style.minWidth = '0';
    {
      const countEl = createHtmlElement('span', ['likes-count'], '42');

      likesEl.appendChild(countEl);
    }

    socHeaderEl.appendChild(imageEl);
    socHeaderEl.appendChild(captionEl);
    socHeaderEl.appendChild(likesEl);
  }

  listItem.appendChild(socHeaderEl);

  const figureEl = createHtmlElement('figure');
  {
    const imageEl = createHtmlElement('img', ['post__picture']);
    imageEl.alt = 'Изображение';
    imageEl.src = 'img/logo-background-1.jpg';

    figureEl.appendChild(imageEl);
  }

  listItem.appendChild(figureEl);

  const paraEl = createHtmlElement('p', ['post__description'], 'Lorem ipsum dolor sit amet. Сообщение поста.');

  listItem.appendChild(paraEl);

  const commentsEl = document.createElement('ul');
  commentsEl.classList.add('comments');

  listItem.appendChild(commentsEl);

  return listItem;
}

/**
*/
function createCommentElementFromCommentItem(comment) {
  //const commentTemplate = document.getElementById('comment-template');
  //const commentElem = commentTemplate.content.cloneNode(true);
  const commentElem = createCommentComponent();

  const commentName = commentElem.querySelector('b.comment__name');
  commentName.textContent = comment.name;
  const commentMessage = commentElem.querySelector('p.comment__message');
  commentMessage.textContent = comment.message;
  const commentAvatar = commentElem.querySelector('img.comment__avatar');
  commentAvatar.src = comment.avatar;

  return commentElem;
}

/**
*/
function createElementFromPictureItem(item) {
  //const picTemplate = document.getElementById('picture-item-template');

  //const pictureItem = picTemplate.content.cloneNode(true);
  const pictureItem = createPictureItemComponent();
  //pictureItem.dataset.postId = item.id;

  const pictureImg = pictureItem.querySelector('img.post__picture');
  pictureImg.src = item.url;

  const pictureDesc = pictureItem.querySelector('p.post__description');
  pictureDesc.textContent = item.description;


  const pictureAuthor = pictureItem.querySelector('p.social__caption');
  pictureAuthor.textContent = item.authorName;

  const likesCount = pictureItem.querySelector('span.likes-count');
  likesCount.textContent = item.likes;

  const commentsEl = pictureItem.querySelector('ul.comments');
  for (const comment of item.comments) {
    const commentItem = createCommentElementFromCommentItem(comment);
    commentsEl.appendChild(commentItem);
  }

  return pictureItem;
}

/**
*
*/
export function render(where) {
  const picturesData = generatePicturesData();
  for (const picture of picturesData) {
    const domNode = createElementFromPictureItem(picture);
    where.appendChild(domNode);
  }
}

