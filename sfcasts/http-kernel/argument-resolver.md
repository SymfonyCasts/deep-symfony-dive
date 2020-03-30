# The Argument Resolver

Inside `HttpKernel`, we now have the controller. But before we run around excitedly
and try to *call* that controller... we need to figure out what *arguments* to pass
to it.

To help see this clearly, in `ArticleController::show()`, we need to make one
small change. Instead of having an argument type-hinted with `Article` and allowing
Symfony to automatically query for it by the slug, let's temporarily do this manually.
Remove that argument and replace it with `$slug`. Now add another arg:
`ArticleRepository $articleRepository` so that we can make the query:
`$article = $articleRepository->findOneBy(['slug' => $slug])`.  And then, if
*not* `$article`, `throw $this->createNotFoundException()`.

Functionally, this is identical to what we had before... but it will help us with
our deep-dive. By the way, *we* know that this `createNotFoundException()` line will
result in a 404 page. If you hold Command or Ctrl and click into that method, it
returns a `NotFoundHttpException`. So... for *some* reason, *this* specific exception
maps to a 404... while most *other* exceptions will cause a 500 page. By the end of
this tutorial, we'll know *exactly* why this happens.

## The kernel.controller Event

Go back to `HttpKernel`. Now that we've figured out what the controller is, the
next thing that happens is... we dispatch another event! This one is called
`KernelEvents::CONTROLLER`, which maps to the string `kernel.controller`.

So let's look at *everything* we've done so far: we dispatched an event, found
the controller, then dispatched another event. That's *all*.

There are no particularly important listeners to this event, from the perspective
of how the framework operates. Refresh the article show page... and click to open
the profiler. Go to the Events tab... and find `kernel.controller`.

In this app, there are 6 listeners... but nothing critical. A few of them
come from `FrameworkExtraBundle` - a bundle that gives us a *lot* of magic shortcuts.
These rely *heavily* on listeners... and we'll talk about how some of them work later.

One of the things that a listener to this event can do is *change* the controller.
It's not very common, but you can see it down here:
`$controller = $event->getController()`. Hold Command or Ctrl to open the
`ControllerEvent` class. Here it is: a listener can call `setController()` to
*completely* change the controller to some *other* callable.

## The Argument Resolver

Ok, back in HttpKernel after the `kernel.controller` "hook point", this next line
is the missing piece: we need to know what arguments we should pass when we call
the controller. To figure that out, it uses something called the "argument resolver".
And it's pretty cool... we call `getArguments()`, pass it the `$request` and
`$controller` and it - *somehow* - figures out all the arguments that this controller
should be passed.

Ok, you know the drill: let's open this thing up and see how it works! This time,
the class is simple: I'll hit Shift+Shift and open a file called
`ArgumentResolver.php`. Find the `getArguments()` method.

Okay, interesting. It *first* uses a `foreach` to loop over
`$this->argumentMetadataFactory->createArgumentMetadata()` as `$metadata`.
This is actually looping over each *argument* to the controller function. So for
the show page, this would loop 3 times: once for each argument.

## The ArgumentMetadata

Then, *inside* that loop, it does another: it does a `foreach` over something
called `argumentValueResolvers`. Let's see what's going on here. Inside the
first loop, `dd()` the `$metadata` variable: this should be *something* that,
sort of, represents a single argument.

Move over and refresh. Huh. Apparently this is an `ArgumentMetadata` object,
which holds the name of the argument - `slug`... because that's the name of the
first argument to the controller. It also holds the argument `type`, which
in this case is `null`. For the second argument it would be `SlackClient`.
It has some other stuff too: like if the argument has a `defaultValue` or
`isNullable`.

That's... really cool! It's *all* the metadata about that one argument. The next
question is: what does this function *do* with that metadata?

## The Argument Value Resolvers

Clear out the `dd()`. Let's figure out what these `$argumentValueResolvers` are.
This argument is actually an iterator - it has an `iterable` type... which is *not*
important... except that we need to get fancy to see what's inside.
`dd(iterator_to_array($this->argumentValueResolvers))`.

Move over and... 8 items! Each object is being decorated by a
`TraceableValueResolver`. But if you look inside - I'll expand a few of these -
you'll see the *true* object: `RequestAttributeValueResolver`, `RequestValueResolver`,
and a `SessionValueResolver`. *These* are the objects that figure out which
*value* to pass to each controller argument.

Another way to see this - since this is a deep-dive tutorial - is to find
your terminal and run:

```terminal
php bin/console debug:container --tag=controller.argument_value_resolver
```

Because if you want to create your *own* argument value resolver - we'll do that
later - you need to create a service and give it *this* tag. This gives us the
same list - but it's a bit easier to see the *true* names: some `request_attribute`
resolver, `request` resolver, `session` resolver, `user_value_resolver` and more.

We're going to walk through some of the most important value resolvers next.

## How Argument Value Resolver Works

But before we do, let's go back and... see how this system works! We loop over
each argument... and then loop again over every argument value resolver and
call a `supports()` method on each. So, one-by-one, we're asking each argument
value resolver:

> Hey! Do you know what value to pass for a `$slug` argument with no type-hint?

Or, on the next loop,

> Yo! Do you know what value to pass to a `$slack` argument with a `SlackClient`
> type-hint?

If an argument resolver returns `false` from `supports()`, then it continues onto
the next one. If it returns `true`, it *then* calls `$resolver->resolve()` to get
the value.

So - *hopefully* - by the end of looping through all the argument value resolvers,
one of them has figured out what value to pass to the argument.

Next, let's open up the *most* important argument value resolvers and figure out
what they do. This will answer a cool question: what are *all* the possible arguments
that a controller is allowed to have... and why?
