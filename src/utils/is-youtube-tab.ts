import urlParse from 'url-parse';
import getCurrentTab from './get-current-tab';

const YOUTUBE_HOSTNAME = 'www.youtube.com';
interface DefaultProps {
  tab: chrome.tabs.Tab;
  url: string;
}

async function isYoutubeTab(obj?: Partial<DefaultProps>): Promise<boolean> {
  if (obj?.url) {
    const parsedUrl = urlParse(obj.url);

    return parsedUrl.hostname === YOUTUBE_HOSTNAME;
  }
  if (obj?.tab && obj.tab.url) {
    const parsedUrl = urlParse(obj.tab.url);

    return parsedUrl.hostname === YOUTUBE_HOSTNAME;
  }
  const tab = await getCurrentTab();
  if (!tab.url) {
    return false;
  }

  const parsedUrl = urlParse(tab.url);

  return parsedUrl.hostname === YOUTUBE_HOSTNAME;
}

export default isYoutubeTab;
