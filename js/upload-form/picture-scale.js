const scaleInputEl = document.querySelector('.scale__control--value');
const scaleSmallerEl = document.querySelector('.scale__control--smaller');
const scaleBiggerEl = document.querySelector('.scale__control--bigger');
const bigImageEl = document.querySelector('.img-upload__preview > img');

let imagePreviewScale = 100;
function onScaleButtonPressed(evt) {
  if (evt.target.classList.contains('scale__control--smaller')) {
    imagePreviewScale = imagePreviewScale <= 25 ? 25 : imagePreviewScale - 25;
  } else {
    imagePreviewScale = imagePreviewScale >= 100 ? 100 : imagePreviewScale + 25;
  }
  scaleInputEl.value = `${imagePreviewScale}%`;
  bigImageEl.style.transform = `scale(${imagePreviewScale / 100})`;
}

export function init() {
  scaleSmallerEl.addEventListener('click', onScaleButtonPressed);
  scaleBiggerEl.addEventListener('click', onScaleButtonPressed);
}

export function cleanup() {
  scaleSmallerEl.removeEventListener('click', onScaleButtonPressed);
  scaleSmallerEl.removeEventListener('click', onScaleButtonPressed);
}
