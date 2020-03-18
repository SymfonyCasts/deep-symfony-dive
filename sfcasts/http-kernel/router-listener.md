# RequestEvent & RouterListener

We've traced the code from the first file that's executed - `public/index.php`
all the way into this core `HttpKernel` class. Specifically, this `handleRaw()`
function. These 50 lines of code are the *entire* framework. It somehow transforms
a `Request` at the beginning into a `Response` at the end. The question is: how?
What does it *do* to accomplish that?

## The RequestStack

The first line here uses something called a `RequestStack`:
`$this->requestStack->push($request)`.

The `RequestStack` is a small object that basically holds an array of `Request`
objects. It's not important now, but we *will* talk about it later. Because, yes,
as *strange* as it may seem, there *is* a concept of inside Symfony of handling
*multiple* `Request` objects at a time. But don't worry about it now.

## Dispatching RequestEvent (kernel.request)

The first really important thing is that Symfony dispatches an event. So, almost
before doing *anything* else, the first event is triggered. It's called... surprise!
`RequestEvent`.

Go back to your browser and refresh the page: it should be working now. Click any
of the web debug toolbar links to jump into the profiler and go to the Performance
section.

As we talked about earlier, our controller is somewhere in the middle of all of
this. And most of the things before and after the controller are *listeners* to
different events. In fact, look at this one: a gray bar called `kernel.request`.
This is that `RequestEvent` we just saw! It's also called `kernel.request`, so
you'll see both mentioned in different places.

## The Listeners to RequestEvent

This shows us how *long* it took to execute all of the listeners for this event.
To get a better view, go back to the Event section of the profiler. Yep, the
*very* first event that was triggered was `kernel.request`... and in this app,
it has about 10 different listeners.

For the purposes of understanding how Symfony works, the majority of these listeners
aren't very important. They do various things. Like, for example, this
`ValidateRequestListener` is a function that validates that a few important parts
of the request are correctly formatted. Basically, it will cause an error if
it looks like a hacker is trying to manipulate the request.

At the bottom of the listener list, check it out! There is *our*
`UserAgentSubscriber` - last because it has the lowest listener priority.

Really, out of all these listeners, there is only *one* that is *critically*
important to understanding how the framework works. It's `RouterListener`. If
you ever wondered *where* the routing system is actually executed - at what
*point* it looks at the request and tries to find a matching route - here is
your answer: `RouterListener`.

## Hello RouterListener

So... let's go see what it does! I'll hit Shift+Shift and type `RouterListener.php`.
Whenever you're doing this, make sure the "Include non-project items" box is
checked - PhpStorm usually does it automatically if you type a really-specific
name.

Open this up! The first thing I want you to notice is that this looks a *lot*
like our event subscriber. It implements `EventSubscriberInterface` and... if
we find the `getSubscribedEvents()` method down here, it listens to a *few*
events. The only one that's important for us is `KernelEvents::Request`, which
is just a constant that resolves to the string: `kernel.request`.

Find the `onKernelRequest` method... here it is. Skip down a little - for me,
down to lines 111 to 115. *This* is where the router is executed:
`$this->matcher` is the router. It's not really important which side of the
`if` statement is actually executed: either way, this runs the routing.

So... my question is: what is the *end result* of executing the "match"
functionality on the `Router`? On a high level, we understand routing: it looks
at the current URL - and sometimes other parts of the request - and determines
which route matches.

## What does Routing Return?

But... what is this `$parameters` variable? What does the `match()` method return?
I don't know! Let's find out! Hit enter and `dd($parameters)`.

Let's see what it is! Find your browser and click *back* to get the homepage.
I'm going to open an article page in another tab... then refresh the homepage.

Interesting: what we get back from the routing is an *array* with two things inside:
`_route` - that's the name of the matched route - and `_controller`, which is the
full class name and method of the controller attached to the route.

Ok... what about the article show page? Move to that tab. Woh! We get the *same*
thing - `_route` and `_controller`, but with one *new* item in the array: a `slug`
key! As a reminder, if you go to `src/Controller/articleController` and find the
`show()` method, its *route* has a wildcard called `slug`. So *really*, what
the routing layer returns is this: a combination of *all* the wildcard values in
the route *plus* `_controller` and `_route`.

That's... *mostly* true. But this is a deep-dive course. So next, let's look
even *deeper* at route and route defaults to learn the *full* story. We'll also
look at what the `RouterListener` *does* with this super-important array.
