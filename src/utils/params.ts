const PARAMS_ID = 'xixyxtyksd7kF';

export function createParamScript(params: any, file: string) {
  return `window["${PARAMS_ID}_${file}"] = ${JSON.stringify(params)};`;
}

export function getParams<T = any>(file: string): T {
  // eslint-disable-next-line
  // @ts-ignore
  return window[`${PARAMS_ID}_${file}`];
}
