import { dropDownElement } from "../interfaces";

export class dropDown implements dropDownElement {
  element: HTMLElement;
  optionList: HTMLSpanElement[];

  constructor(list: HTMLSpanElement[]) {
    this.optionList = list;
    this.element = this.getBlock();
    this.addEventListener();
  }

  getBlock(): HTMLElement {
    let divElement: HTMLElement = document.createElement("div");
    divElement.classList.add("custom-select-wrapper");

    let divCustom: HTMLElement = document.createElement("div");
    divCustom.classList.add("custom-select");

    let divTrigger: HTMLElement = document.createElement("div");
    divTrigger.classList.add("custom-select__Trigger");
    divTrigger.id = "select-option";

    // let arrow: HTMLElement = document.createElement("div");
    // arrow.classList.add("arrow");

    let customOptions = document.createElement("div");
    customOptions.classList.add("custom-options");
    customOptions.setAttribute("tabIndex", "0");
    customOptions.id = "select-options";
    this.optionList.forEach((val) => {
      val.classList.add("custom-option");
      customOptions.appendChild(val);
    });
    customOptions.appendChild(this.optionList[0].cloneNode(true));

    // divTrigger.appendChild(arrow);
    divTrigger.appendChild(this.optionList[0]);
    divCustom.appendChild(divTrigger);
    divCustom.appendChild(customOptions);
    divElement.appendChild(divCustom);

    return divElement;
  }

  addEventListener(): void {
    let element: HTMLElement = this.element.querySelector("#select-options");
    let dropElement: HTMLElement = this.element.querySelector("#select-option");

    dropElement.addEventListener("click", (e) => {
      dropElement.style.visibility = "hidden";
      element.style.visibility = "visible";
      element.classList.add("dropdown");
      element.focus();
    });

    element.addEventListener("click", (e) => {
      if ((<HTMLElement>e.target).tagName !== "SPAN") return;

      if ((<HTMLElement>e.target).classList.contains("custom-option")) {
        dropElement.replaceChild(
          (<HTMLElement>e.target).cloneNode(true),
          dropElement.firstChild
        );
      } else {
        dropElement.replaceChild(
          (<HTMLElement>e.target).parentNode.cloneNode(true),
          dropElement.firstChild
        );
      }
      element.style.visibility = "hidden";
      dropElement.style.visibility = "visible";
    });

    element.addEventListener("focusout", () => {
      element.style.visibility = "hidden";
      dropElement.style.visibility = "visible";
      element.classList.remove("dropdown");
    });
  }
}
