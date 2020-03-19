# The Controller Resolver

After the `kernel.request` is dispatched, it checks if `$event->hasResponse()`
and, that's true... it returns the response! Well, it calls
`$this->filterResponse()` and *then* returns the response - and we'll see what
that method does in a little while - but the point is: the function *ends*. The
response is returned *immediately* before our controller is executed or anyting
else.

## Listeners to kernel.request can Return a Response

This is kinda cool. Here's the idea: if a listener to `kernel.request` *somehow*
already has enough information to return a response... it can do that! It's not
super common, but hey! Let's try it!

In `src/EventListener/UserAgentSubscriber.php`, we can say `$event->setResponse()`.
Not *all* event classes have this `setResponse()` method - but `RequestEvent`
does. Then say `new Response()` - the one from `HttpFoundation` - and I'll set
a very important message.

Now when we refresh... yay! Nedry killed *every* page!

Ok, remove that code... and then I'll close a few files.

## The Controller Resolver

Back in `HttpKernel`, so far we've dispatch *one* event and the `RouterListener`
ran on that event, which modified the request attributes.

Let's keep following the code. This next line is interesting: inside the `if`
we have: `$controller = $this->resolver->getController()`. This "resolver" thing
is a "controller resolver" object. At a high level, it's beautiful. We know
that we will eventually need to execute a controller that will create the Response.
This class is *entirely* responsible for *determining* that controller: we pass
it the request and - *somehow* - it gives us back a controller, which can be
any *callable*.

## What Class is the ControllerResolver?

How can we figure out what class `$this->resolver` is? Well... of course, there's
always the handy `dd($this->resolver)`, which... tells us that this is an instance
of `TraceableControllerResolver`. By the way, whenever you see a class called
"Traceable" something, this is almost *definitely* an object that is *decorating*
the *real* object in the `dev` environment in order to give us some debugging info.
The *real* controller resolver is inside:
`Symfony\Bundle\FrameworkBundle\Controller\ControllerResolver`.

*Another* way to figure this out - maybe a slightly nerdier way for a deep-dive
course - is with smart use of the `debug:container` command. The `$resolver` is
one of the arguments to the constructor on top: its argument 2. We can see the
interface type-hint, but not the concrete class.

Scroll back down, then move over to your terminal and run
`php bin/console debug:container http_kernel` - that's the service id of
the HttpKernel - `--show-arguments`.

This tells me that the second argument is `debug.controller_resolver`. Ok, let's
run this command again to see what service this is decorating:

```terminal-silent
php bin/console debug:container debug.controller_resolver --show-arguments
```

This uses Symfony's service decoration - a topic we'll see in our next deep-dive
tutorial. But basically, when a service is decorated, the *real* service's id
will be `debug.controller_resolver.inner`. So... run `debug:container` with that!

```terminal-silent
php bin/console debug:container debug.controller_resolver.inner --show-arguments
```

And here it is: the *true* controller resolver class is... what we already know:
it's called `ControllerResolver` and lives inside FrameworkBundle.

## Opening the ControllerResolver Classes

So... let's open that up and see what it looks like! I'll hit Shift+Shift and
look for `ControllerResolver.php`. Oh, there are *two* of them: the one from
`FrameworkBundle` and another from `HttpKernel`. So... there's some inheritance
going on: the `ControllerResolve` from `FrameworkBundle` extends a
`ContainerControllerResolver`... which extends the `ControllerResolver` from
HttpKernel. The class from `FrameworkBundle` doesn't contain anything important
that we need to look at. So I'm actually going to open `ContainerControllerResolver`
first. And... yep! Its base class is `ControllerResolver`, which lives in the
same namespace. Hold Command or Ctrl and click that class to open it.

## Hello ControllerResolver

Ok, let's follow the logic in thee two classes. `HttpKernel` called the
`getController()` method. Let's see go see what that looks like!

The `getController()` method is passed the `Request` and... oh! Check it out!
The first thing it does is fetch `_controller` from the request attributes!
So why is `_controller` the "magic" key you can use in your YAML route? It's
because of this line right here: the `ControllerResolver` looks for `_controller`.

Ultimately, what this method will return is some sort of *callable*. For us, it
will be a method inside an object, but it can also be a number of other things,
like an anonymous function. Let's see what our `$controller` looks like at this
point: `dd($controller)`, then move back to your browser and refresh.

Ah yes: for us, `$controller` is the normal string format we've been seeing: the
full controller class name, `::`, then the method name.

Remove the `dd()` and let's trace down on the code. This has a bunch of if
statements, which are all basically trying to figure out if the controller is
maybe *already* a callable. It checks if it's an array and if the 0 and 1 elements
are set - because that's a callable format. We're also not an object... and our
string is not a function name. Basically, our controller is *not* already a
"callable".

So ultimately, we fall down to `$callable = $this->createController()`. Somehow
*this* function converts our string into something that can be invoked. How?
Let's find out next *and* learn a bit about how the controller base class -
`AbstractController` gets access to the container... which it uses to power its
shortcut methods.
