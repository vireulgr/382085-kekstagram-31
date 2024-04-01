const scaleInputEl = document.querySelector('.scale__control--value');
const scaleSmallerEl = document.querySelector('.scale__control--smaller');
const scaleBiggerEl = document.querySelector('.scale__control--bigger');
const bigImageEl = document.querySelector('.img-upload__preview > img');

let imagePreviewScale = 100;

/**
 * общая логика обновления масштаба изображения
 */
function setImageScale() {
  scaleInputEl.value = `${imagePreviewScale}%`;
  bigImageEl.style.transform = `scale(${imagePreviewScale / 100})`;
}

/**
 * Обработчик клика на уменьшение масшттаба
 */
function onSmallerButtonPressed() {
  imagePreviewScale = imagePreviewScale <= 25 ? 25 : imagePreviewScale - 25;
  setImageScale();
}

/**
 * Обработчик клика на увеличение масшттаба
 */
function onBiggerButtonPressed() {
  imagePreviewScale = imagePreviewScale >= 100 ? 100 : imagePreviewScale + 25;
  setImageScale();
}

/**
 * должна вызываться перед отображением диалога
 */
export function init() {
  scaleSmallerEl.addEventListener('click', onSmallerButtonPressed);
  scaleBiggerEl.addEventListener('click', onBiggerButtonPressed);
}

/**
 * должна вызываться перед закрытием диалога для освобождения ресурсов
 */
export function cleanup() {
  scaleSmallerEl.removeEventListener('click', onSmallerButtonPressed);
  scaleBiggerEl.removeEventListener('click', onBiggerButtonPressed);
  imagePreviewScale = 100;
  setImageScale();
}
