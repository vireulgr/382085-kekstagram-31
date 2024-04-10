/**
  * @description Генерирует случайное целое число из отрезка. Оба конца отрезка достигаются.
  * @param {number} from начало отрезка (включительно)
  * @param {number} to конец отрезка (включительно)
  * @returns {number} случайное число из отрезка
  */
function getRandInt(from, to) {
  const start = Math.min(Math.floor(from), Math.floor(to));
  const end = Math.max(Math.floor(from), Math.floor(to));
  return start + Math.round(Math.random() * Math.abs(end - start));
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
  const start = Math.min(Math.floor(from), Math.floor(to));
  const end = Math.max(Math.floor(from), Math.floor(to));

  const previousValues = new Set();
  return () => {
    if (previousValues.size >= end - start + 1) {
      return null;
    }
    let newValue = getRandInt(start, end);
    while (previousValues.has(newValue)) {
      newValue = getRandInt(start, end);
    }

    previousValues.add(newValue);

    return newValue;
  };
}

/** @description функция для устранения дребезга
  * @param {Function} cb  функция, которую нужно вызывать с устранением дребезга
  * @param {number} timeInterval интервал в миллисекундах от вызова до фактического исполнения функции
 */
function debounce(cb, timeInterval) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => cb.apply(this, args), timeInterval);
  };
}

export { getRandArrayElem, getRandInt, createUniqueRandIntGenerator, debounce };
