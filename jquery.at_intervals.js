// Author: Jacek Becela
// License: cc-by-sa
(function($) {
  $.fn.at_intervals = function(codes, interval) {
    return this.each(function() {
      var it = this // this is it :)
      var interval_id = setInterval(function() {
        // check if "it" is still in the DOM
        if($(it).parents("html").length == 1) {
          codes();
        } else {
          clearInterval(interval_id);
        }
      }, interval);
    });
  };
})(jQuery);
