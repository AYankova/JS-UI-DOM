function solve() {
	return function(selector, items) {
		var element = document.querySelector(selector);
		var asideUlRight = document.createElement("ul");
		asideUlRight.style.width = "250px";
		asideUlRight.style.height = "600px";
		asideUlRight.style.overflowY = "scroll";
		asideUlRight.style.float = "left";
		asideUlRight.style.listStyleType = "none";

		var filterElement = document.createElement("input");
		filterElement.style.width = "200px";
		filterElement.addEventListener("keyup", filterElements);

		var len = items.length;
		var asideLiRight = document.createElement("li");
		asideLiRight.className = "image-container";

		var asideH3Right = document.createElement("h3");
		asideH3Right.style.textAlign = "center";

		var asideImageRight = document.createElement("img");
		asideImageRight.style.width = "200px";
		asideImageRight.style.height = "150px";
		asideImageRight.style.borderRadius = "5px";

		var filterH3 = asideH3Right.cloneNode(true);
		filterH3.innerHTML = "Filter";
		asideUlRight.appendChild(filterH3);
		asideUlRight.appendChild(filterElement);

		var fragment = document.createDocumentFragment();
		var leftDiv = document.createElement("div");
		var leftH3 = asideH3Right.cloneNode(true);

		var leftImg = document.createElement("img");
		leftImg.style.width = "600px";
		leftImg.style.height = "500px";
		leftImg.style.borderRadius = "10px";
		leftImg.src = items[0].url;
		leftH3.innerHTML = items[0].title;
		leftH3.style.fontSize = "30px";
		leftDiv.appendChild(leftH3);
		leftDiv.appendChild(leftImg);
		leftDiv.className = "image-preview";
		leftDiv.style.width = "700px";
		leftDiv.style.height = "300px";
		leftDiv.style.float = "left";

		for (var i = 0; i < len; i += 1) {
			var curH3 = asideH3Right.cloneNode(true);
			var curImg = asideImageRight.cloneNode(true);
			var curLi = asideLiRight.cloneNode(true);
			curH3.innerHTML = items[i].title;
			curImg.src = items[i].url;
			curLi.appendChild(curH3);
			curLi.appendChild(curImg);
			curLi.addEventListener("mouseenter", mouseHoverEvent);
			curLi.addEventListener("mouseleave", mouseUnhoverEvent);
			curLi.addEventListener("click", clickEvent);
			asideUlRight.appendChild(curLi);
		}

		function mouseHoverEvent() {
			this.style.background = "gray";

		}

		function mouseUnhoverEvent() {
			this.style.background = "";

		}

		function clickEvent() {
			var li = this.lastElementChild;
			var h3 = this.firstElementChild;
			leftDiv.lastElementChild.src = li.src;
			leftDiv.firstElementChild.innerHTML = h3.innerHTML;
		}
		var lis = asideUlRight.querySelectorAll("li");

		function filterElements() {
			var value = this.value.toLowerCase();

			for (var i = 0; i < items.length; i++) {
				if (items[i].title.toLowerCase().indexOf(value) < 0) {
					lis[i].style.display = "none";
				} else {
					lis[i].style.display = "";
				}
			}

		}

		fragment.appendChild(leftDiv);
		fragment.appendChild(asideUlRight);
		element.appendChild(fragment);
	};
}

module.exports = solve;