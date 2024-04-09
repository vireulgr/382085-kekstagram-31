import { ModalDialog } from '../utils/modal-dialog';
import { HashTagsValidator } from '../utils/validators';
import { showResultMessage } from '../show-send-result';
import * as effects from './picture-effects';

const DESCRIPTION_MAX_LENGTH = 140;
const UPLOAD_PICTURE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/';
const uploadFormEl = document.querySelector('.img-upload__form');
const descrInputEl = uploadFormEl.querySelector('.text__description');
const hashInputEl = uploadFormEl.querySelector('.text__hashtags');
const imagePreview = uploadFormEl.querySelector('.img-upload__preview > img');

let canClose = true;

const dialog = new ModalDialog({
  dialogSelector: '.img-upload__overlay',
  closeButtonSelector: '#upload-cancel',
  onClose: onClose,
  renderFn: render,
  cleanupFn: cleanup
});

const tagsValidator = new HashTagsValidator();

const pristine = new Pristine(uploadFormEl, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
}, false);

pristine.addValidator(
  descrInputEl,
  (value) => value.length <= DESCRIPTION_MAX_LENGTH,
  `Текст описания содержит больше ${DESCRIPTION_MAX_LENGTH} символов`);

pristine.addValidator(
  hashInputEl,
  tagsValidator.process.bind(tagsValidator),
  tagsValidator.getError.bind(tagsValidator));


const imgUploadEl = document.querySelector('.img-upload__input');

imgUploadEl.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (!file.type.startsWith('image/')) {
    return;
  }

  const fileUrl = URL.createObjectURL(file);
  dialog.openDialog(fileUrl);
});


function onInputKeyPressed(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  if (!pristine.validate()) {
    return;
  }

  const submitButtonEl = uploadFormEl.querySelector('#upload-submit');
  submitButtonEl.setAttribute('disabled', '');

  const formData = new FormData(evt.target);
  const requestInit = { method: 'POST', body: formData, credentials: 'same-origin' };
  fetch(UPLOAD_PICTURE_URL, requestInit)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response);
      }
      showResultMessage('success');
    })
    .catch(() => {
      showResultMessage('error', () => {
        canClose = true;
      });
      canClose = false;
    })
    .finally(() => {
      submitButtonEl.removeAttribute('disabled');
      dialog.closeDialog();
    });
}

function render(base64Image) {
  descrInputEl.addEventListener('keydown', onInputKeyPressed);
  hashInputEl.addEventListener('keydown', onInputKeyPressed);

  uploadFormEl.addEventListener('submit', onFormSubmit);

  imagePreview.src = base64Image;
  effects.init(base64Image);
}

function cleanup() {

  descrInputEl.removeEventListener('keydown', onInputKeyPressed);
  hashInputEl.removeEventListener('keydown', onInputKeyPressed);

  uploadFormEl.removeEventListener('submit', onFormSubmit);

  effects.cleanup();
  uploadFormEl.reset();
  tagsValidator.reset();
  pristine.reset();
}

function onClose() {
  return canClose;
}
