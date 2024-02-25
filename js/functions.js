function checkLength(aString, maxLength) {
  return aString.length <= maxLength;
}

/**
 * @description Функция проверяет, является ли строка палиндромом
 * @param {string} aString строка
 * @returns {boolean} палиндром или нет
 */
function isPalindrome(aString) {

  let idx1 = 0;
  let idx2 = aString.length - 1;
  while (idx1 < idx2) {
    // пропускаем пробелы в начале
    while (aString[idx1] === ' ') {
      idx1 += 1;
    }
    // пропускаем пробелы в конце
    while (aString[idx2] === ' ') {
      idx2 -= 1;
    }

    // проверяем на палиндром
    if (aString[idx1].toLowerCase() !== aString[idx2].toLowerCase()) {
      return false;
    }

    // двигаем указатели
    idx1 += 1;
    idx2 -= 1;
  }

  return true;
}

/**
 * @description Извлекает цифры из строки
 * @param {string|number} arg входная строка
 * @returns {number} число составленное из цифр в строке
 */
function extractDigits(arg) {
  const aString = arg.toString();
  let result = 0;
  let hasDigit = false;
  for (let i = 0; i < aString.length; i += 1) {
    const digit = Number.parseInt(aString[i], 10);
    if (Number.isNaN(digit)) {
      continue;
    }
    hasDigit = true;
    result = result * 10 + digit;
  }

  if (hasDigit) {
    return result;
  } else {
    return Number.NaN;
  }
}

{
  const arg1 = '1 бутылка кефира, 0.5 батона';
  extractDigits(arg1);
  //console.log(`Извлечение цифр со строкой ${arg1}, результат: ${extractDigits(arg1)}`);
}
{
  const arg1 = 'Hello world!';
  const arg2 = 20;
  checkLength(arg1, arg2);
  //console.log(`Проверка длины строки аргументы: ${arg1} ${arg2}, результат: ${checkLength(arg1, arg2)}`);
}
{
  const arg1 = ' а роза упала на лапу азора';
  isPalindrome(arg1);
  //console.log(`Проверка на палиндром строки ${arg1}, результат ${isPalindrome(arg1)}`);
}
