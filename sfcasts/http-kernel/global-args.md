# Custom Global Controller Arguments

Now that we understand a lot more about its flow, we're on a mission to find weird,
crazy things that we can do in Symfony. For the next one, pretend that, for
*some* reason, we need to know whether or not a visitor is using a Mac or not.
In fact, we need this info *so* often, that we want the ability to add an
`$isMac` argument to any controller, like this.

Let's `dump($isMac)`... and then try it. No surprise, it explodes!

[[[ code('30f3e547f3') ]]]

> Controller `show()` requires that you provide a value for the `$isMac` argument.

I'll go back to a real article page, though that won't make any difference.

## Custom Arguments Via Request Attributes

So: how can we make this work? There are actually *two* answers, and we're
going to try both. The first is a, kind of, lower-level way of doing it. We know
that if we have a `{slug}` route wildcard, we are allowed to have a `$slug` argument.
So, in theory, if we had an `{isMac}` wildcard, we could have an `$isMac`
argument, though that's not what we want.

But it's not *really* that we're allowed to have a `$slug` argument
because there's a `{slug}` *wildcard*. Nope, we're allowed to have a `$slug` argument
because there is a `slug` key in the `$request->attributes`. The router *puts*
`slug` into attributes *because* of the wildcard, but when it comes to figuring
out what arguments to pass to a controller, it's all about the `$request->attributes`.

Inside of our listener, let's say `$isMac = stripos($userAgent, 'Mac') !== false`.
Now, to make `isMac` available as an argument to any controller, add
`$request->attributes->set('isMac', $isMac)`.

[[[ code('3a4f92ff45') ]]]

And... that's it! Try the page now. It works! And for me, it's set to true.

## Custom ArgumentValueResolver

The *second* way to add a custom controller argument is a bit more direct: create
a custom `ArgumentValueResolver`. When we were deep-diving into how Symfony
determines what arguments to pass to a controller, we found out that there are
various classes that determine this called "argument value resolvers". And we
can create our *own*.

Inside of the `src/` directory - it doesn't matter, let's put it in `Service/` -
create a new class called: `IsMacArgumentValueResolver`. The only rule is that
this class must implement `ArgumentValueResolveInterface`. I'll go to the
Code -> Generate menu - or Command + N on a Mac - and select "Implement Methods"
to generate the two methods that we need.

[[[ code('462c94204b') ]]]

Without doing anything else, this class is *already* being used by Symfony as
an argument value resolver. When we talked about that system, I hinted that the
way you get an argument value resolver into the system is by creating a service
and *tagging* it with `controller.argument_value_resolver`. Find your terminal
and, once again, run:

```terminal
php bin/console debug:container --tag=controller.argument_value_resolver
```

And now... if you look at the service ids, one of them is for our
`App\Service\IsMacArgumentValueResolver`. It's wrapped in *another* class because
Symfony is decorating the services with `TraceableValueResolver`, but this
*is* our service being used. Our new service *already* has the tag thanks to
Symfony's auto-configuration feature.

## Filling in the ArgumentValueResolver Logic

Let's go fill in the logic. Here's the plan: very simply, if the argument's name
*exactly* matches `$isMac`, we'll fill in our value. So for `supports()`,
return `$argument->getName() === 'isMac'`.

[[[ code('9670a46b21') ]]]

For `resolve()`, go grab the `$userAgent` code from the subscriber, paste it,
and then also copy the  `stripos()` logic. Delete the last two lines from the
subscriber so that it stops setting this global argument.

[[[ code('e17791d7a3') ]]]

Finish up the resolver by saying `return stripos($userAgent, 'Mac') !== false`.

[[[ code('5af8281047') ]]]

Let's try it! Find your browser, refresh and.. boo!

> Can use "yield from" only with arrays and Traversables

That's a funny way of saying that I forgot to `yield` instead of `return` from this
method: `resolve()` returns a *traversable*. Try it now and... it works! We
still see `true` for the dump.

Next, let's uncover one *last* mystery about controller arguments. Back in
`ArticleController::show()`, we *originally* had an `$article` argument that
was type-hinted with an `Article` entity class. How did that work? Who was
making that automatic query for us?
