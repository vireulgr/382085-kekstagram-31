const dataErrorTemplate = document.querySelector('#data-error');
const dataErrorEl = dataErrorTemplate.content.querySelector('.data-error');

export function showDataErrorToast() {
  const result = dataErrorEl.cloneNode(true);

  document.body.append(result);

  setTimeout(() => {
    result.remove();
  }, 5000);
}
