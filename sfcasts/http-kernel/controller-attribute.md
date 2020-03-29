# The Magic `_controller` Attribute

Now that we've been stuffed full of knowledge about the request-response process,
let's see what kind of trouble we can get into. Uh, I mean, let's do some cool
and productive things with all this new information!

## Overriding the Controller from a Listener?

Close all the files except for `index.php` and `HttpKernel`. Here's our first
challenge: could we - from some event listener - *change* the controller
for the page?

Hint: in Symfony, the answer to "can I do X" is *always* yes. In this case, it's
not only possible, there are *multiple* ways to do it.

For example, when `HttpKernel` dispatches the `kernel.controller` event, it passes
each listener a `ControllerEvent` object. And that class has a `setController()`
method. Easy peasy! We can override the controller by adding a listener to that
event. Heck, you can do the same thing down here with the
`kernel.controller_arguments` event.

## Overriding the Controller on kernel.request?

So... that was too easy. I'll close up my directory tree... and then open our
`UserAgentSubscriber`. Here's my harder challenge: how can we override the
controller from *here*: from a listener to the `kernel.request` event. In this
case, there is no `setController()` method.

## Callback Controller with `_controller`

The trick is to remember how the controller resolver works: it starts by fetching
the `_controller` value from the `$request->attributes`. So if, for *some* reason,
we wanted to completely replace the controller, we can do it right here:
`$request->attributes->set('_controller', ...`. For fun, let's set this to an
anonymous function... cause yea! That's allowed! Inside, return a
`new Response()` with:

> I just took over the controller

Will it work? Refresh *any* page. Yep! We see our message here, on the homepage
and *everywhere*. And our normal controller tricks work just fine: add a
`$slug` argument... but give it a default value and then `dd($slug)`. On the
article show page... this works thanks to the `{slug}` wildcard. On the homepage,
it's `null` because that wildcard doesn't exist.

## RouterListener Skips when `_controller` is Set

Open up `RouterListener.php` one more time and find its `onKernelRequest()` method.
*This* method is *normally* responsible for executing the router and setting
the `_controller` key onto the request attributes. But back down at
`getSubscribedEvents()`, ah! The `kernel.request` listener has a priority of 32.
We didn't give our subscriber a priority, so it has a priority of 0. This means
that `RouterListener` is called *before* our subscriber.

Ok, so then here is what's happening: `RouterListener` is called first and it
*is* executing the router and setting an `_controller` key on the request attributes.
*Then* our listener is called and we *override* that value.

So... if we *reversed* the order - if we made *our* listener be called first - our
little `_controller` hack would *not* work, right? Because `RouterListener` would
override *our* value.

Actually... no! At the top of `onKernelRequest()`, one of the *first* things it
does is check to see if something has *already* set the `_controller` attribute.
If it has, it does nothing: someone *else* has decided to be responsible for
figuring out which controller to call. In reality, no matter *how* early the
`_controller` attribute is set, it will *always* win over `RouterListener`.

## Peaking at our First Sub-Request

Why is that important? Because *this* explains how `ErrorListener` was able to
execute `ErrorController`. Open up `ErrorListener.php`. Remember: to execute
`ErrorController` this *duplicated* the request. But it didn't create an exact
copy: it overrode the attributes in order to set `_controller` to `error_controller`.
Then it sent that new `Request` back through through the *entire* `$kernel->handle()`
process! This means that before *any* listeners were executed during that *second*
trip through `HttpKernel::handle()`, the `_controller` attribute was already set.

So in reality, on an error page, `RouterListener` is called *two* times: once
for the main request... when it does its job normally... and *again* for the
"sub request". That second time, because the `_controller` attribute is already
set, `RouterListener` does nothing.

In fact, let's see this. Before the if,
`dump($request->attributes->has('_controller'))`. Then, in your browser, go back
to a 404 and try it. Ah, boo! This hit the `die` statement in our fake controller.
I didn't mean to do that. In `UserAgentSubscriber`, comment-out our controller hack
so we can see the whole process.

Ok, try it again. Hello 404 page! Hover over the target icon on the web debug
toolbar. Yes! 2 dumps from `RouterListener`: `false` the first time it's called
and, the second time it's called - which is due to the code in `ErrorListener` - it
dumps `true` because that `Request` *does* already have the `_controller` attribute.

This second request is called a sub-request... but more on that topic later. Remove
the `dump()` call.

Let's see what other ways we can hack into Symfony, like by adding *new* things
that can be used as controller arguments. That's next.
