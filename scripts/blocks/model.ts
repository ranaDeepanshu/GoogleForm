import { block } from "../interfaces";
let formArray: block[] = [];

export function addBlock(element: block): void {
  formArray.push(element);
}

export function getCreateElement(id: string): block {
  for (let val of formArray) {
    if (val.childElement.id == id) {
      return val;
    }
  }

  return null;
}

export function getFormElement(element: HTMLElement): HTMLElement {
  // formArray.forEach((val) => {
  //   console.log(val.childElement.id, element.id);
  //   if (val.childElement.id == element.id) {
  //     return val.childFormElement;
  //   }
  // });
  for (let val of formArray) {
    if (val.childElement.id == element.id) {
      return val.getQuestion();
    }
  }
  return null;
}

export function replace(b1: block, b2: block): void {
  for (let i in formArray) {
    if (formArray[i] === b1) {
      formArray[i] = b2;
    }
  }
}
