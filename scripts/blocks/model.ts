import { block } from "../interfaces";
let formArray: block[] = [];

export function addBlock(element: block): void {
  formArray.push(element);
}
