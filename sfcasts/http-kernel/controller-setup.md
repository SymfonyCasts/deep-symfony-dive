# Who Creates the Controller & Gives it the Container?

In a Symfony app, this `$controller` variable is in the string format that comes
from the router - something like `App\Controller\ArticleController::homepage`.
This function - the `getController()` method of the `ControllerResolver` has one
simple job: it needs to *transform* that string into a PHP *callable*. To do that,
it calls `createController()`.

## Invokable Classes

Let's scroll down to find this method. Here it is:
`protected function createController()` with the string `$controller` argument.
The *first* thing it does is to *check* to see if the the controller does *not*
have a `::` in the middle. If it does *not* have a `::`, the controller is
actually an *invokable* class. This is a strategy for controllers that some people
in the Symfony world are using - it's especially popular in ApiPlatform. The idea
is that each controller class has only *one* controller method - called `__invoke()`,
which makes an instance of that object *callable* by PHP. If you use invokable
controllers, then your `$controller` string is *just* the class name part - there's
no method name needed.

How Symfony handles invokable controllers is actually *pretty* similar to how
it will handle *our* situation: we'll see that `instantiateController()` method
in a moment.

## Instantiating the Controller Object

Because our controller *does* have a `::` in the middle, it *explodes* the two
parts: everything before the `::` is assigned to a `$class` variable and everything
after is set to a `$method` variable. Then, inside the try-catch, it *puts* this
into a callable syntax, which is an array where the first item will be an object
and the second is the string method name. I know, PHP is weird: but this type of
syntax *is* callable.

Of course, on this line, `$class` is *still* just a string. To *instantiate* our
controller, it calls... well... `instantiateController()`!

What... does this class do? This method is *overridden* in the child class. Go
over to `ContainerControllerResolver` and find `instantiateController()`. Awesome!
It checks to see if the class is in the *container*. And if it is, it doesn't
instantiate the controller itself: it *fetches* it from the container and returns
it.

## How your Controller is Fetched from the Container

*This* is what's happening in our case: our controller is a *service*. In fact,
pretty much *everything* in the `src/` directory is a service... or at least,
is *eligible* to be a service - we'll go deeper into that in the next deep dive
tutorial. That's thanks to the `config/services.yaml` file. This section
auto-registers everything in the `src/Controller` directory as a service.

So... our controller is a service... and `ContainerControllerResolver` fetches
it from the container. But this *only* works because the class name of our
controllers *matches* the service id. So there is *literally* a service in the
container whose id is `App\Controller\ArticleController`. There's some teamwork
going on here: the annotation routes automatically set the controller string to
the *class* name... and because that's *also* the id of the service, we can fetch
it out without *any* extra config.

So the truth is, your controller syntax isn't *really* `ClassName::methodName`.
It's `ServiceId::methodName`. If your controller service had a *different*
id for some reason, that's ok! In that case, you would set your controller
to your *service* id `::` then method name in YAML. There's also a way to do this
in annotations.

Fetching your controller from the container *also* works because controller services
are *public*. Really, they're the *only* services that we create that are public.
If you look back at `services.yml`, it's not immediately obvious *why* they're
public - I don't see a `public: true` anywhere. I'll save the details for the
*next* deep-dive tutorial, but it happens thanks to this *tag*. *One* of the things
it does is make all of these services *public* so that the
`ContainerControllerResolver` can fetch them directly.

## The Old Way: Direct Instantiation

If, for *some* reason, your controller is *not* registered as a service, then it
calls `parent::instantiateController()`, which... could not be simpler: it says
`new $class()` and passes it *no* arguments. That's basically legacy at this
point - it's how controllers we created *prior* to Symfony 4.

## The Final Callable Controller Result

Scroll back up in `ControllerResolver` to `getController()`. This is all a
*long* way of saying that our controller string - this
`App\Controller\ArticleController::homepage` - is split into two pieces, the
service is fetched from the container, and it's returned from here in a callable
format.

Let's see this. Close both the controller resolver classes and head back to
`HttpKernel`. Let's see what this final *controller* looks like. After the `if`,
`dd($controller)`.

Ok, move over and refresh. That's it! The weird PHP callable syntax: an array
where the `0` index is an `ArticleController` *object*, and the `1` index is
the string `homepage`.

Go ahead and remove that `dd()`. So... this is *beautiful*. Our controller is
a *boring* service object: there's nothing special about it at all. Need to use
a service like the logger? No problem! In `ArticleController`, add another
argument to the constructor: `LoggerInterface $logger`. I'll hit Alt + Enter and
go to "Initialize fields" to create that property and set it. And just to prove
it's working, in `homepage`, let's say
`$this->logger->info('Controller instantiated!')`.

Move over, refresh click a link to open the profiler, and go to the Logs section.
*Cool*. The first log is from our listener to `kernel.request`, then our controller
is instantiated and *then* it's executed.

So yea! Our controller is a *boring* service. Well, it *does* have that superpower
where you can autowire services into controller *methods* - but we'll learn how
that works in a few minutes.

I *do* have one more question, though. The controller is full of shortcut methods
like `$this->render()`. How does that work? We never injected the `twig` service...
so how is our boring, normal service using something that we didn't inject? How
is it getting the `twig` service?

Let's dig into this mystery next!
