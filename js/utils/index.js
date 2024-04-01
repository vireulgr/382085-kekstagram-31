
/**
  * @description Генерирует случайное целое число из отрезка. Оба конца отрезка достигаются.
  * @param {number} from начало отрезка (включительно)
  * @param {number} to конец отрезка (включительно)
  * @returns {number} случайное число из отрезка
  */
function getRandInt(from, to) {
  const _from = Math.min(Math.floor(from), Math.floor(to));
  const _to = Math.max(Math.floor(from), Math.floor(to));
  return _from + Math.round(Math.random() * Math.abs(_to - _from));
}

/**
  * @description Возвращает случайный элемент массива
  * @param {any[]} anArray исходный массив
  * @returns {any} случайное значение из массива
  */
function getRandArrayElem(anArray) {
  return anArray[getRandInt(0, anArray.length - 1)];
}

/**
  * @description Возвращает функцию, которая генерирует случайное не повторяющееся целове
  *             число из диапазона. Если все числа диапазона были возвращены,
  * @param {number} from начало отрезка (включительно)
  * @param {number} to конец отрезка (включительно)
  * @returns {number} уникальное случайное число из отрезка
  */
function createUniqueRandIntGenerator(from, to) {
  const _from = Math.min(Math.floor(from), Math.floor(to));
  const _to = Math.max(Math.floor(from), Math.floor(to));

  const prevValues = new Set();
  return () => {
    //console.log(prevValues.size);
    if (prevValues.size >= _to - _from + 1) {
      //console.error('Все значения закончились');
      return null;
    }
    let newVal = getRandInt(_from, _to);
    while (prevValues.has(newVal)) {
      newVal = getRandInt(_from, _to);
    }

    prevValues.add(newVal);

    return newVal;
  };
}


export { getRandArrayElem, getRandInt, createUniqueRandIntGenerator };
