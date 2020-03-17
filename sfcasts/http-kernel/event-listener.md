# Hooking into Symfony with an Event Subscriber

Before we dive into the core code, let's hook *into* the request-response process.
Let's create our own *listener* to this `kernel.request` event. To do that, in the
`src/` directory, I already have an `EventListener/` directory. It doesn't matter
*where* we put this class, but inside here, let's create a new class called
`UserAgentSubscriber`.

All event subscribers must implement `EventSubscriberInterface`, the one from
HttpKernel. I'll go to the Code -> Generate menu on PhpStorm - or Command + N on
a Mac - and select "Implement Methods" to generate the one method this interface
requires: `getSubscribedEvents()`. Inside, return an array of *all* the events
we want to listen to, which will just be one.

Now... you *might* be expecting me to say `'kernel.request' => 'onKernelRequest'`.
This would mean that when the `kernel.request` event happens, I want Symfony to
call an `onKernelRequest()` method on this class that we will create in a minute.
This *would* work, but starting in Symfony 4.3, instead of using this made-up
`kernel.request` string, you can pass the event *class* name, which in this case
is `RequestEvent::class`.

More and more, you'll see documentation that tells you to listen to an event *class*
like this, instead of a random string.

Now, create the function: `public function onKernelRequest()`. Inside, dump and
die `it's alive!!!`.

Cool! With any luck, Symfony will call our event listener *very* early on and
it will kill the page. Close the profiler, refresh and... it's alive! Well
actually, it's *dead*, but ya know... that's what we wanted!

## Logging in the Listener and Controller

To make the class more interesting, let's log something! You know the drill:
add `public function __construct()` with `LoggerInterface $logger`. I'll hit
Alt+Enter and go to initialize fields as a lazy way to create the property and
set it down here.

In the method, add `$this->logger->info()` with:

> I'm logging SUPER early on the request!

To compare this to logging in a controller, go back to `ArticleController`.
On the `homepage` action, autowire a `$logger` argument and say `$logger->info()`:

> Inside the controller!

We *expect* that the listener will be called first because the RequestEvent,
also known as `kernel.request`, happens *before* the controller is executed.
Refresh the page. It works... and once again, open the profiler in a new tab, click
Logs and... perfect! First our listener log and *then* the controller.

And you can *now* see our subscriber inside the performance section! Make sure
you have the threshold set to 0. Let's see... there it is: `UserAgentSubscriber`.
And then down... *way* after that... is the controller.

## The Event Argument

One of the other "laws" of Symfony's event system is that a listener will *always*
be passed a single argument: an *event* object. What *type* of object is it?
This is where the new "event class names as event names" comes in handy. We're
listening to `RequestEvent`, which means - surprise! - Symfony will pass us a
`RequestEvent` object! Let's just `dd($event)`.

Ok, move back over, close the profiler again, refresh and... there it is! Each
event you listen to will be passed a *different* event object... and each event
object will have different super-powers: giving you whatever information you might
need for that particular situation, and *often*, allowing you to *change* things.

For example, this event contains the `Request` object... because if you're
listening to this *very* early event in Symfony... there's a good chance that
you might want to use the `Request` object to do something.

In fact, let's do exactly that. Clear out our method and say
`$request = $event->getRequest()`. And then we'll grab the `$userAgent` off of
the request with `$request->headers->get('User-Agent')`. *Finally*, let's log
this: `$this->logger->info()` and I'll use `sprintf()` to say

> The User-Agent is %s

Pass `$userAgent` for the placeholder.

Let's check it out! Move over, refresh, open the profiler in a new tab, go down to
Logs and... we got it! We're logging the user agent *before* the controller
is called.

Ok! Now that we've hooked into Symfony, let's take a step back and start tracing
through *everything* that happens from the start of the request, line-by-line.
We'll even see *where* the `RequestEvent` is dispatched and eventually where the
controller is executed.

Let's start that journey next.
