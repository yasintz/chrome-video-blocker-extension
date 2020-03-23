import { ElementFunctions } from './element-functions';

let prevElmentLength = ElementFunctions.getElementsLength();

export function onChangeElementLength(fn: () => void) {
  setInterval(() => {
    const newElementLength = ElementFunctions.getElementsLength();
    if (prevElmentLength !== newElementLength) {
      fn();
    }
    prevElmentLength = newElementLength;
  }, 2000);
}

export function updatePrevElementLength(newElementLength: number) {
  prevElmentLength = newElementLength;
}
