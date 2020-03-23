import * as store from '~/store';
import { makeid } from '~/utils';
import { sendRealtime } from '~/api/reatime/background';

const blockByChannelLinkContextMenu: chrome.contextMenus.CreateProperties = {
  id: 'block-by-channel-link',
  title: 'Block By Channel Link',
  contexts: ['link'],
};

export function createContextMenus() {
  chrome.contextMenus.create(blockByChannelLinkContextMenu);

  chrome.contextMenus.onClicked.addListener(async data => {
    async function asyncFn() {
      if (data.menuItemId === blockByChannelLinkContextMenu.id && data.linkUrl) {
        const url = data.linkUrl;
        const newBlockeds = await store.addBlocked({ type: 'channel-link', key: url, id: makeid(15) });

        sendRealtime('updatedBlockeds', newBlockeds);
      }
    }
    asyncFn();
  });
}
