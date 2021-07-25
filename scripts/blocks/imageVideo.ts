import * as allInterfaces from "../interfaces";
import { titleDescription } from "./title_description_block";
import {
  getImageSource,
  uploadImageButton,
} from "../htmlElements/image_upload";

export class imageBlock implements allInterfaces.imageVideoBlock {
  name: allInterfaces.blockID;
  imageElement: HTMLImageElement;
  caption: HTMLInputElement;
  titleAndDescription: allInterfaces.titleDescriptionBlock;

  constructor() {
    this.name = "image-block";
    this.imageElement = document.createElement("img");
    this.imageElement.classList.add("image-element");
    this.titleAndDescription = new titleDescription();
    this.caption = this.getCaption();
  }

  getBlock(): HTMLElement {
    let insideBlock: HTMLElement = document.createElement("div");
    insideBlock.classList.add("inside-block");

    let tempDiv: HTMLElement = document.createElement("div");
    let uploadButton = this.getUploadButton();

    uploadButton.click();

    tempDiv.appendChild(uploadButton);
    tempDiv.appendChild(this.imageElement);
    tempDiv.appendChild(this.caption);
    // tempDiv.classList.add("image-and-button");

    insideBlock.appendChild(this.titleAndDescription.title);
    insideBlock.appendChild(this.titleAndDescription.description);
    insideBlock.appendChild(tempDiv);
    insideBlock.appendChild(this.caption);
    return insideBlock;
  }

  getUploadButton(): HTMLButtonElement {
    let uploadButton = document.createElement("button");
    let spanElement = document.createElement("span");
    spanElement.classList.add("material-icons");
    spanElement.innerText = "upload_file";

    uploadButton.appendChild(spanElement);
    uploadButton.classList.add("image-button");
    uploadButton.addEventListener("click", () => {
      uploadImageButton.click();
      getImageSource().then((e) => {
        this.imageElement.src = e;
      });
    });
    return uploadButton;
  }

  getCaption(): HTMLInputElement {
    let inputElement = document.createElement("input");
    inputElement.placeholder = "Caption Goes Here";
    inputElement.classList.add("caption");
    return inputElement;
  }
}
