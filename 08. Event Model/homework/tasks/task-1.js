/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  

*/

function solve() {
	return function(selector) {
		var element;

		if (typeof selector !== "string" && !(selector instanceof HTMLElement)) {
			throw new Error("Invalid parameter selector. Should be a string or a DOM element!");
		}

		if (typeof selector === "string") {
			element = document.getElementById(selector);

			if (!selector) {
				throw new Error("No element with the given id!");
			}
		} else {
			element = selector;
		}

		if ((element !== document.body) && !document.body.contains(element)) {
			throw new Error("No such element found in the DOM!");
		}

		var elementsWithClassButton = document.querySelectorAll(".button");
		// var elementsWithClassContent = document.querySelectorAll(".content");

		if (elementsWithClassButton) {
			var elementsWithClassButtonLength = elementsWithClassButton.length;

			for (var i = 0; i < elementsWithClassButtonLength; i += 1) {
				elementsWithClassButton[i].innerHTML = "hide";
				elementsWithClassButton[i].addEventListener("click", buttonClicked, false);
			}
		}

		function buttonClicked() {
			var curElement = this;
			var nextElement = curElement.nextElementSibling;
			var searchedContentElement;

			while (nextElement) {
				if (nextElement.className === "content") {
					searchedContentElement = nextElement;
					nextElement = nextElement.nextElementSibling;

					while (nextElement) {
						if (nextElement.className === "button") {
							break;
						}

						nextElement = nextElement.nextElementSibling;
					}
					break;

				} else {
					nextElement = nextElement.nextElementSibling;
				}
			}

			if (searchedContentElement) {
				if (searchedContentElement.style.display === "none") {
					searchedContentElement.style.display = "";
					curElement.innerHTML = "hide";
				} else {
					searchedContentElement.style.display = "none";
					curElement.innerHTML = "show";
				}
			}

		}
	};
}

module.exports = solve;