import * as constants from "../conf";
import * as allInterfaces from "../interfaces";
import {
  getImageSource,
  uploadImageButton,
} from "../htmlElements/image_upload";

let count = 0;
export class StringAnswer implements allInterfaces.stringBased {
  element: HTMLElement;
  answerType: allInterfaces.stringBased["answerType"];

  constructor(answerType: allInterfaces.stringBased["answerType"]) {
    this.answerType = answerType;
    this.element = this.getBlock();
  }

  getBlock(): HTMLElement {
    let answerBlock = document.createElement("div");
    let inputField = document.createElement("input");
    answerBlock.classList.add("string-answer");

    inputField.value = "Answer Field";
    inputField.setAttribute("disabled", "true");
    answerBlock.appendChild(inputField);
    return answerBlock;
  }
}

export class ChoiceAnswer implements allInterfaces.optionBased {
  optionElementList: { [k: number]: allInterfaces.option };
  answerType: allInterfaces.optionBased["answerType"];
  deleteOption: HTMLButtonElement;
  element: HTMLElement;

  constructor(answerType: allInterfaces.optionBased["answerType"]) {
    this.answerType = answerType;
    this.optionElementList = {};
    this.element = this.getBlock();
    this.addOption();
    this.addEventListeners();
  }

  getBlock(): HTMLElement {
    let answerBlock = document.createElement("div");
    answerBlock.classList.add("answer");
    return answerBlock;
  }

  addOption(): void {
    let option = this.getOption();
    option.element.id = count + "";
    count++;
    this.optionElementList[count - 1] = option;
    this.element.appendChild(option.element);
  }

  getOption(): allInterfaces.option {
    return new Option(this.answerType);
  }

  addEventListeners(): void {
    this.element.addEventListener("click", (event) => {
      let element = <HTMLElement>event.target;
      if (element.tagName === "SPAN") {
        if (element.innerText === "image") {
          getImageSource().then((e) => {
            let option =
              this.optionElementList[
                Number(
                  (<HTMLElement>element.parentNode.parentNode.parentNode).id
                )
              ];
            option.addImageElement(e);
          });
          uploadImageButton.click();
        }

        if (element.innerText == "add") {
          this.addOption();
        }

        if (element.innerText == "clear") {
          let option =
            this.optionElementList[
              Number((<HTMLElement>element.parentNode.parentNode.parentNode).id)
            ];

          if (Object.keys(this.optionElementList).length > 1) {
            option.remove();
            delete this.optionElementList[
              Number((<HTMLElement>element.parentNode.parentNode.parentNode).id)
            ];
          }
        }
      }
    });
  }
}

class Option implements allInterfaces.option {
  optionImage: HTMLSpanElement;
  inputElement: HTMLInputElement;
  image?: HTMLElement;
  element: HTMLElement;
  optionType: "Multiple Option" | "Check Boxes";
  addImage: HTMLButtonElement;
  deleteOption: HTMLButtonElement;
  addOption: HTMLButtonElement;

  constructor(type: "Multiple Option" | "Check Boxes") {
    this.optionType = type;
    this.optionImage = this.getOptionImage();
    this.inputElement = this.getInputElement();
    this.addImage = this.getImageButton();
    this.addOption = this.getAddOptionElement();
    this.deleteOption = this.getDeleteOptionButton();
    this.element = this.getBlock();
  }

  getImageButton(): HTMLButtonElement {
    let buttonElement = document.createElement("button");
    buttonElement.classList.add("image-delete");
    let addImageSpan = document.createElement("span");
    addImageSpan.classList.add("material-icons");
    addImageSpan.innerText = "image";
    buttonElement.appendChild(addImageSpan);
    return buttonElement;
  }

  getDeleteOptionButton(): HTMLButtonElement {
    let buttonElement = document.createElement("button");
    buttonElement.classList.add("image-delete");
    let deleteOptionSpan = document.createElement("span");
    deleteOptionSpan.classList.add("material-icons");
    deleteOptionSpan.innerText = "clear";
    buttonElement.appendChild(deleteOptionSpan);
    return buttonElement;
  }

  getAddOptionElement(): HTMLButtonElement {
    let buttonElement = document.createElement("button");
    buttonElement.classList.add("image-delete");
    let deleteOptionSpan = document.createElement("span");
    deleteOptionSpan.classList.add("material-icons");
    deleteOptionSpan.innerText = "add";
    buttonElement.appendChild(deleteOptionSpan);
    return buttonElement;
  }

  getInputElement(): HTMLInputElement {
    let inputField = document.createElement("input");
    inputField.placeholder = "Option Value";
    return inputField;
  }

  getBlock(): HTMLElement {
    let option = document.createElement("div");
    option.classList.add("option-image");
    let optionDiv = document.createElement("div");
    optionDiv.classList.add("option-element");
    optionDiv.appendChild(this.optionImage);
    optionDiv.appendChild(this.inputElement);
    optionDiv.appendChild(this.addImage);
    optionDiv.appendChild(this.addOption);
    optionDiv.appendChild(this.deleteOption);
    option.appendChild(optionDiv);
    return option;
  }

  getOptionImage(): HTMLSpanElement {
    let optionSpanElement = document.createElement("span");
    optionSpanElement.classList.add("material-icons");
    if (this.optionType == "Multiple Option") {
      optionSpanElement.innerHTML = "radio_button_unchecked";
    } else {
      optionSpanElement.innerHTML = "check_box_outline_blank";
    }
    return optionSpanElement;
  }

  addImageElement(src: "string"): void {
    if (this.element.querySelector("img") != null) {
      (<HTMLImageElement>this.element.children[1]).src = src;
    } else {
      let imageElement = document.createElement("img");
      imageElement.src = src;
      this.element.appendChild(imageElement);
    }
  }

  remove() {
    this.element.remove();
  }
}
