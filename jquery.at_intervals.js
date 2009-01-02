// Author: Jacek Becela
// License: cc-by-sa
(function($) {
  $.fn.at_intervals = function(fn, options) { // name and interval are mandatory
    
    return this.each(function() {
      var it = $(this) // capturing this
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
          return $(it).parents("html").length == 0
        },
        user_wants_to_stop: function() {
          return it.data(name).should_stop == true
        },
        is_visible: function() {
          return it.parents("*").andSelf().not(":visible").length == 0
        },
        user_wants_to_pause: function() {
          return it.data(name).should_pause == true
        }
      }
      
      // remove previous interval
      if(it.data(name)) {
        clearInterval(it.data(name).interval_id)
      }
      
      it.data(name, { 
        delay: delay,
        fn: fn
      })
      
      fn() // call fn immediately (setInterval applies the delay before calling fn for the first time)
      
      var interval_id = setInterval(function() {
        if(helper.should_stop()) {
          clearInterval(interval_id)
          it.removeData(name)
        } else {
          if(helper.should_work()){
            it.data(name).fn()
          }
        }
      }, delay)
      
      it.data(name).interval_id = interval_id
    })
  };
})(jQuery);
