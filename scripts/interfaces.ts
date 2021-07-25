export type blockID =
  | "image-block"
  | "title-description-block"
  | "question-block";

interface commonProperties {
  name: blockID;
  getBlock(): HTMLElement;
}

export type htmlElement = HTMLElement | null;

export interface titleDescriptionBlock extends commonProperties {
  title: HTMLElement;
  description: HTMLInputElement;
}

export interface questionBlock extends commonProperties {
  question: HTMLElement;
  answer: optionBased | stringBased;
  endBlock: HTMLElement;
  dropdown: dropDownElement;
  required: HTMLElement;
}

export interface imageVideoBlock extends commonProperties {
  titleAndDescription: titleDescriptionBlock;
  imageElement: HTMLImageElement;
  caption: HTMLInputElement;
}

export type form = (titleDescriptionBlock | questionBlock | imageVideoBlock)[];

export type blockTypes =
  | questionBlock
  | titleDescriptionBlock
  | imageVideoBlock;

export type blockNames =
  | "questionBlock"
  | "titleDescriptionBlock"
  | "imageVideoBlock";

export interface block {
  childElement: HTMLElement;
  block: blockTypes;
  type: blockNames;
  parentElement: HTMLElement;
  getNameOfBlock(): string;
  renderBlock(): void;
  remove(): void;
  changeButtonBackground(color: string): void;
}

export interface controller {
  parentElementCreateBlock: HTMLElement;
  currentButtonBackground: string;
}

export type Operations =
  | "add-question"
  | "delete-block"
  | "image-block"
  | "title-description-block"
  | "question-block";

export interface optionBased extends Answer {
  optionElementList: {
    [k: number]: option;
  };
  answerType: "Multiple Option" | "Check Boxes";
  deleteOption: HTMLButtonElement;
  getBlock(): HTMLElement;
}

export interface stringBased extends Answer {
  answerType: Omit<answerType, "Multiple Option" | "Check Boxes">;
}

export interface Answer {
  element: HTMLElement;
  getBlock(): HTMLElement;
}

export interface dropDownElement {
  element: HTMLElement;
  optionList: HTMLSpanElement[];
}

export type answerType =
  | "Multiple Option"
  | "Check Boxes"
  | "Paragraph"
  | "Phone Number"
  | "Number"
  | "Date"
  | "Time"
  | "Email";

export interface option {
  optionImage: HTMLSpanElement;
  inputElement: HTMLInputElement;
  image?: HTMLElement;
  element: HTMLElement;
  addImage: HTMLButtonElement;
  deleteOption: HTMLButtonElement;
  addOption: HTMLButtonElement;
  optionType: "Multiple Option" | "Check Boxes";
  getBlock(): HTMLElement;
  addImageElement(src: string): void;
  remove(): void;
  removeImageBlock(): void;
}
