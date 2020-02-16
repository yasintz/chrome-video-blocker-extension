import urlParse from 'url-parse';
import getCurrentTab from './get-current-tab';

const YOUTUBE_HOSTNAME = 'www.youtube.com';

async function isYoutubeTab(url?: string): Promise<boolean> {
  if (url) {
    const parsedUrl = urlParse(url);

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
