# Finishing the Request

There are several other interesting listeners to `kernel.response`. Here's one:
`ContextListener`... and it's from security! Open that up: Shift+Shift,
`ContextListener.php`.

## ContextListener: Loading the Security User from the Session

Scroll down to find the method we care about: `onKernelResponse()`. It says:

> Writes the security token into the session.

If you use a "stateful" firewall... which you probably *are*, unless your
security system is a pure, API token-based system, then *this* is the class that's
responsible for taking your authenticated `User` object - technically the "token"
object that holds it - and saving it into the session. Here it is:
`$session->set($this->sessionKey, serialize($token))`.

This class is *also* responsible for *unserializing* the token at the start of
each request - that's in a different method.

## DisallowRobotsIndexingListener

Close this class and look back at the event list. Let's see... there's a listener
called `DisallowRobotsIndexingListener`, which adds an `X-Robots-Tag` header set
to `noindex` *if* you set a `framework.disallow_search_engine_index` option to
*true*. Phew! That option *defaults* to `true` in dev... which is why we see this.
So if you... *accidentally*... deploy your site in dev mode, it won't be indexed.

## SessionListener

Let's look at *one* more: `SessionListener`. Open that one up: Shift+Shift then
`SessionListener.php`.

This class is responsible for actually *storing* the session information. It
extends `AbstractSessionListener`... which holds the majority of the logic

This also listens on the `kernel.request` event... but we're interested in the
`onKernelResponse()` method. It does several things... but eventually, it *calls*
`$session->save()` to actually *put* your session data into storage. All these
tiny invisible pieces help make your application sing.

## kernel.finish_request & RequestStack

Ok, *enough* playing with these listeners. Close the two session classes and go
back to `HttpKernel`. After dispatching the `kernel.response` event, this calls
a `finishRequest()` method and then *finally* returns the `Response` that's on the
event. Let's see what `finishRequest()` does. Ah! It dispatches one *more* event
and then calls `$this->requestStack->pop()`.

Remember: this `RequestStack` object is basically a collection of request objects -
something we'll talk more about soon. The `pop()` method *removes* the
most-recently-added `Request` object *from* that collection. If you scroll back up
to the top of `handleRaw()`, the `pop()` call does the *opposite* of
`$this->requestStack->push($request)`. So... we don't know *why* this request
stack thing needs to exist... but we *at least* know that the current `Request`
object is *added* to the `RequestStack` at the beginning of handling the request,
and then *removed* at the end.

## Returning the Response to the User

So... we're done! The `filterResponse()` method returns the `Response`, then
`handleRaw()` returns the same `Response`... and then `handle()` *also* returns
the `Response`... all the way back to `index.php`: `$response = $kernel->handle($request)`.

We made it! But we haven't *sent* anything to the user yet: everything is still
just stored in PHP memory. The next call takes care of that: `$response->send()`.
I'll open that up. It's just a *fancy* way of calling the PHP `header()` function
to set all the headers and then echo'ing the content. At this point, our response
is *sent*!

## kernel.terminate: The Final Event

Back in `index.php`, there's *one* final line: `$kernel->terminate()`. Let's
find that inside of `HttpKernel`. And... wow. I'm personally *shocked*. This
dispatches one *final* event.

This event is dispatched *so* late that... if your web server is set up correctly,
the response has *already* been sent to the user! This event isn't used too often...
but it *is* where all the *data* for the profiler is stored, for example. In fact,
that's the *only* listener to this event: `ProfilerListener`.

So *that* is Symfony's request-response process in depth. A work of art.

It may have seemed like a lot, but if you zoom out, it's delightfully simple:
we dispatch an event, find the controller, dispatch an event, find the arguments,
dispatch an event, call the controller, dispatch 2 more events in `filterResponse()`
and `finishRequest()` and then, back in `index.php`, we send the headers, echo the
content and dispatch one *last* event. It's... kind of a "find the controller,
call the controller" system... with a *ton* of events mixed in as hook points.

But go back to `HttpKernel` and scroll *all* the way back up to `handle()`. Ah
yes, this wraps *all* of our code in a try-catch block. So what happens if an
exception is thrown from somewhere in our app? Well, quite a lot. Let's jump
into that next.
