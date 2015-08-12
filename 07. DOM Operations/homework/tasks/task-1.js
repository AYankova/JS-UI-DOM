/* globals $ */

/* 

 Create a function that takes an id or DOM element and an array of contents

 * if an id is provided, select the element
 * Add divs to the element
 * Each div's content must be one of the items from the contents array
 * The function must remove all previous content from the DOM element provided
 * Throws if:
 * The provided first parameter is neither string or existing DOM element
 * The provided id does not select anything (there is no element that has such an id)
 * Any of the function params is missing
 * Any of the function params is not as described
 * Any of the contents is neight `string` or `number`
 * In that case, the content of the element **must not be** changed
 */

function solve() {

    return function(element, contents) {
        if (arguments.length !== 2) {
            throw new Error("Some of the arguments are missing!");
        }

        if (!(element instanceof HTMLElement) && typeof(element) !== "string") { //element.nodeType !== 1
            throw new Error("Element must be a string or a DOM element.");
        }

        if (!Array.isArray(contents)) {
            throw new Error("Content should be an array!");
        }

        if (typeof(element) === "string") {
            element = document.getElementById(element);

            if (element === null) {
                throw new Error("Doesn't exist an element with the given id!");
            }
        } else {
            if (element !== document.body && !document.body.contains(element)) {
                throw new Error("Not existing DOM element!");
            }
        }

        contents.forEach(function(el) {
            if (typeof el !== "number" && typeof el !== "string") {
                throw new Error("Invalid elements in content. Should be numbers or strings!");
            }
        });

        var elementFirstChild = element.firstElementChild;

        while (elementFirstChild) {
            element.removeChild(elementFirstChild);
            elementFirstChild = element.firstElementChild;
        }

        var divElement = document.createElement("div");
        var fragment = document.createDocumentFragment();
        var divsCount = contents.length;

        for (var i = 0; i < divsCount; i += 1) {
            var curDiv = divElement.cloneNode(true);
            curDiv.innerHTML = contents[i];
            fragment.appendChild(curDiv);
        }

        element.appendChild(fragment);
    };
}

module.exports = solve;