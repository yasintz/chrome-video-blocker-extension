import { API_REALTIME_CONNECT_NAME } from '~/constants/api';
import { RealtimeTypeKeys, RealtimeObjectType } from './type';
import { objectForeach } from '~/utils';

const listeningPorts: Record<string, chrome.runtime.Port> = {};
function parseName(n: string) {
  const [id, name] = n.split('##');

  return { id, name };
}

function createRealtimeListeners() {
  chrome.runtime.onConnect.addListener(port => {
    if (port.name.includes(API_REALTIME_CONNECT_NAME)) {
      const { id } = parseName(port.name);
      port.onDisconnect.addListener(() => {
        delete listeningPorts[id];
      });

      listeningPorts[id] = port;
    }
  });
}

export function sendRealtime<K extends RealtimeTypeKeys>(key: K, data: RealtimeObjectType<K>) {
  objectForeach(listeningPorts, (_, port) => {
    port.postMessage({ data, realtimeKey: key });
  });
}

export default createRealtimeListeners;
