function solve() {
	return function() {
		/* globals $ */
		$.fn.gallery = function(cols) {
			var $gallery = this;
			cols = cols || 4;
			$gallery.addClass("gallery");
			$gallery.find(".selected").hide();
			$gallery.find(".image-container").each(function(index, imageContainer) {
				var $this = $(imageContainer);

				if (index % cols === 0) {
					$this.addClass("clearfix");
				}
			});


			//var $imageContainers = $gallery.find(".image-container");
			var $images = $gallery.find(".image-container img");
			var len = $images.length;

			$gallery.find(".image-container img").on("click", function() {
				var $this = $(this);
				var thisNumberImage = $this.attr("data-info");
				var prevNumberImage = (thisNumberImage - 1) <= 0 ? len : (thisNumberImage - 1);
				var nextNumberImage = (+thisNumberImage + 1) < len ? (+thisNumberImage + 1) : 1;

				$gallery.find(".selected").find("#current-image").attr("src", $this.attr("src")).attr("data-info", $this.attr("data-value"));
				$gallery.find(".selected").find("#previous-image").attr("src", $images.eq(prevNumberImage - 1).attr("src")).attr("data-info", prevNumberImage);
				$gallery.find(".selected").find("#next-image").attr("src", $images.eq(nextNumberImage - 1).attr("src")).attr("data-info", nextNumberImage);
				$gallery.find(".selected").show();
				$gallery.find(".gallery-list").addClass("blurred");

			});

			$gallery.find("#current-image").on("click", function() {
				var $this = $(this);

				$this.parent().parent().hide();
				$gallery.find(".gallery-list").removeClass("blurred");
			});

			$gallery.find("#next-image").on("click", function() {
				var $this = $(this);

				var thisNumberImage = $this.attr("data-info");
				var nextNumberImage = (+thisNumberImage + 1) < len ? (+thisNumberImage + 1) : 1;

				$gallery.find(".selected").find("#previous-image").attr("src", $gallery.find(".selected").find("#current-image").attr("src")).attr("data-info", $gallery.find(".selected").find("#current-image").attr("data-info"));
				$gallery.find(".selected").find("#current-image").attr("src", $this.attr("src")).attr("data-info", thisNumberImage);
				$gallery.find(".selected").find("#next-image").attr("src", $($images[nextNumberImage - 1]).attr("src")).attr("data-info", nextNumberImage);
			});

			$gallery.find("#previous-image").on("click", function() {
				var $this = $(this);
				var thisNumberImage = $this.attr("data-info");
				var prevNumberImage = (thisNumberImage - 1) <= 0 ? len : (thisNumberImage - 1);

				$gallery.find(".selected").find("#next-image").attr("src", $gallery.find(".selected").find("#current-image").attr("src")).attr("data-info", $gallery.find(".selected").find("#current-image").attr("data-info"));
				$gallery.find(".selected").find("#current-image").attr("src", $this.attr("src")).attr("data-info", $this.attr("data-value"));
				$gallery.find(".selected").find("#previous-image").attr("src", $($images[prevNumberImage - 1]).attr("src")).attr("data-info", prevNumberImage);
			});

			return $gallery;

		};
	};
}

module.exports = solve;