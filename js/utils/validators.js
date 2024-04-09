
const MAX_HASH_TAGS_QUANTITY = 5;
const MAX_HASH_TAG_LENGTH = 20;

/**
 * Инкапсулирует одну проверку формата хэштега, результат проверки
 * сохраняет. Если хотя бы один вызов проверки (check) завершился с ошибкой,
 * считается что проверка не прошла. Это состояние будет храниться до сброса.
 * Так же хранит собщение об ошибке. Если проверка не пройдена, возвращает это
 * сообщение как результат вызова getError.
 */
class Check {
  passed = true;
  message;
  predicate;

  constructor(_message, _predicate) {
    this.message = _message;
    this.predicate = _predicate;
  }

  check(val) {
    this.passed &&= this.predicate(val);
    return this.passed;
  }

  getError() {
    return this.passed ? '' : this.message;
  }

  reset() {
    this.passed = true;
  }
}

/** Класс для валидации хэштегов
 */
export class HashTagsValidator {

  // Проверки для формата тега
  formatChecks = [
    new Check(
      'Хэштег начинается с символа #',
      (inputValue) => inputValue.startsWith('#')),
    new Check(
      'Хэштег не может состоять только из одной решётки',
      (inputValue) => inputValue !== '#'),
    new Check(
      `Максимальная длина одного хэштега ${MAX_HASH_TAG_LENGTH} символов, включая решётку`,
      (inputValue) => inputValue.length <= MAX_HASH_TAG_LENGTH),
    new Check('Строка после решётки должна состоять только из букв и чисел',
      (inputValue) => {
        if (inputValue.startsWith('#')) { // это чтобы не путать с "Хэштег начинается с..."
          return /^#[a-zа-яё]+$/.test(inputValue); // не путать с "Максимальная длина..."
        }
        return true;
      }
    ),
  ];

  // ошибки найденные в ходе валидации
  errors = {
    duplicate: false,
    tooMany: false,
    formatChecks: false
  };

  // отсюда потом можно забирать валидные хэштеги
  correctTags = new Set();

  /** Валидация строки с тегами. Ошибки и корректные теги сохраняются как
   * внутреннее состояние
   */
  process(value) {
    this.reset();

    // хэштеги необязательны;
    if (value.length === 0) {
      return true;
    }

    const hashTags = value.trim().toLowerCase().split(/\s+/);
    this.errors.tooMany = (hashTags.length > MAX_HASH_TAGS_QUANTITY);

    for (const tag of hashTags) {
      const isDuplicate = this.correctTags.has(tag);

      let isFormatChecks = false;
      this.formatChecks.forEach((item) => {
        isFormatChecks ||= !item.check(tag);
      });

      if (isDuplicate || isFormatChecks) {
        this.errors.duplicate ||= isDuplicate;
        this.errors.formatChecks ||= isFormatChecks;
        continue;
      }

      this.correctTags.add(tag);
    }

    return !(this.errors.duplicate || this.errors.tooMany || this.errors.formatChecks);
  }

  /** После обработки (process) строит сообщение об ошибках
   */
  getError() {
    const messages = [];
    if (this.errors.duplicate) {
      messages.push('Один и тот же хэштег не может быть использован дважды');
    }

    if (this.errors.tooMany) {
      messages.push(`Нельзя указать больше ${MAX_HASH_TAGS_QUANTITY} хэштега(ов)`);
    }

    this.formatChecks.forEach((item) => {
      const result = item.getError();
      if (result) {
        messages.push(result);
      }
    });
    return messages.join('; ');
  }

  /** Сбрасывает ошибки
   */
  reset() {
    this.formatChecks.forEach((item) => item.reset());
    this.errors = {duplicate: false, tooMany: false, formatChecks: false};
    this.correctTags.clear();
  }
}
