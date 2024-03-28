import { fetchPicturesData } from './data-storage';
import { renderPicturesList } from './pictures-list';
import './post';
import './upload-form';

fetchPicturesData()
  .then(() => {
    renderPicturesList();
  });
