import { getPicturesData, setFilteredPicturesData } from './data-storage';
import { createUniqueRandIntGenerator, debounce } from './utils';
import { cleanupPictures, renderPicturesList } from './pictures-list';

const DEBOUNCE_TIMEOUT_MS = 500;

const debouncedFilterHandler = debounce((filter) => {
  cleanupPictures();

  switch (filter) {
    case 'filterRandom': {
      const intGenerator = createUniqueRandIntGenerator(1, 10);

      const picturesData = getPicturesData();
      const newPicturesData = Array.from({ length: 10 }, () => picturesData[intGenerator()]);

      setFilteredPicturesData(newPicturesData);

      break;
    }
    case 'filterDiscussed': {
      const sorted = getPicturesData().slice().sort((pictureLeft, pictureRight) => {
        if (!pictureLeft.comments) {
          return 1;
        }
        if (!pictureRight.comments) {
          return -1;
        }
        return pictureRight.comments.length - pictureLeft.comments.length;
      });

      setFilteredPicturesData(sorted);
      break;
    }
    case 'filterDefault':
    default:
      setFilteredPicturesData(getPicturesData());
  }

  renderPicturesList();
}, DEBOUNCE_TIMEOUT_MS);

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
  debouncedFilterHandler('filterDefault');
}

/**
* Случайные — 10 случайных, не повторяющихся фотографий.
*/
function onFilterRandomClick() {
  setCurrentFilter('filterRandom');
  debouncedFilterHandler('filterRandom');
}

/**
*  Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
*/
function onFilterDiscussedClick() {
  setCurrentFilter('filterDiscussed');
  debouncedFilterHandler('filterDiscussed');
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

// ????
export function cleanup() {
  for (const key in FILTERS) {
    const item = FILTERS[key];
    item.htmlElement.removeEventListener('click', item.eventHandler);
  }

  document.querySelector('.img-filters')
    .classList.add('img-filters--inactive');
}
