import { block } from "./blocks/block";
import * as allInterfaces from "./interfaces";
import * as constants from "./conf";
import { getHTMLElement } from "./htmlElements/getHTMLElement";
import {
  addBlock,
  getCreateElement,
  getFormElement,
  replace,
} from "./blocks/model";
let count: number = 0;

export class Controller implements allInterfaces.controller {
  parentElementCreateBlock: HTMLElement;
  currentButtonBackground: string;
  currentCreateBlock: HTMLElement;

  constructor() {
    this.currentButtonBackground = "";
    this.addNewBlock();
    this.addHeaderEventListeners();
    this.addEventListenerMain();
  }

  addNewBlock(): void {
    this.currentCreateBlock = this.getCreateElementBlock();
    document.querySelector("main").appendChild(this.currentCreateBlock);
    count++;
    let newBlock = new block(
      "titleDescriptionBlock",
      this.parentElementCreateBlock,
      count
    );
    addBlock(newBlock);
    this.startRenderingCreateBlock(newBlock);
  }

  addBlock(): void {
    this.currentCreateBlock = this.getCreateElementBlock();
    // this.startRenderingCreateBlock(block)
  }

  getCreateElementBlock(): HTMLElement {
    let focusBlock = getHTMLElement(
      "div",
      ["focus-block"],
      "focus-block",
      null,
      null
    );
    let mainBlock = getHTMLElement("div", ["main-block"], "main-block", null);
    this.parentElementCreateBlock = mainBlock;
    let block = getHTMLElement(
      "div",
      ["block"],
      "block",
      [focusBlock, mainBlock],
      null
    );

    let span1 = getHTMLElement(
      "span",
      ["material-icons", "add-question", "operation-button"],
      "add-question",
      ["library_add"],
      null
    );
    let span2 = getHTMLElement(
      "span",
      ["material-icons", "image-block", "operation-button"],
      "image-block",
      ["image"],
      null
    );
    let span3 = getHTMLElement(
      "span",
      ["material-icons", "title-description-block", "operation-button"],
      "title-description-block",
      ["title"],
      null
    );
    let span4 = getHTMLElement(
      "span",
      ["material-icons", "question-block", "operation-button"],
      "question-block",
      ["question_answer"],
      null
    );
    let span5 = getHTMLElement(
      "span",
      ["material-icons", "delete-block", "operation-button"],
      "delete-block",
      ["delete"],
      null
    );

    let operationBlock = getHTMLElement(
      "div",
      ["operation-block"],
      "operation-block",
      [span1, span2, span3, span4, span5],
      null
    );

    let hoverSpan1 = getHTMLElement("span", null, null, ["Add Block"], {
      "data-value": "add-question",
    });
    let hoverSpan2 = getHTMLElement("span", null, null, ["Image Block"], {
      "data-value": "image-block",
    });
    let hoverSpan3 = getHTMLElement("span", null, null, ["Title Block"], {
      "data-value": "title-description-block",
    });
    let hoverSpan4 = getHTMLElement("span", null, null, ["Question Block"], {
      "data-value": "question-block",
    });
    let hoverSpan5 = getHTMLElement("span", null, null, ["Delete"], {
      "data-value": "delete-block",
    });

    let hoverBlock = getHTMLElement(
      "div",
      ["hover-block"],
      "hover-block",
      [hoverSpan1, hoverSpan2, hoverSpan3, hoverSpan4, hoverSpan5],
      null
    );

    let createBlock = getHTMLElement(
      "div",
      ["create-block"],
      "create-block",
      [block, operationBlock, hoverBlock],
      null
    );
    return createBlock;
  }

  startRenderingCreateBlock(newBlock: allInterfaces.block): void {
    newBlock.updateParentElement(this.parentElementCreateBlock);
    newBlock.renderBlock();
    this.addEventListenersCreateBlock(newBlock);
  }

  addEventListenersCreateBlock(block: allInterfaces.block): void {
    this.addEventListenersOperationBlock(block);
  }

  addEventListenersOperationBlock(block: allInterfaces.block): void {
    let operationButton = (): void => {
      let operationBlock: allInterfaces.htmlElement =
        document.querySelector("#operation-block");

      operationBlock.addEventListener("click", (e: MouseEvent): void => {
        if (
          (<HTMLElement>e.target).tagName != "SPAN" ||
          (<HTMLElement>e.target).id === block.getNameOfBlock()
        ) {
          return;
        }

        let getOperation: allInterfaces.Operations = (<HTMLElement>e.target)
          .id as allInterfaces.Operations;

        if (getOperation === "add-question") {
          let mainElement = document.querySelector("main");
          mainElement.replaceChild(
            block.getQuestion(),
            this.currentCreateBlock
          );
          this.addNewBlock();
          mainElement.appendChild(this.currentCreateBlock);
        } else if (getOperation === "delete-block") {
        } else {
          let temp = block;
          block.remove();
          block = this.getBlock(getOperation);
          replace(temp, block);
          block.renderBlock();
          this.currentButtonBackground =
            constants.currentBlockOperationButtonColor;
        }
      });
    };

    this.addHoverEventListeners();
    operationButton();
  }

  addHeaderEventListeners(): void {
    let inputTag: allInterfaces.htmlElement =
      document.querySelector("#form-name");
    inputTag.addEventListener("focusout", (e) => {
      //   const title: string = (e.target as HTMLInputElement).value;
      const title: string = (<HTMLInputElement>e.target).value;
      document.title = title || "Untitled Form";
      (<HTMLInputElement>e.target).value = title || "Untitled Form";
    });
  }

  addHoverEventListeners(): void {
    let operationBlock: allInterfaces.htmlElement =
      document.querySelector("#operation-block");
    let hoverBlock: allInterfaces.htmlElement =
      document.querySelector("#hover-block");

    operationBlock.addEventListener("mouseover", (e: MouseEvent): void => {
      if ((<HTMLElement>e.target).tagName != "SPAN") {
        return;
      }

      this.currentButtonBackground = (<HTMLElement>(
        e.target
      )).style.backgroundColor;
      (<HTMLElement>e.target).style.backgroundColor =
        constants.hoverButtonColor;
      let targetId: string = (<HTMLElement>e.target).id;

      let hoveredOp: allInterfaces.htmlElement = document.querySelector(
        `[data-value = ${targetId}]`
      );
      // console.log(hoverBlock, hoveredOp, targetId);
      hoveredOp.style.visibility = "visible";
    });

    operationBlock.addEventListener("mouseout", (e: MouseEvent): void => {
      if ((<HTMLElement>e.target).tagName != "SPAN") {
        // console.log("not span");
        return;
      }
      let targetId: string = (<HTMLElement>e.target).id;
      let hoveredOp: allInterfaces.htmlElement = document.querySelector(
        `[data-value = ${targetId}]`
      );
      // console.log(hoverBlock, hoveredOp, targetId);
      hoveredOp.style.visibility = "hidden";
      (<HTMLElement>e.target).style.backgroundColor =
        this.currentButtonBackground;
    });
  }

  getBlock(name: allInterfaces.blockID) {
    let blockName: allInterfaces.blockNames;

    if (name == "image-block") {
      blockName = "imageVideoBlock";
    } else if (name == "title-description-block") {
      blockName = "titleDescriptionBlock";
    } else {
      blockName = "questionBlock";
    }
    return new block(blockName, this.parentElementCreateBlock, count);
  }

  addEventListenerMain() {
    document.querySelector("main").addEventListener("click", (event) => {
      // console.log(event.target);
      if (/^[0-9]/.test((event.target as HTMLElement).id || "")) {
        if (
          (event.target as HTMLElement).id ===
          (this.parentElementCreateBlock.childNodes[0] as HTMLElement).id
        )
          return;
        let mainElement = document.querySelector("main");
        mainElement.replaceChild(
          getFormElement(
            <HTMLElement>this.parentElementCreateBlock.childNodes[0]
          ),
          this.currentCreateBlock
        );

        this.addBlock();
        mainElement.replaceChild(
          this.currentCreateBlock,
          <HTMLElement>event.target
        );

        this.startRenderingCreateBlock(
          getCreateElement((<HTMLElement>event.target).id)
        );
      }
      // console.log("click");
    });
  }
}
