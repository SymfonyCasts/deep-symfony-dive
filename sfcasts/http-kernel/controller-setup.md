# Who Creates the Controller & Gives it the Container?

In a Symfony app, this `$controller` variable is the string format that comes
from the router - something like `App\Controller\ArticleController::homepage`.
This function - the `getController()` method of the `ControllerResolver` - has one
simple job: it needs to *transform* that string into a PHP *callable*. To do that,
it calls `createController()`.

## Invokable Classes

Let's scroll down to find this method. Here it is:
`protected function createController()` with a string `$controller` argument.
The *first* thing it does is *check* to see if the controller does *not*
have `::` in the middle. If it does *not* contain `::`, the controller is
actually an *invokable* class. This is a strategy for controllers that some people
in the Symfony world are using - it's especially popular in ApiPlatform. The idea
is that each controller class has only *one* controller method - called `__invoke()`.
When a class has an `__invoke()` method, objects of that class are *invokable*:
you can execute the object like a function. Anyways, if you use invokable
controllers, then your `$controller` string is *just* the class name: no method
name is needed.

How Symfony handles invokable controllers is actually *pretty* similar to how
it will handle *our* situation: we'll see this `instantiateController()` method
in a moment.

## Instantiating the Controller Object

Because our controller *does* have a `::` in the middle, it *explodes* the two
parts: everything before the `::` is assigned to a `$class` variable and everything
after is set to a `$method` variable. Then, inside the try-catch, it *puts* this
into a callable syntax: an array where the `0` index is an object and `1` index
is the string method name. I know, PHP is weird: but this type of syntax *is* callable.

Of course, on this line, `$class` is *still* just a string. To *instantiate* our
controller, it calls - surprise - `instantiateController()`!

This method is *overridden* in the child class. Go over to
`ContainerControllerResolver` and find `instantiateController()`. Awesome!
It checks to see if the class is in the *container*. And if it is, it doesn't
instantiate the controller itself: it *fetches* it from the container and returns
it.

## How your Controller is Fetched from the Container

*This* is what's happening in our case: our controller is a *service*. In fact,
pretty much *everything* in the `src/` directory is a service... or at least,
is *eligible* to be a service - we'll go deeper into that in the next deep-dive
tutorial. That's thanks to the `config/services.yaml` file. This section
auto-registers everything in the `src/Controller` directory as a service.

So... our controller is a service... and `ContainerControllerResolver` fetches
it from the container. But this *only* works because the class name of our
controller *matches* its service id. What I mean is: there is a service in the
container whose `id` is *literally* `App\Controller\ArticleController`.

This is teamwork in action! The annotation route automatically set the controller
string to the *class* name... and because that's *also* the id of the service in
the container, we can fetch it out without *any* extra config.

So the truth is, your controller syntax isn't *really* `ClassName::methodName`.
It's `ServiceId::methodName`. If your controller service had a *different*
id for some reason, that's ok! In that case, you would set your controller
to your *service* id `::` then method name in YAML. There's also a way to do this
in annotations.

Fetching your controller from the container *also* works because controller services
are *public*. Really, they're the *only* services that we routinely make public.
If you look back at `services.yaml`, it's not immediately obvious *why* they're
public - I don't see a `public: true` anywhere. I'll save the details for the
*next* deep-dive tutorial, but the controller services are public thanks to this
*tag*. *One* of the things it does is make all of the services *public* so that
the `ContainerControllerResolver` can fetch them directly.

## The Old Way: Direct Instantiation

If, for *some* reason, your controller is *not* registered as a service, then it
calls `parent::instantiateController()`, which... could not be simpler. It says
`new $class()` and passes it *no* arguments. That's basically legacy at this
point: it's how controllers we created *prior* to Symfony 4.

## The Final Callable Controller Result

Scroll back up in `ControllerResolver` to `getController()`. This is all a
*long* way of saying that our controller string - this
`App\Controller\ArticleController::homepage` - is split into two pieces, the
service is fetched from the container, and it's returned from here in a callable
format.

Close both of the controller resolver classes and head back to `HttpKernel`. Let's
see what this final *$controller* looks like. After the `if`, `dd($controller)`.

[[[ code('c94fe2c04f') ]]]

Ok, move over... and refresh. That's it! The weird PHP callable syntax: an array
where the `0` index is an `ArticleController` *object*, and the `1` index is
the string `homepage`.

## Controllers: Boring Services

Go ahead and remove that `dd()`. So... this is *beautiful*. Our controller is
a *boring* service object: there's nothing special about it at all. Need to use
a service like the logger? No problem! In `ArticleController`, add another
argument to the constructor: `LoggerInterface $logger`. I'll hit Alt + Enter and
go to "Initialize Fields" to create that property and set it. To prove it's
working, let's say `$this->logger->info('Controller instantiated!')`.

[[[ code('725164dfb0') ]]]

Move over, refresh, click a link to open the profiler and go to the Logs section.
*Cool*. The first log is from our listener to `kernel.request`, then our controller
is instantiated and *then* it's executed.

So yea! Our controller is a *boring* service. Well, it *does* have that superpower
where you can autowire services into controller *methods* - but we'll learn how
that works in a few minutes.

I *do* have one more question, though. The controller is full of shortcut methods
like `$this->render()`. How does that work? We never injected the `twig` service...
so how is our "boring, normal service" using something that we didn't inject? How
is it getting the `twig` service?

Let's dig into that mystery next!
