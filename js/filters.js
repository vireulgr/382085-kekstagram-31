import { getPicturesData, setFilteredPicturesData } from './data-storage';
import { createUniqueRandIntGenerator } from './utils';
import { cleanupPictures, renderPicturesList } from './pictures-list';

// TODO debounce


const FILTERS = {
  filterDefault: { htmlElement: document.querySelector('#filter-default'), eventHandler: onFilterDefaultClick },
  filterRandom: { htmlElement: document.querySelector('#filter-random'), eventHandler: onFilterRandomClick },
  filterDiscussed: { htmlElement: document.querySelector('#filter-discussed'), eventHandler: onFilterDiscussedClick }
};


/**
* По умолчанию — фотографии в изначальном порядке с сервера.
*/
function onFilterDefaultClick() {
  setCurrentFilter('filterDefault');

  cleanupPictures();
  setFilteredPicturesData(getPicturesData());
  renderPicturesList();
}

/**
* Случайные — 10 случайных, не повторяющихся фотографий.
*/
function onFilterRandomClick() {
  setCurrentFilter('filterRandom');

  cleanupPictures();
  const intGenerator = createUniqueRandIntGenerator(1, 10);

  const picturesData = getPicturesData();
  const newPicturesData = Array.from({length: 10}, () => picturesData[intGenerator()]);

  setFilteredPicturesData(newPicturesData);

  renderPicturesList();
}

/**
*  Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
*/
function onFilterDiscussedClick() {
  setCurrentFilter('filterDiscussed');

  cleanupPictures();
  const sorted = getPicturesData().slice(0, 10).sort((a, b) => {
    if (!a.comments) {
      return 1;
    }
    if (!b.comments) {
      return -1;
    }
    return (a.comments.length < b.comments.length ? 1 : -1);
  });

  setFilteredPicturesData(sorted);
  renderPicturesList();
}

/**
 * делает кнопку фильтра active, убирает у остальных кнопок active
*/
function setCurrentFilter(filter) {
  for (const key in FILTERS) {
    const item = FILTERS[key];
    if (key === filter) {
      item.htmlElement.classList.add('img-filters__button--active');
    } else {
      item.htmlElement.classList.remove('img-filters__button--active');
    }
  }
}

export function init() {
  for (const key in FILTERS) {
    const item = FILTERS[key];
    item.htmlElement.addEventListener('click', item.eventHandler);
  }

  document.querySelector('.img-filters')
    .classList.remove('img-filters--inactive');

  onFilterDefaultClick();
}

export function cleanup() {
  for (const key in FILTERS) {
    const item = FILTERS[key];
    item.htmlElement.removeEventListener('click', item.eventHandler);
  }

  document.querySelector('.img-filters')
    .classList.add('img-filters--inactive');
}
