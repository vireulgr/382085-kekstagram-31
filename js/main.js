import { fetchPicturesData } from './data-storage';
import { renderPicturesList } from './pictures-list';
import { showDataErrorToast } from './data-error-toast';
import './post';
import './upload-form';

fetchPicturesData()
  .then(() => {
    renderPicturesList();
  })
  .catch(() => {
    showDataErrorToast();
  });
