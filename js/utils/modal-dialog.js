
export class ModalDialog {
  dialogContainerEl;
  closeButtonEl;
  renderContentFn;
  cleanupContentFn;

  onDocumentKeyDownBound;
  onButtonCloseClickedBound;

  constructor({dialogSelector, closeButtonSelector, renderFn, cleanupFn}) {
    this.renderContentFn = renderFn;
    this.cleanupContentFn = cleanupFn;
    this.dialogContainerEl = document.querySelector(dialogSelector);
    this.closeButtonEl = this.dialogContainerEl.querySelector(closeButtonSelector);
    this.onDocumentKeyDownBound = this.onDocumentKeyDown.bind(this);
    this.onButtonCloseClickedBound = this.onButtonCloseClicked.bind(this);
  }

  /**
    */
  closeDialog() {
    this.dialogContainerEl.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.onDocumentKeyDownBound);
    this.closeButtonEl.removeEventListener('click', this.onButtonCloseClickedBound);
    this.cleanupContentFn();
  }

  /**
  * @param {any} data данные для внутренности диалога
  */
  openDialog(data) {
    document.body.classList.add('modal-open');
    this.dialogContainerEl.classList.remove('hidden');
    document.addEventListener('keydown', this.onDocumentKeyDownBound);
    this.closeButtonEl.addEventListener('click', this.onButtonCloseClickedBound);
    this.renderContentFn(data);
  }

  onDocumentKeyDown(evt) {
    if (evt.key === 'Escape') {
      this.closeDialog();
    }
  }

  onButtonCloseClicked(evt) {
    evt.preventDefault();
    this.closeDialog();
  }
}
