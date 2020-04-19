# Sub Requests & Request Data

Remember that cool trick that we did a few minutes ago with the argument value
resolver that allowed us to have an `$isMac` argument to any controller in our
system? Does that *also* work in a controller that's called by sub request? Of
course! Because there's nothing special about this controller: it was called
thanks to a complete cycle through `HttpKernel::handle()`. All the same listeners
and all the same argument value resolvers are called.

So... cool! Let's use that! Add an `$isMac` argument... then pass it into the
template. Inside `trendingQuotes.html.twig`, near the bottom, add
`{% if isMac %}{% endif %}` and inside, put an `<hr>`, a `<small>` tag, and then
say:

> BTW, you're using a Mac!

Easy enough! Find your browser... navigate back to the homepage... and refresh.
On the right, there it is! We're using a Mac.

Just for the heck of it, let's add that same logic to the sidebar above this.
This lives in the homepage template, so find `ArticleController::homepage`...
add an `$isMac` argument and pass *this* into the template. Steal the `isMac`
logic from the trending quotes template, open `homepage.html.twig` and... right
below the "Buy Now!" button, paste.

When we try the page now, no surprise: *both* places show the message.

## Adding the ?mac Override

Since I *am* using a Mac, it's kind of hard to test whether or not this feature
correctly hides for people who are *not* on a Mac. To make testing easier, let's
add a way to override the real logic. I want to be able to add a `?mac=true` or
`?mac=false` to the URL to have full control.

The code for setting the argument is in `IsMacArgumentValueResolver`. So, if we
want to "short-circuit" the real logic, it's no problem. Before we read
the `User-Agent`, add if `$request->query->has('mac')`, then
`yield $request->query->getBoolean('mac)`. `getBoolean()` is a cool function that
grabs the `mac` query parameter but runs it through PHP's `filter_var()` function
with the `FILTER_VALIDATE_BOOLEAN` flag. That means a value like a `false` string
will turn into a `false` boolean. Kinda fun. Anyways, after this, return so the
function doesn't continue.

Ok: if I refresh without changing the URL, it still reads my `User-Agent` and
everything looks right. Now add `?mac=false`. And... it works! The message is
gone. Oh wait! The *first* message is gone, but the one coming from the
sub-request controller is still there! What the heck?

If you're thinking that somehow the argument value resolver isn't called on a
sub request, that's not it. A sub request is handled *exactly* like the main request.
This function is being called *twice* on this page: once for the main request and
again for the sub request. So why do those two calls produce a different result?

## The Request in the Sub Request is not the Same

Click into the profiler and go to the Performance section. The `Request` object
that's being processed on top is *not* the same as the `Request` object that's
being processed down here for the sub-request. Symfony creates two, *distinct*
`Request` objects. The first `Request` object represents the data for the *real*
HTTP request that's coming into our app. And so, it contains the query parameter
info. But that *second* `Request` is kind of a "fake" request. It mainly exists
so that the `_controller` attribute can be set on it. It's not *really* a
representation of the "real" request. And so, it may not have all the same data.
It doesn't have the query parameters, for example.

Let's see this: `dump($request)` inside of the `resolve()` method... then refresh.
Hover over the target icon on the web debug toolbar. Yep, *two* dumps. If we
look at the query parameters for the first `Request`... it's got it! `mac=false`.
But down on the second request, it has some `_path` query parameter, but *no* `mac`.

The point is: there are two different requests. And the fact that they don't all
contain the same data is on *purpose*. Because of this, whenever you're
handling a *sub-request*, it's not a good idea to read information from the
request... because you're not *really* reading data from the correct request!

So how can we correctly read the `mac` query parameter from a sub-request? To
learn how, let's get crazy and make our *own* sub-request directly in PHP.
