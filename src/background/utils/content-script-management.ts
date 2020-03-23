import { CONENTENT_SCRIPT_CONNECT_NAME, CONENTENT_SCRIPT_PAGE_ID_KEY } from '~/constants/content-script-management';

type PageIds = 'block-home-page';

const contentScriptStore: Record<string, boolean> = {};
function getExecuteStatus(tabId: number, pageId: string) {
  return contentScriptStore[`${pageId}${tabId}`];
}

function setExecuteStatus(tabId: number, pageId: string, val: boolean) {
  contentScriptStore[`${pageId}${tabId}`] = val;
}

function parseName(n: string) {
  const [pageId, name] = n.split('##');

  return { name, pageId };
}

export function createContentScriptConnectionListener() {
  chrome.runtime.onConnect.addListener(port => {
    if (port.name.includes(CONENTENT_SCRIPT_CONNECT_NAME)) {
      port.onDisconnect.addListener(disconnectedPort => {
        const { pageId } = parseName(port.name);
        setExecuteStatus(disconnectedPort.sender?.tab?.id as number, pageId, false);
      });
    }
  });
}

export function executeScripts(pageId: PageIds, tabId: number, force = false) {
  return new Promise((resolve, reject) => {
    if (!getExecuteStatus(tabId, pageId) || force) {
      chrome.tabs.executeScript(tabId, { code: `window['${CONENTENT_SCRIPT_PAGE_ID_KEY}'] = '${pageId}'` });
      chrome.tabs.executeScript(tabId, { file: `dist/${pageId}.js` }, () => {
        setExecuteStatus(tabId, pageId, true);
        resolve();
      });
    } else {
      resolve();
    }
  });
}
