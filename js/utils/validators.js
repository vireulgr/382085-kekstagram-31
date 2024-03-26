
const MAX_HASH_TAGS_QUANTITY = 5;
const MAX_HASH_TAG_LENGTH = 20;

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

export class HashTagsValidator {

  formatChecks = [
    new Check(
      'Хэштег начинается с символа #',
      (v) => v.startsWith('#')),
    new Check(
      'Хэштег не может состоять только из одной решётки',
      (v) => v !== '#'),
    new Check(
      `Максимальная длина одного хэштега ${MAX_HASH_TAG_LENGTH} символов, включая решётку`,
      (v) => v.length <= MAX_HASH_TAG_LENGTH),
    new Check('Строка после решётки должна состоять только из букв и чисел',
      (v) => {
        if (v.startsWith('#')) { // это чтобы не путать с "Хэштег начинается с..."
          return /^#[a-zа-яё]+$/.test(v); // не путать с "Максимальная длина..."
        }
        return true;
      }
    ),
  ];

  errors = {
    format: false,
    duplicate: false,
    tooMany: false,
    formatChecks: false
  };

  hashRegExp = new RegExp(`^#[a-zа-яё]{1,${MAX_HASH_TAG_LENGTH}}$`);

  // отсюда потом можно забирать валидные хэштеги
  correctTags = new Set();

  process(value) {
    this.reset();

    // хэштеги необязательны;
    if (value.length === 0) {
      return true;
    }

    const hashTags = value.trim().toLowerCase().split(/\s+/);
    this.errors.tooMany = (hashTags.length > MAX_HASH_TAGS_QUANTITY);

    for (const tag of hashTags) {
      const isFormat = !this.hashRegExp.test(tag);
      const isDuplicate = this.correctTags.has(tag);

      let isFormatChecks = false;
      this.formatChecks.forEach((item) => {
        isFormatChecks ||= !item.check(tag);
      });

      if (isFormat || isDuplicate || isFormatChecks) {
        this.errors.format ||= isFormat;
        this.errors.duplicate ||= isDuplicate;
        this.errors.formatChecks ||= isFormatChecks;
        continue;
      }

      this.correctTags.add(tag);
    }

    return !(this.errors.format || this.errors.duplicate || this.errors.tooMany || this.errors.formatChecks);
  }

  getError() {
    const messages = [];
    if (this.errors.format) {
      messages.push('Неверный формат хэштега');
    }

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

  reset() {
    this.formatChecks.forEach((item) => item.reset());
    this.errors = {format: false, duplicate: false, tooMany: false, formatChecks: false};
    this.correctTags.clear();
  }
}
