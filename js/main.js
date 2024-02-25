/* Пример объекта PictureItem
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

const DESCRIPTIONS = [
  'Отличное описание поста',
  'Ещё одно прелестное описание поста',
  'Это описание поста привлекает удачу. Перешли его 5 своим друзьям и будешь успешен следующий год!',
  'Здесь могла бы быть ваша реклама',
  'Такое описание поста мог подготовить только опытный специалист по соц сетям!',
  'Капец',
];

const NAMES = [
  'Анастасия',
  'Андрей',
  'Анна',
  'Артём',
  'Василий',
  'Владимир',
  'Виктория',
  'Евгений',
  'Екатерина',
  'Елизавета',
  'Елена',
  'Кристина',
  'Кирилл',
  'Константин',
  'Ксения',
  'Марина',
  'Мария',
  'Михаил',
  'Максим',
  'Оксана',
  'Олег',
  'Ольга',
  'Полина',
  'Пётр',
  'Юлия',
  'Юрий',
  'Яков',
  'Яна'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


/**
  * @description Генерирует случайное целое число из отрезка. Оба конца отрезка достигаются.
  * @param {number} from начало отрезка (включительно)
  * @param {number} to конец отрезка (включительно)
  * @returns {number} случайное число из отрезка
  */
function getRandInt(from, to) {
  const _from = Math.min(Math.floor(from), Math.floor(to));
  const _to = Math.max(Math.floor(from), Math.floor(to));
  return _from + Math.round(Math.random() * Math.abs(_to - _from));
}

/**
  * @description Возвращает случайный элемент массива
  * @param {any[]} anArray исходный массив
  * @returns {any} случайное значение из массива
  */
function getRandArrayElem(anArray) {
  return anArray[getRandInt(0, anArray.length - 1)];
}

/**
  * @description Возвращает функцию, которая генерирует случайное не повторяющееся целове
  *             число из диапазона. Если все числа диапазона были возвращены,
  * @param {number} from начало отрезка (включительно)
  * @param {number} to конец отрезка (включительно)
  * @returns {number} уникальное случайное число из отрезка
  */
function createUniqueRandIntGenerator(from, to) {
  const _from = Math.min(Math.floor(from), Math.floor(to));
  const _to = Math.max(Math.floor(from), Math.floor(to));

  const prevValues = new Set();
  return () => {
    //console.log(prevValues.size);
    if (prevValues.size >= _to - _from + 1) {
      //console.error('Все значения закончились');
      return null;
    }
    let newVal = getRandInt(_from, _to);
    while (prevValues.has(newVal)) {
      newVal = getRandInt(_from, _to);
    }

    prevValues.add(newVal);

    return newVal;
  };
}

/**
  * @description Генерирует сообщение для комментария
  * @returns {string} 1 или 2 случайных предложения из заданного массива
  */
function getCommentMessage() {
  const qty = getRandInt(1, 2);

  const result = Array.from({ length: qty }, () => getRandArrayElem(MESSAGES));

  return result.join(' ');
}


/**
  * @description Генерирует массив комментариев
  * @param {number} qtu количество комментариев
  * @returns {CommentItem[]} массив комментариев
  */
function generateComments(idxGen) {
  return Array.from({length: getRandInt(0, 30)}, () => ({
    id: idxGen(),
    avatar: `img/avatar-${getRandInt(1, 6)}.svg`,
    message: getCommentMessage(),
    name: getRandArrayElem(NAMES),
  }));
}

/**
  * @description Генерирует объект поста с комментариями
  * @param {number} idx индекс объекта (от 1 до 25)
  * @returns {PictureItem}
  */
function generatePictureObject(idxGen, picGen, commentIdGen) {
  return {
    id: idxGen(),
    url: `photos/${picGen()}.jpg`,
    description: getRandArrayElem(DESCRIPTIONS),
    likes: getRandInt(15, 200),
    comments: generateComments(commentIdGen)
  };
}


function main() {
  const idGenerator = createUniqueRandIntGenerator(1, 25);
  const picGenerator = createUniqueRandIntGenerator(1, 25);
  const commentIdGenerator = createUniqueRandIntGenerator(1, 25 * 30);
  const pictures = Array.from({length: 25}, () => generatePictureObject(idGenerator, picGenerator, commentIdGenerator));
  // дальше код просто чтобы pictures хоть как то использовались и линтер не ругался
  const para = document.createElement('p');
  para.textContent = JSON.stringify(pictures);
  document.body.appendChild(para);
}

//function testGetRandIntNoRepeat() {
//  const testData = [
//    [[0, 3], (a) => a >= 0 && a <= 3],
//    [[0, 3], (a) => a >= 0 && a <= 3],
//    [[0, 3], (a) => a >= 0 && a <= 3],
//    [[0, 3], (a) => a >= 0 && a <= 3],
//    [[0, 3], (a) => a === null],
//  ];
//
//  const randGenerator = getRandIntNoRepeat(0, 3);
//  for (const [args, resCheckCb] of testData) {
//    const result = randGenerator();
//    console.log(result, resCheckCb(result));
//  }
//}

//testGetRandIntNoRepeat();
main();
