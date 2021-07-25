import { block } from "./blocks/block";
import * as allInterfaces from "./interfaces";
import * as constants from "./conf";

export class Controller implements allInterfaces.controller {
  currentBlock: allInterfaces.block;
  parentElement: HTMLElement;
  currentButtonBackground: string;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.currentBlock = new block("titleDescriptionBlock", parentElement);
    this.currentButtonBackground = "";
    this.startRendering();
    this.addEventListeners();
  }

  startRendering(): void {
    this.currentBlock.renderBlock();
  }

  addEventListeners(): void {
    this.addHeaderEventListeners();
    this.addEventListenersOperationBlock();
  }

  addEventListenersOperationBlock(): void {
    let operationButton = (): void => {
      let operationBlock: allInterfaces.htmlElement =
        document.querySelector("#operation-block");

      operationBlock.addEventListener("click", (e: MouseEvent): void => {
        if (
          (<HTMLElement>e.target).tagName != "SPAN" ||
          (<HTMLElement>e.target).id === this.currentBlock.getNameOfBlock()
        ) {
          return;
        }

        let getOperation: allInterfaces.Operations = (<HTMLElement>e.target)
          .id as allInterfaces.Operations;

        if (getOperation === "add-question") {
        } else if (getOperation === "delete-block") {
        } else {
          this.currentBlock.remove();
          this.currentBlock = this.getBlock(getOperation);
          this.currentBlock.renderBlock();
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
    return new block(blockName, this.parentElement);
  }
}
