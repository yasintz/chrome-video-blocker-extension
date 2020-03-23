import { sendConnectionInfoToBackground } from '~/content-scripts/utils/background-notification';
import { subscribeRealtime } from '~/api/reatime/clients';
import { blockVideos } from './block';
import { onYoutubeLogoClick } from './onYoutubeLogoClick';
import { onAfterScrollEnd } from './onScroll';
import { onChangeElementLength } from './onChangeElementLength';

sendConnectionInfoToBackground();

blockVideos();

subscribeRealtime('updatedBlockeds', blockeds => {
  blockVideos(blockeds);
});

onYoutubeLogoClick(() => {
  blockVideos();
});

onAfterScrollEnd(() => {
  blockVideos();
});

onChangeElementLength(() => {
  blockVideos();
});
