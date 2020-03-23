import createApiListeners from '~/api/background';
import { loadInitalStore } from '~/store';
import getCurrentTab from '~/utils/get-current-tab';
import isYoutubeTab from '~/utils/is-youtube-tab';
import { createContentScriptConnectionListener, executeScripts } from './utils/content-script-management';
import createRealtimeListeners from '~/api/reatime/background';
import { createContextMenus } from './utils/context-menu';

async function executeBlockHomePageScript() {
  const tab = await getCurrentTab();
  const isYoutube = await isYoutubeTab({ tab });

  if (isYoutube && tab.id) {
    executeScripts('block-home-page', tab.id);
  }
}
async function main() {
  chrome.storage.sync.get(null, items => {
    // eslint-disable-next-line
    console.log(items);
  });

  createApiListeners();
  createContentScriptConnectionListener();
  createRealtimeListeners();
  createContextMenus();

  chrome.tabs.onActivated.addListener(async () => {
    executeBlockHomePageScript();
  });
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      executeBlockHomePageScript();
    }
  });
}

loadInitalStore().then(main);
