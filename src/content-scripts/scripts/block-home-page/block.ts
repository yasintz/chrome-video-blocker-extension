import $ from 'jquery';
import fetch from '~/api/clients';
import { Blocked } from '~/store';
import { ElementFunctions } from './element-functions';
import { updatePrevElementLength } from './onChangeElementLength';

const removeCss = {
  opacity: 0.15,
  // display: 'none',
};

const showCss = {
  opacity: 1,
  // display: 'block',
};

function blockByChannelLink(links: string[]) {
  const videos = ElementFunctions.getElements();
  videos.each((index, element) => {
    const wrap = $(element);
    const aTag = ElementFunctions.getATag(wrap);
    if (aTag) {
      const hrefAttr = ElementFunctions.getHref(aTag);
      const hasEqual = links.indexOf(`https://www.youtube.com${hrefAttr}`) > -1;
      if (hrefAttr && hasEqual) {
        wrap.css(removeCss);
      } else {
        wrap.css(showCss);
      }
    }
  });
  updatePrevElementLength(ElementFunctions.getElementsLength());
}

export async function blockVideos(blockeds?: Blocked[]) {
  if (!blockeds) {
    blockeds = await fetch('getAllBlockeds'); // eslint-disable-line no-param-reassign
  }
  const channelLinkBlockeds = blockeds.filter(b => b.type === 'channel-link');
  blockByChannelLink(channelLinkBlockeds.map(b => b.key));
}
