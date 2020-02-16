import React from 'react';

const keys = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pausebreak',
  20: 'capslock',
  27: 'esc',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'leftarrow',
  38: 'uparrow',
  39: 'rightarrow',
  40: 'downarrow',
  45: 'insert',
  46: 'delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'leftwindowkey',
  92: 'rightwindowkey',
  93: 'selectkey',
  96: 'numpad0',
  97: 'numpad1',
  98: 'numpad2',
  99: 'numpad3',
  100: 'numpad4',
  101: 'numpad5',
  102: 'numpad6',
  103: 'numpad7',
  104: 'numpad8',
  105: 'numpad9',
  106: 'multiply',
  107: 'add',
  109: 'subtract',
  110: 'decimalpoint',
  111: 'divide',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  144: 'numlock',
  145: 'scrolllock',
  186: 'semicolon',
  187: 'equalsign',
  188: 'comma',
  189: 'dash',
  190: 'period',
  191: 'forwardslash',
  192: 'graveaccent',
  219: 'openbracket',
  220: 'backslash',
  221: 'closebracket',
  222: 'singlequote',
} as const;
const comboKeys = {
  altKey: 'withAlt',
  ctrlKey: 'withCtrl',
  shiftKey: 'withShift',
  metaKey: 'withMeta',
} as const;

type listenerName = 'keydown' | 'keyup';
type KeyCodes = keyof typeof keys;
type KeyNames = typeof keys[KeyCodes];
type ComboKeyCodes = keyof typeof comboKeys;
type ComboKeyNames = typeof comboKeys[ComboKeyCodes];
type AllKeyNames = KeyNames | ComboKeyNames;

type Callback = (obj: Record<AllKeyNames, boolean>, event: KeyboardEvent) => void;

function keyboardMap(event: any): Record<AllKeyNames, boolean> {
  const key = keys[event.keyCode as KeyCodes];
  const comboKeyArray = Object.keys(comboKeys) as [keyof typeof comboKeys];

  const result: any = { [key]: true };
  comboKeyArray.forEach(code => {
    if (event[code]) result[comboKeys[code]] = true;
  });

  return result;
}

export function useKeyboard(callback: Callback, deps: any[], listenerName: listenerName = 'keydown') {
  const handler = React.useCallback((event: KeyboardEvent) => callback(keyboardMap(event), event), deps); // eslint-disable-line react-hooks/exhaustive-deps,react-hooks/rules-of-hooks

  React.useEffect(() => {
    window.addEventListener(listenerName, handler);

    return () => {
      window.removeEventListener(listenerName, handler);
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps,react-hooks/rules-of-hooks
}

export function useKeyboardInProps(c: Callback) {
  return (event: any) => {
    c(keyboardMap(event), event);
  };
}
