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

/*
* '8:00' - начало рабочего дня
* '17:30' - конец рабочего дня
* '14:00' - начало встречи
* 90 - продолжительность встречи в минутах
*/
inWorkTime('08:00', '17:30', '14:00', 90); // true
inWorkTime('8:0', '10:0', '8:0', 120); // true
inWorkTime('08:00', '14:30', '14:00', 90); // false
inWorkTime('14:00', '17:30', '08:0', 90); // false
inWorkTime('8:00', '17:30', '08:00', 900); // false

function timeToMinutes(aTime) {
  const [hours, minutes] = aTime.split(':');
  return Number(hours) * 60 + Number(minutes);
}

function testFunction(testData, aFunction) {
  for (const testCase of testData) {
    const result = aFunction(...(testCase.args));
    console.log(`args: ${testCase.args}, got ${result} expected: ${testCase.expected}`);
  }
}

function testInWorkTime() {
  const testData = [
    {args: ['08:00', '17:30', '14:00', 90], expected: true},
    {args: ['8:0', '10:0', '8:0', 120], expected: true},
    {args: ['08:00', '14:30', '14:00', 90], expected: false},
    {args: ['14:00', '17:30', '08:0', 90], expected: false},
    {args: ['8:00', '17:30', '08:00', 900], expected: false},
  ];

  testFunction(testData, inWorkTime);
}

function inWorkTime(start, end, eventStart, eventDuration) {

  const workDayStart = timeToMinutes(start);
  const workDayEnd = timeToMinutes(end);
  const eventStartMinutes = timeToMinutes(eventStart);
  const eventEnd = eventStartMinutes + eventDuration;
  return eventEnd <= workDayEnd && eventStartMinutes >= workDayStart;
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
{
  testInWorkTime();
}
