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

function testIsPalindrome() {
  const testData = [
    ['sas', true],
    ['saas', true],

    ['sabs', false],
    ['sasa', false],

    [' ПацАн аРаб a  барАна цаП  ', true],
    ['а роза упала на лапу азора', true],
    ['Лёша на полке клопа нашёл', true],

    ['довод', true],
    ['топот', true],
    ['Кекс', false],
  ];

  console.log('Test palindrome');
  for (const item of testData) {
    const funcOutput = isPalindrome(item[0]);
    console.assert(funcOutput === item[1], 'Input %s: expected %s but isPalindrome output %s', item[0], item[1].toString(), funcOutput.toString());
  }
}

function testExtractDigits() {
  const testData = [
    [' 123 ', 123],
    [123, 123],
    ['a00001', 1],
    ['', Number.NaN],
    ['2023 год', 2023],
    ['ECMAScript 2022', 2022],
    ['1 кефир, 0.5 батона', 105],
    ['агент 007', 7],
    ['а я томат', Number.NaN],
    [2023, 2023],
    [1, 1],
    [1.5, 15]
  ];

  console.log('Test extract digits');
  for (const item of testData) {
    const funcOutput = extractDigits(item[0]);
    //console.log(funcOutput, item[1]);
    const checkResult = (Number.isNaN(funcOutput)) ? Number.isNaN(item[1]) : funcOutput === item[1];
    console.assert(checkResult, 'Input %s: expected %s but extractDigits output %s', item[0].toString(), item[1].toString(), funcOutput.toString());
  }
}

function testCheckLength() {
  const testData = [
    [['', 0], true],
    [[' 123 ', 5], true],
    [['a00001', 6], true],
    [['2023 год', 9], true]
  ];

  console.log('Test check length');
  for (const item of testData) {
    const funcOutput = checkLength(...item[0]);
    //console.log(funcOutput, item[1]);
    console.assert(funcOutput === item[1], 'Input %s: expected %s but extractDigits output %s', item[0].toString(), item[1].toString(), funcOutput.toString());
  }
}

testIsPalindrome();
testExtractDigits();
testCheckLength();
