function solve() {
	return function(selector) {
		if (typeof selector !== "string") {
			throw new Error("Selector should be a string.");
		}

		var $element = $(selector);

		if (!$element || !($element instanceof $)) {
			throw new Error("Element should be a select DOM element!");
		}

		if (!$element.is("select")) {
			throw new Error("Element should be a select element.");
		}

		var $dropdownList = $('<div/>').addClass("dropdown-list");
		$element.css("display", "none").appendTo($dropdownList);
		$dropdownList.appendTo($(document.body));

		var $options = $(selector + " option"); //var $options=$element.find("option"); 
		var $divCurrent = $("<div/>").addClass("current").html("Select a value");
		$divCurrent.appendTo($dropdownList);

		var $divOptionsContainer = $("<div/>").addClass("options-container").css("position", "absolute").css("display", "none");
		for (var i = 0, len = $options.length; i < len; i += 1) {
			var $curOption = $($options[i]);
			var $newDiv = $("<div/>").addClass("dropdown-item").attr("data-value", $curOption.attr("value")).attr("data-index", i)
				.text($curOption.text());
			$newDiv.appendTo($divOptionsContainer);
		}

		$divOptionsContainer.appendTo($dropdownList);

		$divCurrent.on("click", function() {
			$divOptionsContainer.css("display") === "none" ? $divOptionsContainer.show() : $divOptionsContainer.hide();
		});

		$divOptionsContainer.on("click", ".dropdown-item", function() {
			var $this = $(this);
			$element.val($this.attr('data-value'));
			$(".current").text($this.text());
			$divOptionsContainer.css("display", "none");
		});
	};
}

module.exports = solve;