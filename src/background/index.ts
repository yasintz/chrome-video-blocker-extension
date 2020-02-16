import { loadStore } from '~/store';
import executeScripts from './utils/execute-scripts';
import isYoutubeTab from '~/utils/is-youtube-tab';
import getCurrentTab from '~/utils/get-current-tab';
import { UrlChangeMessage } from '~/utils/on-url-change';

let isInject = false;

const { blockeds } = loadStore();

async function injectScripts() {
  const isYoutube = await isYoutubeTab();
  const tab = await getCurrentTab();

  if (isYoutube && tab.id) {
    await executeScripts({
      file: 'block-home-page',
      tabId: tab.id,
      params: blockeds,
    });
    isInject = true;
  }
}

chrome.tabs.onActivated.addListener(() => {
  if (!isInject) {
    injectScripts();
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url === undefined) {
    await injectScripts();
  }
  UrlChangeMessage.send({ changeInfo, tab }, tabId);
});
