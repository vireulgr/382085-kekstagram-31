import { fetchPicturesData } from './data-storage';
import { renderPicturesList } from './pictures-list';
import { showDataErrorToast } from './data-error-toast';
import './post';
import './upload-form';
import * as filters from './filters';

fetchPicturesData()
  .then(() => {
    filters.init();
    renderPicturesList();
  })
  .catch(() => {
    showDataErrorToast();
  });
