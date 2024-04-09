import * as scale from './picture-scale';

const sliderInputEl = document.querySelector('.effect-level__value');
const bigImageEl = document.querySelector('.img-upload__preview > img');
const sliderContainerEl = document.querySelector('.img-upload__effect-level');
const sliderEl = sliderContainerEl.querySelector('.effect-level__slider');

/**
 * @typedef {Object} Effect
 * @prop {string} selector radio button ID
 * @prop {string} cssEffect текст для CSS эффекта transform
 * @prop {number} min
 * @prop {number} max
 * @prop {number} step шаг для слайдера
 * @prop {string} unit единица измерения (% или px или ничего)
 */

/**
 * @type {Effect[]}
 */
const EFFECTS = [
  { selector: '#effect-none', cssEffect: 'none', min: 0, max: 0, unit: '', step: 0 },
  { selector: '#effect-chrome', cssEffect: 'grayscale', min: 0, max: 1, unit: '', step: 0.1 },
  { selector: '#effect-sepia', cssEffect: 'sepia', min: 0, max: 1, unit: '', step: 0.1 },
  { selector: '#effect-marvin', cssEffect: 'invert', min: 0, max: 100, unit: '%', step: 1 },
  { selector: '#effect-phobos', cssEffect: 'blur', min: 0, max: 3, unit: 'px', step: 0.1 },
  { selector: '#effect-heat', cssEffect: 'brightness', min: 1, max: 3, unit: '', step: 0.1 },
];

let currentEffect = EFFECTS[0];

/**
 * общая логика выбора нового эффекта из списка
 * @param {Effect}} effect новый выбранный эффект
 */
function setActiveEffect(effect) {
  currentEffect = effect;
  sliderEl.noUiSlider.updateOptions(effectToSliderOptions(effect));
  sliderEl.noUiSlider.off(); // убираем старый обработчик
  if (effect.selector === '#effect-none') {
    sliderContainerEl.classList.add('hidden');
    onSliderUpdate(0);
  } else {
    sliderContainerEl.classList.remove('hidden');
    sliderEl.noUiSlider.on('update', onSliderUpdate);
  }
}

/**
 *
 * @param {Effect} effect
 * @returns {Object} объект опций для noUiSlider
 */
function effectToSliderOptions(effect) {
  return {
    range: {
      min: effect.min,
      max: effect.max
    },
    step: effect.step,
    start: effect.max
  };
}

/**
 * строит текст свойства CSS transform для числового значения value
 * @param {number} value значение эффкта
 * @returns {void}
 */
function getEffectCssFilterValue(value) {
  if (currentEffect.cssEffect === 'none') {
    return 'none';
  }

  return `${currentEffect.cssEffect}( ${value}${currentEffect.unit} )`;
}

/**
 * обработчик события update для noUiSlider
 * @param {number} sliderValue новое значение
 */
function onSliderUpdate(sliderValue) {
  const numberValue = Number.parseFloat(sliderValue[0] ?? '0.0');
  const stringValue = (Number.isInteger(numberValue)) ? numberValue.toFixed(0) : numberValue.toFixed(1);
  sliderInputEl.value = stringValue; // запись в hidden элемент
  const cssFilterText = getEffectCssFilterValue(sliderValue);
  bigImageEl.style.filter = cssFilterText;
}

/**
 * обработчик выбора нового эффекта
 * @param {Event} evt объект событие
 * @returns {void}
 */
function onEffectClick(evt) {
  const targetId = `#${evt.target.getAttribute('id')}`;
  const effect = EFFECTS.find((item) => item.selector === targetId);
  if (!effect) {
    return;
  }
  setActiveEffect(effect);
}

/**
 * нужно вызывать перед отображением панели с эффектами
 * @param {string} base64Image выбранное пользователем изображение в формате base64
 */
export function init(base64Image) {
  EFFECTS.forEach((item) => {
    document.querySelector(`${item.selector} + label > span.effects__preview`)
      .style.backgroundImage = `url('${base64Image}')`;

    document.querySelector(item.selector)
      .addEventListener('click', onEffectClick);
  });

  sliderInputEl.value = 0;

  scale.init();

  noUiSlider.create(sliderEl, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower'
  });

  setActiveEffect(EFFECTS[0]);
}

/**
 * Нужно вызывать перед закрытием диалога, чтобы очистить ресурсы
 */
export function cleanup() {

  EFFECTS.forEach((item) => {
    document.querySelector(item.selector)
      .removeEventListener('click', onEffectClick);
  });

  setActiveEffect(EFFECTS[0]);

  sliderEl.noUiSlider.off();
  sliderEl.noUiSlider.destroy();
  scale.cleanup();
}
