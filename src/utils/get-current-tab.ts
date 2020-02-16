function getCurrentTab() {
  return new Promise<chrome.tabs.Tab>((resolve, reject) => {
    chrome.windows.getCurrent(({ id }) => {
      chrome.tabs.query(
        {
          active: true,
          windowId: id,
        },
        tabs => {
          resolve(tabs[0]);
        },
      );
    });
  });
}

export default getCurrentTab;
