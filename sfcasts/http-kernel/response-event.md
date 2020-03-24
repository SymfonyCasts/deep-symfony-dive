# kernel.response Event & Request Format

No matter what, Symfony's job is to look at the incoming request and *somehow*
convert that into a response. More specifically, that's the job of `HttpKernel`,
specifically the `handleRaw()` method.

At this point we have a `Response` object: either our controller returned the
response or a `kernel.view` listener created it. Then, at the bottom, our last
act is to return `$this->filterResponse($response)`.

Before we look at that method, there was *one* other place during this process
where we could have *already* returned a response. Scroll to the top. Here:
listeners to the *very* first event - `kernel.request` - have the ability to
set a `Response` immediately. If they do, this *also* calls
`$this->filterResponse()`.

## The kernel.response Event

The point is: no *matter* how we get the `Response`, eventually,
`filterResponse()` will be called. Hold Command or Ctrl and click that method to
jump to it. What a shock! This method dispatches yet *another* event. This ones
is called `KernelEvents::RESPONSE`, which is the string `kernel.response`.

There are *several* interesting listeners to this event. Go back to your browser,
refresh the page, click to go into the profiler and then go to Events section.
*Way* down... here it is: `kernel.response`.

## WebDebugToolbarListener

So many cool, subtle listeners to this event, like the `WebDebugToolbarListener`!
A listener to this event has access to the final `Response` object. I'm going to
open the original page in a new tab... and view the HTML source. Very simply,
the `WebDebugToolbarListener` checks to see if this is a full HTML page and, if
it is, it *modifies* the HTML and *adds* a *bunch* of JavaScript at the bottom.
This JavaScript is what's responsible for rendering the web debug toolbar. That's
a powerful example.

## ResponseListener

As far as understanding the *mechanics* of the request-response flow, there are
actually *no* critical listeners to this event... but there *are* still some pretty
important ones, like `ResponseListener`. Let's open that one up.

I'll hit Shift+Shift to open `ResponsesListener.php`: get the one from
`http-kernel/`, not `security`. Ok, it says:

> `ResponseListener` fixes the `Response` headers based on the `Request`.

Let's... find out what that means. Inside `onKernelResponse()`... the most important
part is that this calls `$response->prepare($event->getRequest())`. Ok, hold
Command or Ctrl to jump into that.

Here's the idea: once the `Response` has been created, this *checks* the `Response`
to see if it has some missing pieces. For example, if the response doesn't have
a `Content-Type` header yet - if that's not something that *we* set in our
controller - this uses some information from the *request* to set that header
for you.

## Request "Preferred Format"

This is interesting stuff... and I'm curious how that `getPreferredFormat()`
method works. Ok, hold Command or Ctrl to jump into *that*.

I won't go into the full details of this method, but here are the basics. This
method's job is to try to determine what *format* - like `html` or `json` - that
the client - the "thing" that's sending the request - *prefers* for the response.
Basically: does the client want and HTML response or a JSON response?

To figure that out, it does two things. First, it calls `$this->getRequestFormat()`.
Basically, it checks to see if something else has explicitly said:

> This is the format that the user is requesting

That can be done in 2 different ways. First, by calling
`$request->setRequestFormat()`, which you could do, for example, in a listener.
At this time, there is only *one* place in *all* of core that calls this function:
the `json_login` authentication system calls `$request->setRequestFormat('json')`.

The *second* way the request format can be set is by putting an `_format` key
into the request attributes! That most commonly happens by adding an `_format`
key to you route defaults or by actually having a `{_format}` route wildcard.

If *neither* of those things happens - which is the "normal" way that things
work - then this method loops over the "acceptable content types" to find one
what works. This reads the `Accept` header on the `Request`, loops over them
with highest priority first, and as soon as it finds one that it understands,
that's returned.

The *big* point here is this: Symfony has a concept of "what format of a response
does this request *prefer*". It uses that to set the `Content-Type` header. This
idea is going to be important again *later*.

By the way, this line *may* change to use `$request->getRequestFormat()` at some
point in the future... which just means that if you *like* this idea of it
automatically setting the `Content-Type` response header based on the `Accept`
request header, make sure you do it explicitly when you create your Response.

Close the `Response` class and `ResponseListener`. Before we boldly push forward,
there are a *few* other listeners I want to look at. Let's do that next and then...
yes... send the final response to the user!
