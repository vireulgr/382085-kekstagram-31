const scaleInputEl = document.querySelector('.scale__control--value');
const scaleSmallerEl = document.querySelector('.scale__control--smaller');
const scaleBiggerEl = document.querySelector('.scale__control--bigger');
const bigImageEl = document.querySelector('.img-upload__preview > img');

let imagePreviewScale = 100;

/**
 * общая логика обновления масштаба изображения
 */
function setImageScale() {
  const scaleString = `${imagePreviewScale}%`;
  scaleInputEl.setAttribute('value', scaleString);
  bigImageEl.style.transform = `scale(${imagePreviewScale / 100})`;
}

/**
 * Обработчик клика на уменьшение масштаба
 */
function onSmallerButtonClicked() {
  imagePreviewScale = imagePreviewScale <= 25 ? 25 : imagePreviewScale - 25;
  setImageScale();
}

/**
 * Обработчик клика на увеличение масшттаба
 */
function onBiggerButtonClicked() {
  imagePreviewScale = imagePreviewScale >= 100 ? 100 : imagePreviewScale + 25;
  setImageScale();
}

/**
 * должна вызываться перед отображением диалога
 */
export function init() {
  scaleSmallerEl.addEventListener('click', onSmallerButtonClicked);
  scaleBiggerEl.addEventListener('click', onBiggerButtonClicked);
}

/**
 * должна вызываться перед закрытием диалога для освобождения ресурсов
 */
export function cleanup() {
  scaleSmallerEl.removeEventListener('click', onSmallerButtonClicked);
  scaleBiggerEl.removeEventListener('click', onBiggerButtonClicked);
  imagePreviewScale = 100;
  setImageScale();
}
