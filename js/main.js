import { fetchPicturesData } from './data-storage';
import './post';
import './upload-form';
import * as filters from './filters';

fetchPicturesData()
  .then(() => {
    filters.init();
  });
