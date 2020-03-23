import { CONENTENT_SCRIPT_CONNECT_NAME, CONENTENT_SCRIPT_PAGE_ID_KEY } from '~/constants/content-script-management';

function getName() {
  return `${(window as any)[CONENTENT_SCRIPT_PAGE_ID_KEY]}##${CONENTENT_SCRIPT_CONNECT_NAME}`;
}

export function sendConnectionInfoToBackground() {
  chrome.runtime.connect({ name: getName() });
}
