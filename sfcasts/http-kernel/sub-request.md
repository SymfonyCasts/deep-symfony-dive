# Sub Requests

Before we finish our adventure, I want to talk about a *fascinating* feature of
the request-response process. And it's something that we've already seen... but
not explored. I want to talk about sub-requests.

## Rendering  Controller from a Template

To do that, we need to add a feature! On the homepage, see these trending quotes
on the right? I'm going to close a few files... and open this template:
`templates/article/homepage.html.twig`. The trending quotes are hardcoded into
the template. Let's make this a little more realistic: let's pretend that these
quotes are coming from the database.

That would be simple enough: we could open the homepage controller, query
for the quotes and pass them into the template. Except... I'm going to complicate
things. Pretend that we want to be able to easily reuse this "trending quotes"
sidebar on a *bunch* of different pages. To do that well, we need to somehow
encapsulate the markup *and* the query logic.

There are at least 2 different ways to do this. The first option would be to
move the markup to another template and, inside, leverage a custom Twig function
that fetches the trending quotes from the database.

The *second* option - and a *particularly* interesting one if you want to use
HTTP caching - is to use a sub-request. You may have done this before, without
realizing that you were doing something *super* cool under-the-hood.

Remove this entire section and replace it with `{{ render(controller()) }}`. Put
together, these two functions allow you to *literally* render a controller from
inside Twig. The content of that Response will be printed here.

Let's execute a new controller: `App\\Controller` - you need 2 slashes because
we're inside a string - `\\` then a new controller class called `PartialController`.
For the method, how about, `::trendingQuotes`.

## Creating the Sub-Request Controller

Cool! Let's go make that! Click on `Controller/` and create a new PHP class:
`PartialController`. Make it extend the usual `AbstractController`, and create
the `public function trendingQuotes()`.

But, instead of making a real database query, let's fake it. I'll paste in a new
private function called `getTrendingQuotes()` - it returns an array with the
data for the 3 quotes. Above, call this: `$quotes = $this->getTrendingQuotes()`.
And then render the template: `return $this->render()`,
`partial/trendingQuotes.html.twig` and pass in the `$quotes` variable.

*Finally* add the template: create the new `partial/` directory first... then,
inside, the new `trendingQuotes.html.twig`. Perfect! I'll paste some code here
that loops over the quotes and prints them.

Ok! Let's see if it works! Move over and refresh. Woo! We just made
a sub-request!

## Seeing the Sub Request in the Profiler

Not as excited as I am? Ok: click any of the icons down on the web debug toolbar
to open the profiler and then go to the Performance section. Look closely: it
has all the normal stuff right? I see `RouterListener` and our controller. But,
there's a funny shaded-background coming from inside the Twig template.

*This* is indicating that there a sub-request was processed. And if you scroll
down, you can see it! Sub-requests 1 for `trendingQuotes()`.

This will make more sense if you scroll up and set the Threshold input box back
down to 0 to show everything. Ok, we see the same shaded area. This is when that
sub request is being handled, which *literally* means that another `Request`
object is being sent into `Kernel::handle()`. Scroll down here and behold!

Symfony didn't just execute the controller: it went through the *entire*
`HttpKernel::handle()` process again! It dispatched another `kernel.request` event,
executed all the listeners - including our `UserAgentSubscriber` - executed
the controller and dispatched `kernel.response`. And it dispatched the other
normal events too - they're just hard to see.

So... yep! `{{ render(controller()) }}` sends a second `Request` object through
the `HttpKernel` process.

In fact: want to get *really* crazy? We can click the controller link to go to
the *profiler* for *that* sub-request! Check out the URL: this is a kind of, internal
URL that identifies this sub-request. Set the threshold to 0 here to get a *big*
view of that sub-request.

## Sub-Requests & `_controller`

So... how did this work? How does Symfony go through the entire HttpKernel
process and render this controller... if there is no *route* to the controller?
How does the routing work for a sub-request?

The hint is: it *doesn't*. Click into the "Request / Response" section and
scroll down to the request attributes. Check it out: the request attributes
have an `_controller` key set to `App\Controller\PartialController::trendingQuotes`.

This works a lot like what we saw in `ErrorController`: Symfony creates a
`Request` object and sets the `_controller` on its attributes. Then, when
`RouterListener` is called.
ultimately gonna work. It's ultimately works by internally Symfony creating another
request object in setting the `_controller` on that request object. Then, when
the `RouterListener` was called for this sub-request - because it *was* called,
it saw that the request already had an `_controller` attribute and exited immediately.
The router is never called.

## Sub-Requests are Expensive

So *this* is a sub request. We're going to explore it further and talk about
some special properties of it. But before we do, I want to mention one things.
Sub-Requests are *awesome* if you want to leverage HTTP caching: that's where
you can cache the `Response` of a sub-request. For example, you could cache
the `trendingQuotes()` `Response` for 1 hour, and then *not* cache the rest of
your page at all. It's a *blazingly* fast way to cache.

But if you're *not* going to use HTTP caching, be careful not to over-use
sub-requests. Remember: they execute an *entire* `HttpKernel::handle()` flow.
So if you have a lot of them, it will slow down performance.

Next: let's make our sub-request a little bit more interesting. It's going uncover
something mysterious.
