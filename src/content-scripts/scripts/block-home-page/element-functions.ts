import $ from 'jquery';

export class ElementFunctions {
  static getElements() {
    return $('ytd-rich-item-renderer');
  }

  static getATag(wrap: JQuery<HTMLElement>) {
    return wrap.find('a.yt-simple-endpoint.style-scope.yt-formatted-string');
  }

  static getHref(aTag: JQuery<HTMLElement>) {
    return aTag.attr('href');
  }

  static getElementsLength() {
    return ElementFunctions.getElements().length;
  }
}
