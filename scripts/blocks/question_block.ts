import * as allInterfaces from "../interfaces";
import { dropDown } from "../htmlElements/drop_down";
import * as constants from "../conf";
import { StringAnswer, ChoiceAnswer } from "./answer";
import { getHTMLElement } from "../htmlElements/getHTMLElement";

export class question implements allInterfaces.questionBlock {
  name: allInterfaces.blockID;
  question: HTMLElement;
  answer: allInterfaces.optionBased | allInterfaces.stringBased;
  endBlock: HTMLElement;
  dropdown: allInterfaces.dropDownElement;
  list: HTMLSpanElement[];
  required: HTMLElement;
  element: HTMLElement;
  answerType: allInterfaces.answerType;

  constructor() {
    this.name = "question-block";
    this.list = this.getSpanElementList(
      constants.answerList,
      constants.iconList
    );
    this.dropdown = new dropDown(this.list);
    this.question = this.getQuestionBlock();
    this.required = this.getRequiredNoteElement();
    this.answer = this.getAnswer("choice", "Multiple Option");
    this.answerType = "Multiple Option";
    this.addChangeDropDown();
  }

  getAnswer(
    type: "string" | "choice",
    answerType: allInterfaces.answerType
  ): allInterfaces.optionBased | allInterfaces.stringBased {
    if (type === "string") {
      return new StringAnswer(answerType);
    } else {
      return new ChoiceAnswer(answerType as "Multiple Option" | "Check Boxes");
    }
  }

  getBlock(): HTMLElement {
    let insideBlock: HTMLElement = document.createElement("div");
    insideBlock.classList.add("inside-block");
    insideBlock.appendChild(this.question);
    insideBlock.appendChild(this.answer.element);
    insideBlock.appendChild(this.required);
    this.element = insideBlock;
    return insideBlock;
  }

  getQuestionBlock(): HTMLElement {
    let inputField = document.createElement("input");
    inputField.classList.add("question");
    inputField.placeholder = "Your Question Goes Here";
    let qBlock = document.createElement("div");

    qBlock.appendChild(inputField);
    qBlock.appendChild(this.dropdown.element);
    qBlock.classList.add("q-block");
    return qBlock;
  }

  getRequiredNoteElement(): HTMLElement {
    let block = document.createElement("div");
    block.classList.add("required-note");

    let spanElement = document.createElement("span");
    let inputElement = document.createElement("input");
    spanElement.innerText = "Note: ";
    inputElement.classList.add("note");
    inputElement.placeholder = "Your Note Goes Here (Optional)";

    let toggleButton = document.createElement("label");
    let inputCheckbox = document.createElement("input");
    inputCheckbox.setAttribute("type", "checkbox");
    inputCheckbox.classList.add("check-box");
    let checkBox = document.createElement("span");

    let requireSpan = document.createElement("span");
    requireSpan.innerText = "Required";

    toggleButton.classList.add("switch");
    inputElement.classList.add("checkbox");
    inputElement.id = "required";
    checkBox.classList.add("slider");
    checkBox.classList.add("round");

    toggleButton.appendChild(inputCheckbox);
    toggleButton.appendChild(checkBox);

    block.appendChild(spanElement);
    block.appendChild(inputElement);

    block.appendChild(requireSpan);
    block.appendChild(toggleButton);

    return block;
  }

  getSpanElementList(list: string[], iconList: string[]): HTMLSpanElement[] {
    let newList: HTMLSpanElement[] = constants.answerList.map((val, idx) => {
      let spanElement = document.createElement("span");

      let spanIcon = document.createElement("span");
      let spanText = document.createElement("span");
      spanIcon.classList.add("material-icons");
      spanIcon.classList.add("option");
      spanIcon.innerText = iconList[idx];

      spanText.innerText = val;
      spanText.classList.add("inner-text");
      spanElement.appendChild(spanIcon);
      spanElement.appendChild(spanText);
      return spanElement;
    });
    return newList;
  }

  changeAnswer(newAnswerType: allInterfaces.answerType): void {
    let temp = this.answer.element;
    this.answerType = newAnswerType;

    if (
      this.answerType == "Multiple Option" ||
      this.answerType == "Check Boxes"
    ) {
      this.answer = this.getAnswer("choice", this.answerType);
    } else {
      this.answer = this.getAnswer("string", this.answerType);
    }

    this.element.replaceChild(this.answer.element, temp);
  }

  addChangeDropDown(): void {
    this.dropdown.element.addEventListener("focusout", (event) => {
      let temp = this.dropdown.element.querySelector("#select-option");
      if (
        (<HTMLSpanElement>temp.childNodes[0].childNodes[1]).innerText ===
        this.answerType
      )
        return;
      this.changeAnswer(
        (<HTMLSpanElement>temp.childNodes[0].childNodes[1])
          .innerText as allInterfaces.answerType
      );
    });
  }

  getQuestionElement(): HTMLElement {
    let question = getHTMLElement("h2", [], null, [
      (this.question.childNodes[0] as HTMLInputElement).value ||
        "Enter Your Question",
    ]);

    let note = getHTMLElement("h4", [], null, [
      "Note:- " + this.required.querySelector("input").value ||
        "Enter Your Note Here",
    ]);

    let questionFormBlock = getHTMLElement(
      "div",
      ["form-block"],
      null,
      [question, this.answer.getAnswerForm(), note],
      null
    );
    return questionFormBlock;
  }
}
