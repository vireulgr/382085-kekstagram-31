let messageEl = null;
let closeButton = null;

function closeResultMessage() {
  messageEl.remove();
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  messageEl.removeEventListener('click', onMessageOverlayClick);
}

function onMessageOverlayClick(evt) {
  if (evt.target !== messageEl) {
    return;
  }
  evt.stopPropagation();
  closeResultMessage();
}

function onDocumentKeydown(evt) {
  console.log('overlay');
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    closeResultMessage();
  }
}

function onCloseButtonClick() {
  closeResultMessage();
}

export function showResultMessage(result) {

  let templateSel, elementSel, buttonSel;
  switch (result) {
    case 'error':
      templateSel = '#error';
      elementSel = '.error';
      buttonSel = '.error__button';
      break;
    case 'success':
      templateSel = '#success';
      elementSel = '.success';
      buttonSel = '.success__button';
      break;
    default:
      return;
  }

  const messageTemplateEl = document.querySelector(templateSel)
    .content.querySelector(elementSel);

  messageEl = messageTemplateEl.cloneNode(true);
  messageEl.addEventListener('click', onMessageOverlayClick);
  closeButton = messageEl.querySelector(buttonSel);
  closeButton.addEventListener('click', onCloseButtonClick);
  closeButton.focus();
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(messageEl);
}
