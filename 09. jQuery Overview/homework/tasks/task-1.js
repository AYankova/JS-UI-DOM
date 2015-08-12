/* globals $ */

/* 

Create a function that takes a selector and COUNT, then generates inside a UL with COUNT LIs:   
  * The UL must have a class `items-list`
  * Each of the LIs must:
    * have a class `list-item`
    * content "List item #INDEX"
      * The indices are zero-based
  * If the provided selector does not selects anything, do nothing
  * Throws if
    * COUNT is a `Number`, but is less than 1
    * COUNT is **missing**, or **not convertible** to `Number`
      * _Example:_
        * Valid COUNT values:
          * 1, 2, 3, '1', '4', '1123'
        * Invalid COUNT values:
          * '123px' 'John', {}, [] 
*/

function solve() {
  return function(selector, count) {
    if (!$.isNumeric(count)) {
      throw new Error("Not valid count. Should be a number!");
    }

    count = +count;
    if (count < 1) {
      throw new Error("Count should be greater than 1!");
    }

    if (typeof selector !== "string") {
      throw new Error("Selector should be of type string!");
    }

    var $element = $(selector);
    var $list = $('<ul/>').addClass('items-list');
    var $liElement = $('<li/>').addClass('list-item');

    if ($element) {
      for (var i = 0; i < count; i += 1) {
        $liElement.clone()
          .text("List item #" + i)
          .appendTo($list);
      }

      /* for (var i = 0; i < count; i += 1) {
        $liElement = $('<li/>').addClass('list-item')
          .text("List item #" + i)
          .appendTo($list);
      }
      */

      $list.appendTo($element);
    }
  };
}

module.exports = solve;