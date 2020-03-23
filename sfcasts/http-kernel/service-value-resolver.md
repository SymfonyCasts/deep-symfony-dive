# How Service Autowiring Works in a Controller Method

The *one* common type of controller argument that we *haven't* explained yet are
for arguments that are type-hinted with an autowireable service. How does that work?
This class -  `ServiceValueResolver` - is responsible. It's, honestly, a bit of
genius from Nicolas Grekas who wrote it - and one of my favorite things to look at.

Inside `supports()`, before we even look at what it's doing, let's `dd($argument)`.
When we refresh... there we go. The *first* time this is called is actually for
the *second* argument to our controller. Why? Because the first argument was handled
by the `RequestAttributeValueResolver` before this one was ever called. It's not
usually important, but there is a priority to these value resolvers.

Anyways, the `$slack` argument is the first one that hits our
`supports()` method. And the *key* thing is that this argument has a type of
`App\Service\SlackClient`.

## ServiceValueResolver::supports()

Let's look at the logic. Hey! It's our old friend request attributes! The first
thing this method does it get the controller with
`$request->attributes->get('_controller')`. For us, that's the now-familiar
`ClassName::methodName` string format.

Next, it does some normalization of the format. That's not relevant to us: it's
just trying to make sure that the `$controller` variable us *ultimately* a
string.

Finally, we hit an if statement that says: if not
`$this->container->has($controller)`. Hmm. It seems like it's... checking to see
if our controller is a service?

## The Controller Argument ServiceLocator

Actually, no: it's doing something *totally* different. To see what's going on,
before the return, let's `dd($controller)` and also `$this->container` so we can
see what that looks like.

Let's refresh. Ok, the controller is no surprise: it's `ClassName::methodName`
string syntax. But check out `$this->container`. This is *not* the main Symfony
container. This is *once again* one of those small container - called a service
locator.

The details how this class aren't important... but you can browse the `$serviceMap`
to see what's inside of this container. Apparently it holds 34 services... and
weird, it has one service for *every* single controller method in our system.
The id is the full controller string - including the `::methodName` part.

So... this is weird. What is this thing? To make sense of it, let's also `dd()`
`$this->container->get($controller)`. That's eventually what the last line of
`supports()` does.

Refresh now. This last dump for `$this->container->get($controller)` gives us...
*another* mini-container! And if we look at the `$serviceMap` property, it has
two things: `articleRepository` and `slack`... which *exactly* match the two argument
that are type-hinted with services in our controller!

So... in reality, the `$this->container` property is *basically* a big array of
mini "containers" - one service locator for *every* controller function in our
system. And each of *those* locators will contain all of the services for all of
the arguments that are type-hinted with a service.

Thanks to that, if we look down in `resolve()`... and skip passed some normalization,
it ultimately yields  `$this->container->get($controller)` - to get the
mini-container - then `->get($argument->getName())` to get the specific service
for the `$slack` or `articleRepository` argument.

So we have a big container, full of containers... full of services. How crazy is
that? Now all of that

## How the Controller Containers are Built

The *truly* amazing part is how Symfony figures out all of this. *All* of the
logic for building this container of containers is done when your cache is built:
there is *zero* runtime overhead.

The key behind this working is hiding inside of *your* `config/services.yaml` file.
Have you ever wondered why the `src/Controller` directory has its *own* import
section? It's not *strictly* needed... because classes in this directory are
*already* registered as services thanks to the import above.

The reason is this tag, which does *two* things. First, it makes these services
*public*. We talked about that earlier: it's needed so that the controller resolver
system can fetch our service out of the main container at runtime.

The *second* thing it does is more interesting. When Symfony is building the
container cache, it looks for *all* of the services that have this tag. It then
finds all the public methods on the classes, and uses autowiring to figure out
all the arguments that are type-hinted with an autowireable service. It uses
*that* info to create this final container of containers.

This was a *key* innovation in Symfony 3.4 that allowed us to use autowiring in our
controller methods. This is why this magic works here, but nowhere else.

Head back to `ServiceValueResolver` and, back up here, let's remove the `dd()`.

## Route Defaults can be Arguments

So... that's basically it for the main argument value resolvers. If your argument
name matches a route wildcard, then that's allowed as an argument. And actually,
now that we understand that these wildcard values go into the request attributes
*and* that any route *defaults* are put in the same place, open `config/routes.yaml`.
Thanks to this `totally_inventing_this_default` key that we added to `defaults`,
this will get put into the request attributes and we *could* add an argument
to our controller with this name.

## One Missing Piece: Auto-querying Entity Arguments

But this doesn't explain *one* thing. Open `ArticleAdminController` and find the
`edit()` action. It doesn't explain why I can type-hint an entity class and...
*something* queries for it automatically and passes us the object.

We'll learn how that works later - it uses a bit of an *older* system inside of
Symfony.

Next, we'll go back to `HttpKernel` and continue our journey. We now that the
controller *and* the arguments. Most of the work is behind us.
