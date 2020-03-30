# Custom Global Controller Arguments

We're on a mission to find weird, crazy things that we can do in Symfony, now that
we understand a lot more about its flow. For the next one, pretend that, for
*some* reason, we need to know whether or not a visitor is using a Mac or not.
In fact, we need this info *so* often, that we want the ability to add an
`$isMac` argument to any controller, like this.

Let's `dump($isMac)`... and then try it. Not surprisingly, it explodes!

> Controller `show()` requires that you provide a value for the `$isMac` argument.

I'll go back to a real article page, but that won't make any difference.

## Custom Arguments Via Request Attributes

Okay: so how can we make this work? There are actually *two* answers, and we're
going try both. The first is, kind of, lower-level way of doing it. We know that
if we have a `{slug}` route wildcard, we are allowed to have a `$slug` argument.
So, in theory, if we had an `{isMac}` wildcard, we could have an `$isMac`
argument, though that's not what we want.

The point is: it's not *really* that we're allowed to have a `$slug` argument
because there's a `{slug}` wildcard. We're allowed to have a `$slug` argument
because there is a `slug` key in the `$request->attributes`. The router *puts*
`slug` into attributes *because* of the wildcard, but when it comes to figuring
out what arguments to pass to a controller, it's all about the `$request->attributes`.

Inside of our listener, let's say `$isMac = stripos($userAgent, 'Mac') !== false`.
Now, to make `isMac` available as an argument to any controller, we can say
`$request->attributes->set('isMac', $isMac)`.

And... that's it! Try the page now. It works! And for me, it's set to true.

## Custom ArgumentValueResolver

The *second* way to add a custom controller argument is a bit more direct: create
a custom `ArgumentValueResolver`. When we were deep-diving into how Symfony
determines what arguments to pass to your controller, we found out that there are
various classes that determine these - called "argument value resolvers". And...
we can create our *own*.

Inside of the `src/` directory - it doesn't matter, let's put it in `Service/` -
create a new class called: `IsMacArgumentValueResolver`. The only rule is that
this class must implement `ArgumentValueResolveInterface`. I'll go to the
Code -> Generate menu - or Command + N on a Mac - and select "Implement Methods"
to generate the two methods that we need.

Before we do *anything* else, this class is *already* being used by Symfony as
an argument value resolver. When we talked about that system, I hinted that the
way you get an argument value resolver into the system is by creating a service
and *tagging* it with `controller.argument_value_resolver`. Find your terminal
and, once again, run:

```terminal
php bin/console debug:container --tag=controller.argument_value_resolver
```

And now... if you look at the service ids, one of them is for our
`App\Service\IsMacArgumentResolver`. It's wrapped in *another* class because
Symfony is decorating all the services by `TraceableValueResolver`, but this
*is* our service being used. Our new service *already* has the tag thanks to
Symfony's autoconfiguration feature.

## Filling in the ArgumentValueResolver Logic

Let's go fill in the logic. Here's the plan: very simply, if the argument's name
*exactly* matches `$isMac`, we'll fill in our value. So for `supports()`,
return `$arguments->getName() === 'isMac'`.

For `resolve()`, let's go grab the `$userAgent` from our subscriber, paste that,
and then also copy the  `stripos()` logic. Delete the last two lines from the
subscriber so that it stops setting this global argument.

Finish up the resolver by saying `return stripos($userAgent, 'Mac') !== false`.

Let's try it! Find your browser, refresh and.. boo!

> Can use "yield from" only with arrays and Traversables

That's a funny way of saying that I forgot to `yield` instead of return from this
method - `resolve()` returns a *traversable*. Try it now and... it works! We
still see `true` for the dump.

Next, let's uncover one *last* mystery about controller arguments. Back in
`ArticleController::show()`, we *originally* had an `$article` argument that
was type-hinted with an `Article` entity class. How did that work? Who was
making that automatic query for us?
