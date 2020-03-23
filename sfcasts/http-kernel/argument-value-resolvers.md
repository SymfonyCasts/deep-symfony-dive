# Argument Value Resolvers

We just learned that when Symfony tries to figure out what arguments to pass to your
controller, it calls this `ArgumentResolver::getArguments()` method. It loops
over the arguments one-by-one and *then* loops over these things called
`argumentValueResolvers`, to see which one can figure out *what* to pass to each
argument.

To see a list of all of the argument value resolvers, we ran:

```terminal
php bin/console debug:container --tag=controller.argument_value_resolver
```

They're all decorated inside a `TraceableValueResolver` class, but you can see,
kind of by their name, what's really inside. So, I want to know: what are *all*
the possible arguments that I'm allowed to have on my controller? To find out,
let's look inside the *most* important of these argument value resolvers.

## RequestAttributeValueResolver: Wildcards as Arguments

Remove the `dd()` from `ArgumentResolver`. I'll hit Shift + Shift to open up my
*favorite* resolver: `RequestAttributeValueResolver.php`.

Perfect. Remember, as it loops over the arguments, the first thing
`ArgumentResolver` does is call `supports()` on each of these to figure out if
*this* value resolver can help. It passes us the `$request` and the
`ArgumentMetadata`.

To see how this works, `dd()` `$request->attributes->all()` and also `$argument`.
Because... check this out! This class *uses* the now-famous `$request->attributes`.

Move over and refresh the article show page. *Beautiful*. The request attributes
have what we expect: the stuff from the router. And because this is the *first*
time through the loop, it's asking us if we know what value to pass to the `slug`
argument.

In the `supports()` logic, if you ignore the `isVariadic()` part - that's not too
important - what this basically says is:

> I can provide the value for the argument *if* the name of the argument - `slug`
> in this case - is inside `$request->attributes`.

Down in `resolve()`... yea! It literally returns
`$request->attributes->get($argument->getName())`.

This is *huge*! The *first* thing we learn about Symfony routes and controllers
is that if you have a `{slug}` wildcard in your route, you're *allowed* to have
a `$slug` argument in your controller. Why does that work? Now we know! It's
a two step process. First, the router puts all the wildcard values into
`$request->attributes`. And second, this `RequestAttributeValueResolver`
looks *into* `$request->attributes` using the argument name and returns the value
if it's there. This class is what gives us this *fundamentally* important
functionality.

## RequestValueResolver: Request Argument

But that's not the only cool argument value resolver! Remove the `dd()` and... let's
go open another one! I'll hit Shift + Shift to open a class called
`RequestValueResolver`. There it is!

What are some *other* things that we know we are allowed to have as arguments?
Let me find an example... hmm... I'll open up `ArticleAdminController`. Here we
go: one of the other things you can do is add an argument that's type-hinted
with the `Request` class. If we do that, we get the request.

How does this work? It's thanks to `RequestValueResolver`. This one is dead
simple. It says:

> Hey! If this argument is type-hinted with the `Request` class... or a
> sub-class... pass the request!

That's *precisely* what `supports()` checks for. And `resolve()` couldn't be shorter.

## SessionValueResolver for SessionInterface Argument

Ok, what else is there? I'm going to go to the directory tree on top and
double-click this `ArgumentResolver` folder. That moves us *into* this directory
on the left... which is cool because this is *full* of other argument resolvers!

A few of these are similar to `RequestValueResolver` - like `SessionValueResolver`.
You may or may not know this, but you can type-hint an argument with
`SessionInterface` and you'll get the session. That works thanks to this resolver.

## UserValueResolver for UserInterface Argument

Another resolver lives in a different directory - I'll hit Shift+Shift to open it:
`UserValueResolver.php`. This resolver allows you to type-hint `UserInterface`
on an argument to get your security User object.

## The Amazing ServiceValueResolver

At this point, if we look back at `ArticleController::show`, we now know how the
first argument works, but... we haven't seen a resolver yet that explains the next
two. The second and third arguments are type-hinted with *services*. Where is
the magic that allows us to type-hint a service in a controller method?

The answer to that is the `ServiceValueResolver`. It's *such* a cool class, that
let's look at it in depth, next.
