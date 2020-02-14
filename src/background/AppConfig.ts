const autoSaveAppState = (store: any) => {
  // chrome.tabs.onRemoved.addListener(() => saveState(store.getState()));
  // chrome.windows.onRemoved.addListener(() => saveState(store.getState()));
  // const saveFrequency = 30000; // 30seconds * 1000milliseconds / 1second
  // setInterval(() => (saveState(store.getState())), saveFrequency);
};

export const configureApp = (store: any) => {
  autoSaveAppState(store);
};
