import { ModalDialog } from './utils/modal-dialog';
import { HashTagsValidator } from './utils/validators';
import { showResultMessage } from './show-send-result';

const uploadFormEl = document.querySelector('.img-upload__form');
const descrInputEl = uploadFormEl.querySelector('.text__description');
const hashInputEl = uploadFormEl.querySelector('.text__hashtags');

const dialog = new ModalDialog({
  dialogSelector: '.img-upload__overlay',
  closeButtonSelector: '#upload-cancel',
  renderFn: render,
  cleanupFn: cleanup
});

const pristine = new Pristine(uploadFormEl, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});


const imgUploadEl = document.querySelector('.img-upload__input');

imgUploadEl.addEventListener('change', () => {
  dialog.openDialog();
});


function onInputKeyPressed(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }

  const formData = new FormData(uploadFormEl);

  const requestInit = { method: 'post', body: formData };

  dialog.closeDialog();

  fetch('https://31.javascript.htmlacademy.pro/kekstagram', requestInit)
    .then(showResultMessage.bind(null, 'success'), showResultMessage.bind(null, 'error'));
}

function render() {
  // nouislider
  // <div class="effect-level__slider"></div>
  // <input class="effect-level__value" type="number" step="any" name="effect-level" value="">

  descrInputEl.addEventListener('keydown', onInputKeyPressed);
  hashInputEl.addEventListener('keydown', onInputKeyPressed);

  uploadFormEl.addEventListener('submit', onFormSubmit);

  pristine.addValidator(descrInputEl, () => true, 'Ошибка валидации описания');

  const tagsValidator = new HashTagsValidator();
  pristine.addValidator(
    hashInputEl,
    tagsValidator.process.bind(tagsValidator),
    tagsValidator.getError.bind(tagsValidator));
}

function cleanup() {
  imgUploadEl.value = '';

  descrInputEl.removeEventListener('keydown', onInputKeyPressed);
  hashInputEl.removeEventListener('keydown', onInputKeyPressed);

  uploadFormEl.removeEventListener('submit', onFormSubmit);
}
