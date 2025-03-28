/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * retrieves attributes from an element and turn them into an object
 * @param el - html element
 * @param prefix
 * @returns boolean
 */
export function getAttributes(el: Element, prefix: string | null = null) {
  // turn the nodelist into an array
  return Array.prototype.slice.call(el.attributes).reduce((acc, attributeNode) => {
    // turn the array into an object
    let name = attributeNode.nodeName;
    let value = attributeNode.nodeValue.trim();
    if (prefix) {
      if (name.startsWith(prefix)) {
        name = name.replace(prefix, '');
      } else {
        return acc;
      }
    }

    // parse objects or arrays
    if (value.charAt(0) === '{' && value.charAt(value.length - 1) === '}') {
      value = JSON.parse(value);
    } else if (value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {
      value = JSON.parse(value);
    }

    acc[name] = value;
    return acc;
  }, {});
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
