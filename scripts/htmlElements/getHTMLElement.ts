export function getHTMLElement(
  name: string,
  classList?: string[],
  id?: string,
  children?: (HTMLElement | string)[],
  attributes?: { [k: string]: string }
): HTMLElement {
  let element = document.createElement(name);
  if (classList) {
    classList.forEach((val) => {
      element.classList.add(val);
    });
  }

  if (id) {
    element.id = id;
  }

  if (children) {
    children.forEach((val) => {
      if (typeof val === "string") {
        element.appendChild(document.createTextNode(val));
      } else {
        element.appendChild(val);
      }
    });
  }

  if (attributes) {
    Object.keys(attributes).forEach((val) => {
      element.setAttribute(val, attributes[val]);
    });
  }
  return element;
}
