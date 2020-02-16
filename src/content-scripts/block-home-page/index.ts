import $ from 'jquery';
import { getParams } from '~/utils/params';
import { Blocked } from '~/store';
import { UrlChangeMessage } from '~/utils/on-url-change';
import isYoutubeTab from '~/utils/is-youtube-tab';

const blockeds = getParams<Blocked[]>('block-home-page');

class BlockVideo {
  private _blocked: Blocked;

  constructor(blocked: Blocked) {
    this._blocked = blocked;
  }

  public block() {
    switch (this._blocked.type) {
      case 'channel-link':
        this._blockByChannelLink(this._blocked.key);
        break;
      case 'keyword-in-channel-name':
        this._blockByChannelName(this._blocked.key);
        break;
      case 'keyword-in-video-description':
        this._blockByVideoDescription(this._blocked.key);
        break;
      default:
        break;
    }
  }

  private _blockByChannelLink(link: string) {
    console.log('hell');
    return null;
    console.clear();
  }

  private _blockByVideoDescription(keyword: string) {}

  private _blockByChannelName(keyword: string) {}
}

function blockAll() {
  $(document).ready(() => {
    const video = $('ytd-rich-item-renderer');
    video.each((index, element) => {
      const wrap = $(element);
      const aTag = wrap.find('a.yt-simple-endpoint.style-scope.yt-formatted-string');
      const hrefAttr = aTag.attr('href');
      console.log({ wrap, aTag, hrefAttr });
    });
    // blockeds.forEach(blocked => {
    //   new BlockVideo(blocked).block();
    // });
  });
}

blockAll();
UrlChangeMessage.getInstance().addListener(async ({ tab }) => {
  if (tab.url) {
    const isYoutube = await isYoutubeTab(tab.url);
    if (isYoutube) {
      blockAll();
    }
  }
});
