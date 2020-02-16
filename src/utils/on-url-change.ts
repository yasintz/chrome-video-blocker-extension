type Listener<T> = (param: T) => void;

interface UrlChangeMessageParam {
  changeInfo: chrome.tabs.TabChangeInfo;
  tab: chrome.tabs.Tab;
}

export class UrlChangeMessage {
  private static _instance: UrlChangeMessage;

  private static key = 'url-change-xkixk';

  private listeners: Listener<UrlChangeMessageParam>[] = [];

  public static getInstance() {
    if (!this._instance) {
      this._instance = new UrlChangeMessage();
    }

    return this._instance;
  }

  private constructor() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.key === UrlChangeMessage.key) {
        this.listeners.forEach(listener => {
          listener(request.param);
        });
      }
    });
  }

  static send(param: UrlChangeMessageParam, tabId: number): void {
    chrome.tabs.sendMessage(tabId, {
      key: UrlChangeMessage.key,
      param,
    });
  }

  addListener(listener: Listener<UrlChangeMessageParam>): void {
    this.listeners.push(listener);
  }
}
