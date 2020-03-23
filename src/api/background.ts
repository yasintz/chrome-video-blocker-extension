import api, { ApiRouteKeys } from '.';
import { API_CONNECT_NAME } from '~/constants/api';

function createListeners() {
  chrome.runtime.onConnect.addListener(port => {
    if (port.name === API_CONNECT_NAME) {
      port.onMessage.addListener(request => {
        const route = api[request.apiId as ApiRouteKeys];
        if (route) {
          route(
            { sender: port.sender, payload: request },
            (response: any) => port.postMessage({ response, fetchId: request.fetchId }),
            (error: any) => port.postMessage({ error, fetchId: request.fetchId }),
          );
        }
      });
    }
  });
}

export default createListeners;
