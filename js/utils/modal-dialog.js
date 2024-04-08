/**
 * Простой класс который выполняет операции для скрытия/отображения диалога
 * При открытии диалога навешивает обработчики Esc, клика кнопки закрытия
 * При закрытии очищает обработчики и скрывает диалог.
 */
export class ModalDialog {
  // Родительский элемент диалога.
  // Сюда будет добавляться/отсюда удаляться класс hidden
  dialogContainerEl;
  // Кнопка закрытия. Сюда добавится обработчик 'click' который
  // вызовет закрытие и очистку диалога
  closeButtonEl;
  // Вызывается при открытии диалога
  renderContentFn;
  // Вызывается при закрытии диалога
  cleanupContentFn;
  // вызывается перед закрытием. Если возвращает true - диалог закрывается
  // Иначе не закрывается
  onCloseCb;

  // Хранят забинденные обработчики для Esc и клика на кнопку закрытия
  onDocumentKeyDownBound;
  onButtonCloseClickedBound;

  constructor({dialogSelector, closeButtonSelector, renderFn, cleanupFn, onClose}) {
    this.renderContentFn = renderFn;
    this.cleanupContentFn = cleanupFn;
    this.dialogContainerEl = document.querySelector(dialogSelector);
    this.closeButtonEl = this.dialogContainerEl.querySelector(closeButtonSelector);
    this.onDocumentKeyDownBound = this.onDocumentKeyDown.bind(this);
    this.onButtonCloseClickedBound = this.onButtonCloseClicked.bind(this);
    this.onCloseCb = onClose;
  }

  /**
   * Скрывает диалог, удаляет обработчики событий, вызывает функцию очистки
   * для содержимого диалога
   */
  closeDialog() {
    if (!!this.onCloseCb && !this.onCloseCb()) {
      return;
    }
    this.dialogContainerEl.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.onDocumentKeyDownBound);
    this.closeButtonEl.removeEventListener('click', this.onButtonCloseClickedBound);
    this.cleanupContentFn();
  }

  /**
   * Показывает диалог, добавляет обработчики на кнопку закрытия и на Esc,
   * вызывает функцию отображения содержимого диалога
   * @param {any} data данные для внутренности диалога
   */
  openDialog(data) {
    document.body.classList.add('modal-open');
    this.dialogContainerEl.classList.remove('hidden');
    document.addEventListener('keydown', this.onDocumentKeyDownBound);
    this.closeButtonEl.addEventListener('click', this.onButtonCloseClickedBound);
    this.renderContentFn(data);
  }

  /**
   * Обработчик клавиши Escape
   */
  onDocumentKeyDown(evt) {
    if (evt.key === 'Escape') {
      this.closeDialog();
    }
  }

  /**
   * Этот обработчик добавляется на кнопку закрытия диалога
   */
  onButtonCloseClicked(evt) {
    evt.preventDefault();
    this.closeDialog();
  }
}
