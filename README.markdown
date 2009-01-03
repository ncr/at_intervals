At Intervals
============

Using the power of **jQuery** to mitigate the awkwardness 
of `window.setInterval()` and `window.clearInterval()`.


What problem does this plugin solve?
------------------------------------

Once in a while I have to implement a widget consisting of some code and looks.
The looks are some divs with styling. The code is a **JavaScript** snippet that usually 
polls for some data at given intervals (using `setInterval()` at some point).

This is quite normal, nothing fancy by now.

There are some additional requirements however. The widget can be _temporarily hidden_
or _completely removed_ from the **DOM**. It can also be _paused_ or _stopped_ by a user.

All these requirements boil down to stopping or pausing execution of `setInterval()` function.

Instead of manually calling `clearInterval()` or pausing the periodical execution of `setInterval()`
via some hackery I wanted it to happen automatically.


Functionality with examples
---------------------------

1.  Call a function (_fn_) at given intervals (_3s_). This is almost the same as `setInterval()`.
    The main difference is that the function (_fn_) is called once immediately without waiting 
    for the delay to pass as the original `setInterval()` does.

        $("#widget").at_intervals(fn, { delay: 3000, name: "poll_messages") // calls fn(), then 3s delay, then fn() again, etc..

2.  Bind the periodical execution to a **DOM** element (usually the div representing the widget).
    This allows for pausing the execution automatically when the div is hidden and for stopping
    if the div gets removed from **DOM**.

        $("#widget").hide() // pauses execution
        $("#widget").show() // resumes execution
        $("#widget").parent().empty() // stops execution (by removing #widget from DOM)

3.  Store the `intervalID` and give it a human readable label (i.e. "poll\_messages").
    This is stored in the bound div using *jQuery* data cache.

        $("#widget").data("poll_messages").interval_id // returns intervalID
        $("#widget").data("poll_messages").delay // 3000

4.  Allow pausing/resuming and stopping execution easily by hand (_should\_stop_ and _should\_pause_ flags).

        $("#widget").data("poll_messages").should_pause = true  // pauses execution
        $("#widget").data("poll_messages").should_pause = false // resumes execution  
        $("#widget").data("poll_messages").should_stop  = true  // stops execution (calls clearInterval() internally)

5.  Effortlessly overwrite existing periodical execution with a new one by stopping old and starting new one).
    
        $("#widget").at_intervals(fn1, { delay: 3000, name: "poll_messages") // stops fn, starts fn1
        $("#widget").at_intervals(fn2, { delay: 1000, name: "poll_messages") // stops fn1, starts fn2
        $("#widget").at_intervals(fn3, { delay: 1000, name: "poll_messages") // stops fn2, starts fn3

Footer
------

Author: [Jacek Becela](http://github.com/ncr)

License: [CC-BY-SA](http://creativecommons.org/licenses/by-sa/3.0/)
