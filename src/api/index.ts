import { loggerApi } from './queries';
import { addBlockedMutation } from './mutations';

interface Route<P, R> {
  (params: P): Promise<R>;
  listen: (c: (req: { payload: P; sender: chrome.runtime.MessageSender }, res: (r: R) => void) => void) => void;
}
const listeners: { id: string; fn: (req: any, res: () => void) => void }[] = [];

export function createApi<P, R>(id: string): Route<P, R> {
  async function newApi(params: any) {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ ...params, uniqueId: id }, response => {
        resolve(response);
      });
    });
  }
  newApi.listen = (fn: () => void) => {
    listeners.push({ id, fn });
  };

  return newApi as Route<P, R>;
}

export function createBackgroundApi() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const listener = listeners.find(({ id }) => request.uniqueId === id);
    if (listener) {
      listener.fn({ sender, payload: request }, sendResponse);
    }
  });
}

const api = {
  logger: loggerApi,
  addBlocked: addBlockedMutation,
};

export default api;
