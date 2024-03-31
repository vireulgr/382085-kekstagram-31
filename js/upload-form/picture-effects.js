import * as scale from './picture-scale';

const sliderInputEl = document.querySelector('.effect-level__value');
const bigImageEl = document.querySelector('.img-upload__preview > img');
const sliderContainerEl = document.querySelector('.img-upload__effect-level');
const sliderEl = sliderContainerEl.querySelector('.effect-level__slider');


const EFFECTS = [
  { value: 0, selector: '#effect-none', cssEffect: 'none', min: 0, max: 0, unit: '', step: 0 },
  { value: 0, selector: '#effect-chrome', cssEffect: 'grayscale', min: 0, max: 1, unit: '', step: 0.1 },
  { value: 0, selector: '#effect-sepia', cssEffect: 'sepia', min: 0, max: 1, unit: '', step: 0.1 },
  { value: 0, selector: '#effect-marvin', cssEffect: 'invert', min: 0, max: 100, unit: '%', step: 1 },
  { value: 0, selector: '#effect-phobos', cssEffect: 'blur', min: 0, max: 3, unit: 'px', step: 0.1 },
  { value: 1, selector: '#effect-heat', cssEffect: 'brightness', min: 1, max: 3, unit: '', step: 0.1 },
];

let currentEffect = EFFECTS[0];

EFFECTS.forEach((item) => {
  document.querySelector(item.selector)
    .addEventListener('click', onEffectClick);
});

function effectToSliderOptions(effect) {
  return {
    range: {
      min: effect.min,
      max: effect.max
    },
    step: effect.step,
    start: effect.min
  };
}


function getEffectCssFilterValue(value) {
  if (currentEffect.cssEffect === 'none') {
    return 'none';
  }

  return `${currentEffect.cssEffect}( ${value}${currentEffect.unit} )`;
}

sliderInputEl.value = 0;

noUiSlider.create(sliderEl, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  // TODO
  //format: {
  //  to(value) {
  //    return value;
  //  },
  //  from(value) {
  //    return value;
  //  }
  //}
});

function onSliderUpdate(sliderValue) {
  sliderInputEl.value = sliderValue;
  const cssFilterText = getEffectCssFilterValue(sliderValue);
  bigImageEl.style.filter = cssFilterText;
}

function setActiveEffect(effect) {
  if (effect.selector === '#effect-none') {
    sliderContainerEl.classList.add('hidden');
    sliderEl.noUiSlider.off();
  } else {
    sliderContainerEl.classList.remove('hidden');
    sliderEl.noUiSlider.on('update', onSliderUpdate);
  }
  currentEffect = effect;
  sliderEl.noUiSlider.updateOptions(effectToSliderOptions(effect));
}

function onEffectClick(evt) {
  const targetId = `#${evt.target.getAttribute('id')}`;
  const effect = EFFECTS.find((item) => item.selector === targetId);
  if (!effect) {
    return;
  }
  setActiveEffect(effect);
}


export function cleanup() {

  EFFECTS.forEach((item) => {
    document.querySelector(item.selector)
      .removeEventListener('click', onEffectClick);
  });

  sliderEl.noUiSlider.off();
  sliderEl.noUiSlider.destroy();
  scale.cleanup();
}

scale.init();
setActiveEffect(EFFECTS[0]);
