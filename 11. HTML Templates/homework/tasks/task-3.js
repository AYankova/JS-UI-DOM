/*globals handlebars*/
function solve() {
	return function() {
		$.fn.listview = function(data) {
			var $this = $(this);
			var scriptID = $this.attr("data-template");
			var templateHTML = $('#' + scriptID).html();
			var template = handlebars.compile(templateHTML);

			// var inner = "";
			// for (var i = 0; i < data.length; i++) {
			// 	inner += template(data[i]);
			// }
			// $(this).html(inner);

			var result = "";
			data.forEach(function(item) {
				result += template(item);
			});

			$this.html(result);

			return this;
		};
	};
}

module.exports = solve;