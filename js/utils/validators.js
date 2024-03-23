
const MAX_HASH_TAGS_QUANTITY = 5;

export class HashTagsValidator {
  errors = {
    format: false,
    // хэштеги разделяются пробелами;
    // хэштег начинается с символа # (решётка);
    // строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
    // хеш-тег не может состоять только из одной решётки;
    // максимальная длина одного хэштега 20 символов, включая решётку;
    duplicate: false,
    // хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
    // один и тот же хэштег не может быть использован дважды;
    tooMany: false,
    // нельзя указать больше пяти хэштегов;
  };

  hashRegExp = new RegExp('^#[a-zа-яё]{1,19}$');

  process(value) {
    this.errors = {format: false, duplicate: false, tooMany: false};
    if (value.length === 0) {
      return true;
    }
    // хэштеги необязательны;
    // если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
    const hashTags = value.trim().toLowerCase().split(' ');
    this.errors.tooMany = (hashTags.length > MAX_HASH_TAGS_QUANTITY);

    const correctTags = new Set();
    for (const tag of hashTags) {
      const isFormat = !this.hashRegExp.test(tag);
      const isDuplicate = correctTags.has(tag);
      if (isFormat || isDuplicate) {
        this.errors.format |= isFormat;
        this.errors.duplicate |= isDuplicate;
        continue;
      }

      correctTags.add(tag);
    }

    return !(this.errors.format || this.errors.duplicate || this.errors.tooMany);
  }

  getError() {
    let message = '';
    if (this.errors.format) {
      message += 'Неверный формат хэштега';
      // хэштеги разделяются пробелами;
      // хэштег начинается с символа # (решётка);
      // строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
      // хеш-тег не может состоять только из одной решётки;
      // максимальная длина одного хэштега 20 символов, включая решётку;
    }

    if (this.errors.duplicate) {
      if (message.length > 0) {
        message += ' ';
      }
      message += 'Один и тот же хэштег не может быть использован дважды';
      // хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
      // один и тот же хэштег не может быть использован дважды;
    }

    if (this.errors.tooMany) {
      if (message.length > 0) {
        message += ' ';
      }
      message += `Нельзя указать больше ${MAX_HASH_TAGS_QUANTITY} хэштега(ов)`;
      // нельзя указать больше пяти хэштегов;
    }
    return message;
  }
}
