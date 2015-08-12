/* globals $ */

/*
Create a function that takes a selector and:
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"       
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided ID is not a **jQuery object** or a `string` 

*/
function solve() {
  return function(selector) {
    var $element;

    if (typeof selector !== "string" && !(selector instanceof jQuery)) {
      throw new Error("Invalid parameter selector. Should be a string or a jQuery object!");
    }

    if (typeof selector === "string") {
      $element = $(selector);

      if (!$element) {
        throw new Error("No element with the given id!");
      }
    } else {
      $element = selector;
    }

    if (!$.contains(document.body, $element.get(0))) {
      throw new Error("No such element found in DOM!");
    }

    var $buttons = $element.find(".button");
    // $contentElements = $(".content");


    for (var i = 0, len = $buttons.length; i < len; i += 1) {
      var $curButton = $($buttons[i]);
      $curButton.text("hide");
      $curButton.on("click", buttonClicked);
    }

    function buttonClicked() {
      var $curElement = $(this);
      // var $nextElement = $curElement.next();
      // var searchedContentElement;
      var $searchedContentElement = $curElement.nextAll(".content:first");
      var $buttonsAfterClicked = $searchedContentElement.nextAll(".button");

      /* while ($nextElement) {
         if ($nextElement.hasClass("content")) {
           $searchedContentElement = $nextElement;
           $nextElement = $nextElement.next();
           while ($nextElement) {
             if ($nextElement.hasClass("button")) {
               break;
             }

             $nextElement = $nextElement.next();
           }
           break;
         } else {
           $nextElement = $nextElement.next();
         }
       }
      */
      if ($searchedContentElement && $buttonsAfterClicked.length) {
        //var $searchedContentElement = $searchedContentElements.first();
        if ($searchedContentElement.css("display") === "none") {
          $searchedContentElement.css("display", "");
          $curElement.text("hide");
        } else {
          $searchedContentElement.css("display", "none"); //$searchedContentElement.hide()
          $curElement.text("show");
        }
      }
    }
  };
}

module.exports = solve;