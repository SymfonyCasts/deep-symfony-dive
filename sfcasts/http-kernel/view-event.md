# Calling the Controller & View Event

Ok, let's remember what we've done so far... because it's really not *that* much.

## The kernel.controller_arguments Event

We dispatched an event, found the controller, dispatched another event, found the
arguments, and... guess what? Now we're dispatching *another* event called
`KernelEvents::CONTROLLER_ARGUMENTS`, which resolves to the string
`kernel.controller_arguments`.

There are no core, important listeners to this: it's just another hook point. The
only difference between this event and `kernel.controller` is that this event has
access to the *arguments*. So if you needed to do something that's *based* on
what arguments we're *about* to pass to the controller, this is your event.
Listeners to this event *also* have the ability to change the controller *or*
the arguments via setter methods on the event class.

## Calling the Controller

What's next? It's the moment we've *all* be waiting for. Drum roll..
we call the controller! Yes! We *knew* that the code that executed the controller
lived *somewhere*... and here it is. It's delightfully simple:
`$controller(...$arguments)`. I love that.

## The kernel.view Event

And of course, what does our Symfony controller *always* return? A `Response`.
Unless... it doesn't. It turns out, your controller does *not* actually need to
return a `Response` object. If it returns something else, then you end up inside
the next if statement. And... what does Symfony do? You can kinda start guessing
whenever I ask that question. The answer is *pretty* much always: Symfony dispatches
an event. This time it's `KernelEvents::VIEW`, which means `kernel.view`.

When Symfony dispatches this event, it's basically saying:

> Yea... so, this controller returned something that's *not* a response... and I
> kinda need a response that I can send back to the user. Can any listeners to
> this event, somehow, *transform* whatever the controller returned into a response?
> That would be schweet!

This is, kind of, the "view", or "V" in a true MVC framework. Normally our controller
return a response directly. But instead, you *could*, for example, return...
an `Article` entity! You would return a "model". Then, you could write a listener
to this event that transforms that `Article` entity into HTML by rendering the template.

This event isn't used anywhere in Symfony's core, but it *is* used *extensively*
inside API Platform. Internally, their controllers return *objects*. Then, they
have a listener - actually a few that work together - that *transforms* that object
into JSON, XML or whatever format the user is requesting.

After dispatching the event, it checks to see if the event has a response. Hold
Command or Ctrl and click to open the `ViewEvent` class. If you listen to this
event, you have access to what the controller *returned*. Then... I'm going
to open the parent class... a listener can call `setResponse()` with whatever
`Response` it created.

So if *one* of the listeners sets the response, then `$event->hasResponse()` will
be true and... we're saved! We *do* now have a response. But if *none* of the
listeners are able to set a response... sad trombone... then *finally*, Symfony
panics! It says that controller must return a `Response` object, but it returned
something different. And then, one of my *favorite* parts of this whole system:
if `null === $response`, it politely adds:

> Did you forget to add a return statement somewhere in your controller?

Ah yes, I *have* forgotten that, many times. Let's forget it now! Add a `return`
in our `show()` action, then spin over, refresh and... enjoy the error!

Go back and remove that.

At this point, we *definitely* have a `Response` object: either our controller
returned a `Response` or a listener to `kernel.view` was able to create one. So
*finally*, down here... we're done! We made it! We return
`$this->filterResponse($response)`. What does *that* method do? Do you remember
what you're *always* supposed to answer when I ask that question? Yep, it dispatches
*another* event! Let's look into that next and dig into a few *really* cool listeners
on it, including one that takes us into the topic of the "request format".
