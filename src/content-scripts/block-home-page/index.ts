// import $ from 'jquery';
// import { UrlChangeMessage } from '~/utils/on-url-change';
// import isYoutubeTab from '~/utils/is-youtube-tab';
// import { getParams } from '~/utils/params';

// let links = getParams<string[]>('block-home-page');

// function hasEqual(href: string) {
//   return links.indexOf(`https://www.youtube.com${href}`) > -1;
// }

// function blockAll() {
//   const video = $('ytd-rich-item-renderer');
//   video.each((index, element) => {
//     const wrap = $(element);
//     const aTag = wrap.find('a.yt-simple-endpoint.style-scope.yt-formatted-string');
//     const hrefAttr = aTag.attr('href');
//     if (hrefAttr && hasEqual(hrefAttr)) {
//       wrap.remove();
//     }
//   });
// }
// function handleScroll() {
//   // TODO: optimeze this
//   blockAll();
// }
// function main() {
//   $(document).ready(() => {
//     blockAll();
//     $(window).off('scroll', handleScroll);
//     $(window).scroll(handleScroll);
//   });
// }

// main();
// UrlChangeMessage.getInstance().addListener(async ({ tab }) => {
//   if (tab.url) {
//     const isYoutube = await isYoutubeTab(tab.url);
//     if (isYoutube) {
//       main();
//     }
//   }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.key === 'update-blocks') {
//     links = request.blocks;
//     $(document).ready(blockAll);
//   }
// });
