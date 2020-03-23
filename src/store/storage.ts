type SetCallback<T> = (v: T) => T;
function get<T>(args: string) {
  return new Promise<T>(resolve => {
    chrome.storage.sync.get([args], res => {
      resolve(res[args]);
    });
  });
}

async function set<T>(key: string, value: T | SetCallback<T>) {
  let newValue = value;
  if (typeof value === 'function') {
    const prevVal = await get<T>(key);
    // eslint-disable-next-line
    // @ts-ignore
    newValue = value(prevVal);
  }

  return new Promise<T>(resolve => {
    chrome.storage.sync.set({ [key]: newValue }, () => {
      resolve(newValue as T);
    });
  });
}

export { get, set };

export default { get, set };
