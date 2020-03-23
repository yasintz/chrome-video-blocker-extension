export function objectForeach<K extends string, V>(obj: Record<K, V>, callback: (key: K, value: V) => void) {
  Object.keys(obj).forEach(key => callback(key as K, obj[key as K]));
}

export function wait<T = any>(amount = 0, value?: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), amount));
}

export function makeid(length = 13) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

  let i = 0;
  while (i++ < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
