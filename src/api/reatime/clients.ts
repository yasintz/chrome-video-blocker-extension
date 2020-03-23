import { API_REALTIME_CONNECT_NAME } from '~/constants/api';
import { makeid, objectForeach } from '~/utils';
import { RealtimeTypeKeys, RealtimeObjectType } from './type';

type Callback<T> = (data: T) => void;
function getName() {
  return `${makeid()}##${API_REALTIME_CONNECT_NAME}`;
}
const listeners: Record<string, { realtimeKey: string; cb: Callback<any> }> = {};
const port = chrome.runtime.connect({ name: getName() });

port.onMessage.addListener(res => {
  objectForeach(listeners, (key, { realtimeKey, cb }) => {
    if (res.realtimeKey === realtimeKey) {
      cb(res.data);
    }
  });
});

export function subscribeRealtime<K extends RealtimeTypeKeys>(key: K, cb: Callback<RealtimeObjectType<K>>) {
  const id = makeid(10);
  listeners[id] = { cb, realtimeKey: key };

  return () => {
    delete listeners[id];
  };
}
