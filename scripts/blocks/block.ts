import * as allInterfaces from "../interfaces";
import { question } from "./question_block";
import { imageBlock } from "./imageVideo";
import { titleDescription } from "./title_description_block";
import * as constants from "../conf";

let blockList = {
  questionBlock: question,
  imageVideoBlock: imageBlock,
  titleDescriptionBlock: titleDescription,
};

export class block implements allInterfaces.block {
  block: allInterfaces.blockTypes;
  type: allInterfaces.blockNames;
  parentElement: HTMLElement;
  childElement: HTMLElement;

  constructor(type: allInterfaces.blockNames, parentElement: HTMLElement) {
    this.block = new blockList[type]();
    this.parentElement = parentElement;
    this.type = type;
  }

  renderBlock(): void {
    this.childElement = this.block.getBlock();
    this.parentElement.appendChild(this.childElement);
    this.changeButtonBackground(constants.currentBlockOperationButtonColor);
  }

  getNameOfBlock(): string {
    return this.block.name;
  }

  remove(): void {
    this.changeButtonBackground(constants.defaultOperationBlockBackgroundColor);
    this.parentElement.removeChild(this.childElement);
  }

  changeButtonBackground(color: string): void {
    let button: allInterfaces.htmlElement = document.querySelector(
      "#" + this.getNameOfBlock()
    );

    button.style.backgroundColor = color;
  }
}
