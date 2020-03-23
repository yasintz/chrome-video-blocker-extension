import $ from 'jquery';

const NETWORK_CALL_DISTANCE = 500;

let isRunFn = false;

export function onAfterScrollEnd(fn: () => void) {
  $(window).scroll(() => {
    const scrollTop = $(window).scrollTop() as number;
    const scrollHeight = $(window).height() as number;
    const documentHeight = $(document).height() as number;
    const distanceToEndPage = documentHeight - (scrollHeight + scrollTop);
    if (distanceToEndPage <= NETWORK_CALL_DISTANCE && !isRunFn) {
      isRunFn = true;
      setTimeout(() => {
        fn();
        isRunFn = false;
        setTimeout(fn, 700);
      }, 700);
    }
  });
}
