# Sub Request Attributes

We have this problem: we know the *cause*, but not the *solution*. Basically,
we're reading this `?isMac=false` from both our master request - where it's
being read correctly - *and* our sub-request - where it is *not*. That's because
those are two separate request objects. And, in general, we should avoid reading
request info from a sub-request... because we're not working with the *real*
`Request` object!

But accidentally trying to *use* data from the real request in a sub-request was
*so* easy to do! Inside of `PartialController`, we simply added an `$isMac` argument
like we do everywhere else. This argument *was* passed thanks to our custom
`IsMacArgumentValueResolver`: this is executed on *every* request. But the
*second* time it's called, the request is *not* the real request.

Here's the plan: I want to prevent any controllers that are being called on a
sub-request from being able to have an `$isMac` argument. If we try, I want
an exception to be thrown.

By the way, it *is* actually possible to use the `RequestStack` from *anywhere*
to get the "master" request: it has a `getMasterRequest()` method. But! If
you're using HTTP caching with edge side includes, this will *break*. The solution
we're going to show is the proper one... and a lot more fun to implement for a
deep dive.

## Passing isMac through the Request Attributes

The *easiest* way to do this would be to go to our argument value resolver, find
out if this is a sub-request and return `false` from `supports()` in that case. But...
there's not a *great* way to figure out if this is the master or sub-request
from here. That's mostly a superpower of event listeners.

So, let's use a trick: let's allow the *listener* to figure out whether or not
we're using a Mac. And then, it can *pass* that information over to our
argument value resolver.

Inside the subscriber, create a new private function called `isMac()`: it will
take in the `Request` object from `HttpFoundation` and return a boolean. For the
logic, copy everything from inside of `resolve()`, remove it and paste it here.
Change both of the `yield` calls to `return`.

[[[ code('3c7bb9036a') ]]]

Perfect! We now have a function to tell us if we're using a Mac. Now, up in
`onKernelRequest()`, if this is a sub-request, the method returns immediately.
But if it's a *master* request, let's work some magic. How can we pass the `isMac`
value to the argument value resolver? We could create and call a setter on it.
*Or*, we could put that into the request attributes! I mean, that *is* the proper
place for information about the request that is specific to your app. This is
a perfect example!

Do it with `$request->attributes->set()` and create a key called `_isMac` set to
`$this->isMac($request)`.

[[[ code('02bc27d22e') ]]]

We're calling it `_isMac` because if we called it just `isMac`, we wouldn't even
*need* the argument value resolver! It would immediately be possible to have an
`$isMac` argument without an error. So... I want to try to do this, kind of, the
hard way.

Move over to the `IsMacArgumentValueResolver`. Here, we're going to *read* that
attribute, which will *only* exist on the *master* request. Inside of `supports()`,
add `&& $request->attributes->has('_isMac')`. Supports will *now* return false
for a sub request. 

[[[ code('d0855bbca7') ]]]

In `resolve`, `yield $request->attributes->get('_isMac')`

[[[ code('91cf3c2028') ]]]

That's it! Does it work? In your browser, *first* open an article show page in a new
tab. Here, it works: you can see it on the web debug toolbar: we're dumping the
`$isMac` argument in the controller. This *proves* that we haven't broken the
master request.

But now, refresh the homepage. It explodes!

> An exception has been throwing during the rendering of a template: could not
> resolve `$isMac` argument.

And you can see that it hits this on our `{{ render(controller()) }}` line. This
is *exactly* what I wanted: I can no longer accidentally use this argument: it
*only* works on the *master* request.

## Passing Attributes Directly to a Sub-Request

Of course... the question *now* is: how do we fix this? What if I really *do* need
to know the `$isMac` value from inside a sub request? I mean, that's a valid thing
to want to know!

The solution is to *pass* the `isMac` value from your *main* request *to* your
sub request object. In a Twig template, you can do this by passing an optional
second array argument. Pass `isMac` set to `isMac`.

[[[ code('2d56310ee5') ]]]

Before we chat about this, let's see if it works. Refresh and... it *does*! Woh!
Let... me explain. The second argument to `controller()` is an array of values that
you want to pass to the *attributes* of the sub-request object. Why does that
work? Well, for the sub-request, the `$isMac` controller argument is actually *not*
being passed to us thanks to the `IsMacArgumentValueResolver`. Nope! It works
simply because we put an `isMac` key into the request attributes... and anything
inside request attributes are *allowed* as controller arguments.

It *feels* like the second argument to the Twig `controller()` function is just an
"array of variables to pass to the controller". And while that's *essentially*
true, it *really* works thanks to the request attributes.

Back on the homepage, because we still have the `?mac=false` query parameter, the
message is *not* rendered in both places. If we remove that query parameter...
yes! It's displayed consistently.

## Attributes and Edge Side Includes

As an added benefit, this was of passing variables from the master to the
sub-request works *perfectly* with edge side includes and HTTP caching. Open
the profiler, go to the Performance tab, find the sub request and click to go
into *its* profiler. See this internal URL up here? If we were *truly* using
edge side includes, this URL *would* be a real URL used by your HTTP cache to
fetch this fragment *and* the URL would have an extra `isMac=true` or `false`
query parameter. For ESI, request attributes becomes *part* of the URL. And
since the URL operates as the cache *key* for HTTP caching, this means that you
would have a *separate* cache for the version of your trending quotes *with*
the "isMac" message and *without*. That's perfect.

Close up that tab. Now that we know that this array become request
attributes, *another* solution would be to pass `_isMac`. If we did that, it
would be used by our argument value resolver. `UserAgentSubscriber` would still do
nothing because it's a sub request... but the `_isMac` attribute *would* be there
and the `IsMacArgumentValueResolver` would make the `isMac` argument available
to `PartialController`. Two different ways to do the exact same thing... and
both are *super* nerdy.

Ok friends! Wow! That was *fun*! I hope you enjoyed this deep dive into the heart
of Symfony's HttpKernel as much as I did. If you have still have questions or
want to deep-dive into a different part of Symfony, let us know in the comments.

Happy hacking! And we'll see ya next time.
