// Author: Jacek Becela
// Website: http://github.com/ncr/at_intervals
// License: cc-by-sa
(function($) {
  $.fn.at_intervals = function(fn, options) { // name and interval are mandatory

    return this.each(function() {
      var e = $(this)
      var name = options.name
      var delay = options.delay
      
      var helper = {
        should_stop: function() { // used to completely remove the interval
          return this.removed_from_dom() || this.user_wants_to_stop()
        },
        should_work: function() { // used to pause/resume the interval
          return this.is_visible() && !this.user_wants_to_pause()
        },
        removed_from_dom: function() {
          return e.parents("html").length == 0
        },
        user_wants_to_stop: function() {
          return e.data(name).should_stop == true
        },
        is_visible: function() {
          return e.parents("*").andSelf().not(":visible").length == 0
        },
        user_wants_to_pause: function() {
          return e.data(name).should_pause == true
        },
        stop: function(interval_id) {
          clearInterval(interval_id)
          e.removeData(name)
        }
      }

      if(e.data(name)) { 
        helper.stop(e.data(name).interval_id) // remove previous executer
      }
      
      e.data(name, { delay: delay }) // initialize data cache
      
      if(helper.should_work()) {
        fn() // call fn immediately (setInterval applies the delay before calling fn for the first time)
      }
      
      var interval_id = setInterval(function() {
        if(helper.should_stop()) {
          helper.stop(interval_id)
        } else {
          if(helper.should_work()){
            fn()
          }
        }
      }, delay)
      
      e.data(name).interval_id = interval_id
    })
  };
})(jQuery);
