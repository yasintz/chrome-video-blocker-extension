import { ApiRouteKeys, ApiType } from '.';
import { API_CONNECT_NAME } from '~/constants/api';
import { makeid } from '~/utils';

type ListenerCallback = (res: { response: any; error: any; fetchId: string }) => void;
type PayloadType<T extends ApiRouteKeys> = Parameters<ApiType[T]>[0]['payload'];
type RequestType<T extends ApiRouteKeys> = Parameters<Parameters<ApiType[T]>[1]>[0];

const port = chrome.runtime.connect({ name: API_CONNECT_NAME });

const listeners: Record<string, ListenerCallback> = {};

function addListener(fetchId: string, fn: ListenerCallback) {
  listeners[fetchId] = fn;
}

port.onMessage.addListener(async res => {
  const listener = listeners[res.fetchId];
  if (listener) {
    listener(res);
    delete listeners[res.fetchId];
  }
});

function fetch<T extends ApiRouteKeys>(id: T, params?: PayloadType<T>): Promise<RequestType<T>> {
  return new Promise((resolve, reject) => {
    const fetchId = makeid();
    addListener(fetchId, ({ response, error }) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
    port.postMessage({ ...(params as any), apiId: id, fetchId });
  });
}

export default fetch;
