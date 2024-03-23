
export class ModalDialog {
  dialogContainerEl;
  closeButtonEl;
  renderContentFn;
  cleanupContentFn;

  constructor({dialogSelector, closeButtonSelector, renderFn, cleanupFn}) {
    this.renderContentFn = renderFn;
    this.cleanupContentFn = cleanupFn;
    this.dialogContainerEl = document.querySelector(dialogSelector);
    this.closeButtonEl = this.dialogContainerEl.querySelector(closeButtonSelector);
  }

  /**
    */
  closeDialog() {
    this.dialogContainerEl.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.onDocumentKeyDown.bind(this));
    this.closeButtonEl.removeEventListener('click', this.onBtnCloseClicked.bind(this));
    this.cleanupContentFn();
  }

  /**
  * @param {any} data данные для внутренности диалога
  */
  openDialog(data) {
    document.body.classList.add('modal-open');
    this.dialogContainerEl.classList.remove('hidden');
    document.addEventListener('keydown', this.onDocumentKeyDown.bind(this));
    this.closeButtonEl.addEventListener('click', this.onBtnCloseClicked.bind(this));
    this.renderContentFn(data);
  }

  onDocumentKeyDown(evt) {
    if (evt.key === 'Escape') {
      this.closeDialog();
    }
  }

  onBtnCloseClicked(evt) {
    evt.preventDefault();
    this.closeDialog();
  }
}
