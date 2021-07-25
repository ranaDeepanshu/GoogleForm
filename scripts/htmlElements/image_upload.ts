export let uploadImageButton = document.createElement("input");
uploadImageButton.setAttribute("type", "file");
uploadImageButton.setAttribute("accept", "image/*");
uploadImageButton.classList.add("hide");

export function getImageSource(): Promise<string> {
  return new Promise((resolve, reject) => {
    uploadImageButton.addEventListener("change", (e) => {
      resolve(URL.createObjectURL((<HTMLInputElement>e.target).files[0]));
    });
  });
}

//React Phases and Lifecycle methods
//Legacy api
//Synthetic events
//collapse
