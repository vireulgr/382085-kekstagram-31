/*
const example = {
    id: 123,
    url: 'photos/{{i}}.jpg',
    description: 'описание',
    likes: 9,
    comments: [
          {
                  id: 132,
                  avatar: 'img/avatar-6.svg',
                  message: 'В целом всё неплохохохо',
                  name: 'Артём',
                },
          {
                  id: 132,
                  avatar: 'img/avatar-{{random() * 5 + 1}}.svg',
                  message: 'В целом всё неплохохохо',
                  name: 'Артём',
                },
        ]
}
*/

/**
  * @typedef {Object} CommentItem
  * @property {number} id
  * @property {string} avatar
  * @property {string} message
  * @property {string} name
  */

/**
  * @typedef {Object} PictureItem
  * @property {number}  id: 123,
  * @property {string}  url: 'photos/{{i}}.jpg',
  * @property {string}  description: 'описание',
  * @property {number}  likes: 9,
  * @property {CommentItem[]}  comments
  */

/**
  * @description Генерирует случайное целое число из отрезка. Оба конца отрезка достигаются.
  * @param {number} from начало отрезка (включительно)
  * @param {number} to конец отрезка (включительно)
  * @returns {number} случайное число из отрезка
  */
function getRandInt(from, to) {
  return from + Math.round(Math.random() * Math.abs(to - from));
}

/**
  * @description Генерирует сообщение для комментария
  * @returns {string} 1 или 2 случайных предложения из заданного массива
  */
function getCommentMessage() {
  const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  const qty = getRandInt(1, 2);
  const result = [];
  for (let i = 0; i < qty; i += 1) {
    result.push(MESSAGES[getRandInt(0, MESSAGES.length - 1)]);
  }

  return result.join(' ');
}

/**
  * @description Генерирует url для аватара для комментария
  * @returns {string} строка для поля avatar
  */
function getCommentAvatar() {
  const num = getRandInt(1, 6);
  return 'img/avatar-' + num + '.svg';
}

/**
  * @description Генерирует имя для комментария
  * @returns {string} случайное имя комментатора
  */
function getCommentName() {
  const NAMES = [
    'Анастасия',
    'Анна',
    'Артём',
    'Василий',
    'Екатерина',
    'Елизавета',
    'Кирилл',
    'Константин',
    'Ксения',
    'Марина',
    'Мария',
    'Оксана',
    'Пётр',
    'Юлия',
    'Яков'
  ];
  return NAMES[getRandInt(0, NAMES.length - 1)];
}

/**
  * @description Генерирует URL для картинки
  * @returns {string} URL
  */
function getPictureUrl(index) {
  const num = (1 + (index % 25));
  return 'photos/' + num + '.jpg';
}

/**
  * @description Генерирует массив комментариев
  * @returns {CommentItem[]} массив комментариев
  */
function generateComments(qty) {
  const result = [];

  for (let i = 0; i < qty; i += 1) {
    result.push({
      id: i,
      avatar: getCommentAvatar(),
      message: getCommentMessage(),
      name: getCommentName(),
    });
  }

  return result;
}

/**
  * @description Генерирует массив комментариев
  * @returns {PictureItem}
  */
function generatePictureObject(idx) {

  const comments = generateComments(getRandInt(0, 30));
  const obj = {
    id: idx,
    url: getPictureUrl(idx),
    description: 'Описание поста.',
    likes: getRandInt(0, 150),
    comments
  };
  return obj;
}

function createCommentElementFromCommentItem(comment) {
  const commentTemplate = document.getElementById('comment-template');
  const commentElem = commentTemplate.content.cloneNode(true);

  const commentName = commentElem.querySelector('b.comment__name');
  commentName.textContent = comment.name;
  const commentMessage = commentElem.querySelector('p.comment__message');
  commentMessage.textContent = comment.message;
  const commentAvatar = commentElem.querySelector('img.comment__avatar');
  commentAvatar.src = comment.avatar;

  return commentElem;
}

function createElementFromPictureItem(item) {
  const picTemplate = document.getElementById('picture-item-template');

  const pictureItem = picTemplate.content.cloneNode(true);
  //pictureItem.dataset.postId = item.id;

  const pictureImg = pictureItem.querySelector('img.post__picture');
  pictureImg.src = item.url;

  const pictureDesc = pictureItem.querySelector('p.post__description');
  pictureDesc.textContent = item.description;

  const likesCount = pictureItem.querySelector('span.likes-count');
  likesCount.textContent = item.likes;

  const comments = pictureItem.querySelector('ul.comments');
  for (const comment of item.comments) {
    const commentItem = createCommentElementFromCommentItem(comment);
    comments.appendChild(commentItem);
  }

  return pictureItem;
}

function main() {
  const picsContainer = document.querySelector('ul.posts');
  for (let i = 0; i < 25; i += 1) {
    const pictureItem = generatePictureObject(i);
    const domNode = createElementFromPictureItem(pictureItem);
    picsContainer.appendChild(domNode);
  }
}

main();
