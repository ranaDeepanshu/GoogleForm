import * as allInterfaces from "../interfaces";
import * as constants from "../conf";

export class titleDescription implements allInterfaces.titleDescriptionBlock {
  title: HTMLElement;
  description: HTMLInputElement;
  name: allInterfaces.blockID;

  constructor() {
    this.name = "title-description-block";
    this.title = this.getFormTitleBlock();
    this.description = this.getDescription();
    this.addEventListeners();
  }

  getBlock(): HTMLElement {
    let insideBlock: HTMLElement = document.createElement("div");

    insideBlock.classList.add("inside-block");

    insideBlock.appendChild(this.title);
    insideBlock.appendChild(this.description);
    return insideBlock;
  }

  getFormTitleBlock(): HTMLElement {
    let formTitleBlock: HTMLElement = document.createElement("div");
    let inputFormTitle: HTMLInputElement = document.createElement("input");
    let descriptionButton: HTMLButtonElement = document.createElement("button");
    let spanElement: HTMLElement = document.createElement("span");

    descriptionButton.classList.add("description-button");
    inputFormTitle.classList.add("input-title");
    inputFormTitle.value = "Untitled Title";
    formTitleBlock.classList.add("form-title-block");

    formTitleBlock.appendChild(inputFormTitle);
    formTitleBlock.appendChild(descriptionButton);
    descriptionButton.appendChild(spanElement);

    spanElement.innerText = "expand_more";
    spanElement.classList.add("material-icons");

    return formTitleBlock;
  }

  getDescription(): HTMLInputElement {
    let descriptionInputField: HTMLInputElement =
      document.createElement("input");
    descriptionInputField.placeholder = "Description(Optional)";
    descriptionInputField.classList.add("description");

    return descriptionInputField;
  }

  addEventListeners(): void {
    console.log("dfsf");
    this.title.querySelector("button").addEventListener("click", (e) => {
      if (this.description.classList.contains("hide-description")) {
        this.description.classList.remove("hide-description");
        this.description.style.animation = "growDown 300ms linear forwards";
      } else {
        this.description.classList.add("hide-description");
      }
    });
  }
}
