import { createParamScript } from '~/utils/params';

interface ExecuteProps<T> {
  params: T;
  file: string;
  tabId: number;
}
function executeScripts<T = any>({ file, params, tabId }: ExecuteProps<T>) {
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(tabId, { code: createParamScript(params, file) }, () => {
      chrome.tabs.executeScript(tabId, { file: `dist/${file}.js` }, () => {
        resolve();
      });
    });
  });
}

export default executeScripts;
