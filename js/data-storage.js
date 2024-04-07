const PICTURES_DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
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
* @type PictureItem[]
*/
let picturesData = [];


export function fetchPicturesData() {
  return fetch(PICTURES_DATA_URL)
    .then((d) => {
      if (d.ok) {
        return d.json();
      }
      throw new Error(d);
    })
    .then((d) => {
      picturesData = d;
    });
}

export function getPicturesData() {
  return picturesData;
}

