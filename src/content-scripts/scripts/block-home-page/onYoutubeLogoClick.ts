import $ from 'jquery';
import _debounce from 'lodash.debounce';

let isClicked = false;

export function onYoutubeLogoClick(fn: () => void) {
  $(document).ready(() => {
    $('#logo').on('click', () => {
      setTimeout(() => {
        isClicked = true;
      }, 100);
    });
    $('#contents').bind(
      'DOMSubtreeModified',
      _debounce(() => {
        if (isClicked) {
          isClicked = false;
          fn();
        }
      }, 230),
    );
  });
}
