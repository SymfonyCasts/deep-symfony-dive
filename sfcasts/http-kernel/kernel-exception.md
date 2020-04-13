# The Critical kernel.exception Event Listeners

Back at the browser, refresh to get the normal not found page, click to open
the profiler... and go into Events. Because this was a 404 page, the
`kernel.exception` event *was* dispatched. The most important listener - and the
one that *eventually* will render this page - is `ErrorListener`.

Let's see how it works! Hit Shift + Shift and open `ErrorListener.php`: get the
one from `http-kernel/`, not `console/`. Look down here for the
`getSubscribedEvents()` method. *Interesting*: it listens to
`KernelEvents::CONTROLLER_ARGUMENTS` and it listens to `KernelEvents::EXCEPTION`
twice. We won't look at the `CONTROLLER_ARGUMENTS` listener method - but if you
want to look back at it after finishing the entire tutorial, it should make sense.
What it does is minor, but interesting.

When the `kernel.exception` event is dispatched, `logKernelException()` will be
called first and then, later, `onKernelException()`, because it has a `-128`
priority.

## How Exceptions are Logged

Find `logKernelException()` up on top. It's job is simple: log that
an exception was thrown. If you follow the `logException()` logic, you'll see
that it logs at a different *level* based on the status code. We're going to talk
more soon about how different exceptions *get* different status codes. But the
important piece here is that all 500 status code exceptions log at the `critical()`
level, and 400 status code exceptions log at `error()`. If you're like us, you've
probably *used* this fact before in your Monolog config to send 500 error logs
to somewhere where you can be notified, like a Slack channel.

## The Error Controller

The *other* listener method is `onKernelException()`. *This* is what's responsible
for rendering the error page: both the nice development error page *and* the
boring, production error page. It has a priority of `-128` because *it* will
eventually set the `Response` on the event, which will *stop* event propagation.
The low priority makes it easy to register *other* listeners before this happens.
Heck, you could easily create a listener that *replaces* this one, by setting
the Response itself... though, there are better ways to customize the error
process.

Go find this method. Hmm. The first thing it does is reference some
`$this->controller` property. Let's find out what that is.
`dd($this->controller)`, then spin over to your browser, make sure you're on a
404 page and refresh.

[[[ code('e38ee43c47') ]]]

Interesting: it's a *string*: `error_controller`. Find your terminal and run:

```terminal
php bin/console debug:container error_controller
```

Surprise! `error_controller` is the id of a service! And its job apparently is to:

> Render error or exception pages from a given FlattenException

Ok, we don't know what a `FlattenException` is yet, but *apparently* this is
a controller that's good at rendering error pages. Let's see what it looks like!

Hit Shift + Shift to open `ErrorController.php`. Ooooo. It has an `__invoke()`
method! *This* is an *invokable* controller! We talked about those earlier when
we were inside the controller resolver. *Usually* a controller will have the
format `ClassName::methodName`. Well, we learned that this is *really*
`ServiceId::methodName`.

Anyways, for an *invokable* controller - a controller class that has an
`__invoke()` method - the syntax is simpler: just, `ServiceId`: no `::` stuff.
*That* is what's happening here.

## How the ErrorController is Called

Ok cool, so Symfony is going to execute this `error_controller` as a controller...
and it will render the page. But... how? You can't normally just *call* a controller
directly... or at least, you *shouldn't* do this.

Back in `ErrorListener`, take out the `dd()`. The logic here is *fascinating*.
It says `$request = $this->duplicateRequest()` and passes the `$exception` and
`$request` objects. Let's jump down to that method. Apparently, the `Request` class
has a `duplicate()` method on it, which does exactly what you think - it
effectively *clones* the object.

But, it passes this `$attributes` value to the third argument. This says:

> Please create an exact copy of this Request. When you do that, keep the same
> query parameters as the original, the same POST parameters as the original,
> but *replace* the original request *attributes* with this new array.

So... it's a *clone*, but with different request attributes. Most *importantly*,
the new attributes have an `_controller` key set to that `error_controller` string.

Move back up to the `onKernelException()` method. We have a `Request` object
that has an `_controller` request attribute. Here's the magic:
`$response = $event->getKernel()->handle($request)`.

Yea! It's calling the `HttpKernel::handle()` method! The *same* one that we
use in `index.php` and the *same* one we've been studying. *Inside* of handling
the original request, it's handling a *second* request and getting back the
response. And notice that it mentions something called a "sub request". We'll
talk more about that soon.

For now, this is just a *super* fancy way of calling the `error_controller`. Instead
of executing it directly, it creates a `Request` with an `_controller` attribute
and tells `HttpKernel` to handle it. Neato!

Next, let's jump into `error_controller` itself and find out exactly *how*
Symfony renders an error page. Because, it's a smart process: it renders the
exception page in dev, the error page in prod and *even* changes format - like
rendering JSON - when requested.
