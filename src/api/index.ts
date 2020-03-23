import handlers from './handlers';

export type Route<P, R> = (
  req: { payload: P; sender: chrome.runtime.Port['sender'] },
  res: (r: R) => void,
  sendError: (error: any) => void,
) => void;

const api = handlers;

export type ApiType = typeof api;

export type ApiRouteKeys = keyof ApiType;

export default api;
