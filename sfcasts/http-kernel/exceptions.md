# Exception Handling

We've now walked through the "happy" path: we know how a successful request is
converted into a response process. But what about the *unhappy* path. We know
that the *entire* application execution is wrapped in this try-catch block.

basically me basically is this `handle()` function inside `HttpKernel`. Immediately
our entire application is wrapped in a try-catch block. So, if an exception
is thrown from *anywhere*, this will catch it. The `$catch` argument is `true`
by default, so we're not going to hit this `finishRequest()` line. Nope, if an
exception is thrown, this will call `$this->handleThrowable()`.

And, this an interesting situation. Because no matter *what* when wrong in your
app - like your database is being eaten by robots, or your PHP code has become
self-aware and is rewriting itself, *ultimately*, you need to return a *response*
to the user... even if that's just a photo of those robots setting your servers
on fire. Somehow, *something* needs to convert the `Exception` into a `Response`.
*That* is the job of `handleThrowable()`.

## Hello kernel.exception Event

Hold Command or Ctrl and click to jump down to this method. What does
`handleThrowable()` do? I know this may come as a shock to you... but this dispatches
*another* event: `KernelEvents::EXCEPTION`, or `kernel.exception`.

Move over and refresh the page. Click into the profiler and then into Events. Now,
*this* page did *not* throw an exception. So this event was *not* dispatched.
But we can click on "Not Called Listeners" to find it. Let's see... I went
*right* past it: here it is. The `kernel.exception` event has about 5 listeners.

## How the "Welcome to Symfony" Page is Rendered

The most important one is `ErrorListener`, which we're going to look at in a
minute. But check this out: `RouterListener` - the *same* class we looked at
earlier - *also* listens to this event. Why? This gives us a very minor feature...
but the *way* that it accomplishes it is a *super* fun example of how different
parts of the system working together. Let's look into it.

I'll hit Shift+Shift to open up our old friend: `RouterListener.php`. Let's see...
I'm looking for `getSubscribedEvents()` method. There it is on
`KernelEvents::EXCEPTION`, call `onKernelException()` with a priority of `-64`...
which means that it will be called fairly late compared to other listeners.

Find the `onKernelException()` method. The *purpose* of this method is to render
a nice "Welcome to Symfony" page when you start a *brand* new project that has
no homepage. That's what this `createWelcomeResponse()` does: it renders a little
PHP template. Let's see that: Shift + Shift to open `welcome.html.php`. Here
it is: "Welcome to Symfony!" with links to the docs and other things. If you start
a *brand* new Symfony 5 project, this is what you would see.

I *love* this page... because it's really cute. But for our purposes, I want to
know how this works. Back in `RouterListener`... actually, look back at
`HttpKernel`. Listeners to this event at passed an `ExceptionEvent` object...
and the actual exception that was *thrown* - that's the `$e` variable is passed
*to* that object! That makes sense: any listeners to this event will *probably*
need to know *what* exception was thrown.

In `RouterListener`, it checks to see if the exception that was thrown is an
instance of `NotFoundHttpException`. Which, by the way, is the *exact* exception
class that *we* throw in a controller whenever we want a 404 page. It's inside
the `createNotFoundException()` method: `return new NotFoundHttpException`.
That's not important for understanding how this welcome page is rendered... but
it *is* interesting that this exception class keeps popping up.

Anyways, if the exception is *not* a `NotFoundHttpException`, it this listener does
nothing. But if it *is*, it then checks to see if the *previous* exception is
an instance of `NoConfigurationException`. If it is, it renders the welcome page.

So... then... what's going on exactly? Here's the secret: when the Router is executed,
if no route is matched and the URL is `/`, it throws this `NoConfigurationException`.

If you scroll up to `onKernelRequest()`, remember, *this* is what executes the
routing. Specifically, the `matchRequest()` method - that's the one that's used
in the Symfony Framework - is what throws that exception. The
`NoConfigurationException` *extends* `ResourceNotFoundException`. That's important
because this *entire* block is wrapped in a try-catch: and it's catching
`ResourceNotFoundException`.

So in general, if the router can't match a route, it throws a
`ResourceNotFoundException`. But in this *one* special case, it throws a
subclass called `NoConfigurationException`.

So it catches the exception and *throws* a new `NotFoundHttpException` but
set the exception from the *router* as the *previous* exception. Ultimately,
this `NotFoundHttpException` is thrown from this method, *caught* by the try-catch
in HttpKernel and put into the `ExceptionEvent` object.

Then, `RouterListener` *listens* to that exception and, if it's a
`NotFoundHttpException` whose *previous* exception is `NoConfigurationException`,
it renders the welcome page.

Go team!

## Manually Rendering the Welcome Page

For fun, let's see if we can trigger the welcome page manually. Go to
`ArticleController`. We're throwing a `NotFoundHttpException` if the `slug` can't
be found in the database. Pass `null` as the first argument to
`createNotFoundException()` - that's just the message, not important for us.
The second argument is a way to set the *previous* exception. Let's fake what
the router does: `new NoConfigurationException()`.

Testing time! Move over, click back to the real article show page... then change
the slug to `foo`. Boom! Welcome to Symfony! This is a silly example... but can
you feel the power?

Back in the controller, remove that code.

## Setting Response, Stop Propagation

Back in `HttpKernel`, Symfony ultimately wants a `Response` object: it wants
somebody to set the response on this event, which it fetches with
`$response = $event->getResponse()`.

Hold Command or Ctrl and click to open the `ExceptionEvent` class. This class
is similar to the `RequestEvent` that we saw earlier. If you find `handleRaw()`...
here it is: `RequestEvent` is used for the *earliest* event in Symfony. Listeners
to *that* event are able to set a `Response` if they want.

The same happens down in `handleThrowable()`: listeners can set a `Response` on
the event. In fact, in `ExceptionEvent`, check out the base class! It's
`RequestEvent`! It's the *exact* class from that other event and *it* has a
`setResponse()` method.

We already saw that method used in `RouterListener`: `$event->setResponse()` with
`$this->createWelcomeResponse()`.

but what I *really* want to show you, back in `RequestEvent`, is this: if something
calls `setResponse()`, the event class calls a `stopPropagation()` method. If you
hold Command or Ctrl and click this, it opens up in *another* base class. It
sets a flag called `propagationStopped` to true.

This is important: if you have multiple listeners to `kernel.exception` and one
of them sets the response, the other listeners will *not* be called. Yep, the
EventDispatcher *looks* for this flag and, if it's true, it immediately stops
calling the other listeners. This means that the *first* listener to set a response
wins. It's a good thing to keep in mind, and it explains some of the *priorities*
that the listeners have.

Next: let's look at the *critical* listeners to the `kernel.exception` event
and see what they do.
