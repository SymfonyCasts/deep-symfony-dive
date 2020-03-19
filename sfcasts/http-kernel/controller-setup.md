# Who Creates the Controller & Gives it the Container?

and it passes
that controller. So let's trace this down here. `createController()` is also inside of
here. Here we go. protected function `createController()`. So we're past the string
controller. It needs a transformer. So the first thing it does is it checks to see if
the a string does not have a :: it in the middle. If it does not have a
:: we are actually seeing here is an invoke double controller. This is
something that some people are doing in the Symfony world where your controller class
has an `__invoke()` method. And then when you set up your routing, your routing
string is literally just the controller class. You don't need to have a method name.
This is actually not so different from the case we're at right now is there's just no
method named part and so it goes and calls and stand J controller on it immediately.
We're going to look at that method in a second, but since we do have a controller, I
:: in the middle of ours. It explodes those and separates them into the
class and the method.

Then ultimately down here it puts the controller into a callable Caldwell syntax,
which is an array where the first item here is going to be an object. And the second
Igon item is going to be these string method to get the object, it passes the class
to an instantiate controller, a method. So quite literally it's going to need, this
method is responsible for taking the controller class and turning it into an object.
This method is overwritten in the child class. So let's go back to `ContainerControllerResolver`
and look at create, `instantiateController()`. Awesome. So check out. It checks
to see if the class is in the container and if it is, it fetches it from the
container and returns it.

This is what's happening. In our case, our controller is a service, in fact, pretty
much everything in the source directory as a service. Thanks to the
`config/services.yaml` file. Thanks to this import right here. Everything in the
`App\Controller\` directory is a service, so it is fetching it from a service. This works
because the class name of our controllers matches this service ID, so there literally
is a service and the container whose ID is `App\Controller\ArticleController`. It
also works because the controller services are public. They're the only services in
the container at this point that are always public. You don't really see this in
`services.yaml`, but this tag here, I'm going to talk more about what this tag does,
but one of the things it does is it makes sure that all the services inside the
`Controller/` directory are public so that they can be fetched out of the container
right here.

So this is the situation we fall in. If for some reason the art classes not inside
the container, then it calls `instantiateController()`, which is basically cause
`parent::instantiateController()`, which is basically a fancy way of just instantiate in the
class with no arguments. But at this point that's basically legacy. So this is all a
long way of saying, if we kind of trace this back up here, in our case it get our
controller string right here. It's split into two pieces. We fetched the service out
of the container and ultimately it's returned as a callable format. So controller is
all returns callable. I'm actually going to close `ControllerResolver`, both
controllers solvers and back in `HttpKernel` on what we have here is a controller. Now
in our case, we'll be in a call before Matt. In fact, let me show you that. Let's
`dd($controller)` after we've gotten a controller to go over and refresh, I'm going to have
this string is now in an array. Zero index is an `ArticleController` object. And the
first thing is this, the string `homepage`. So I'll go and remove that `dd()`. So this is
beautiful. Our controller is a boring service object. There's nothing special about
it at all. It's a service just like everything else in our application and that's why
if we want to, we could go do a constructor of a service and we could autowire
services out of there cause that's just normal auto wiring. I'll hit Alt + Enter and
go to initialize fields to create that property and set it and just to prove it's
working. I'll say `$this->lager->info('Controller instantiated!')`.

So if we go over it now refresh, I'll click any of the icons down here to go into my
profiler. Click on logs and cool. This is getting really, really kind of fun. Now we
have the user agent log, which is coming from our subscriber to the kernel, that
request event. Then you can see our current controller is instantiated and then later
our controller is actually executed. Pretty cool. But if our controller is just a
boring service, it doesn't explain one thing specifically. This controller's full of
these shortcut methods like `$this->render()`. How does that work? I'm going to command or
control it and click that `render()` function. The render function calls another method
called `renderView()`. That's actually right above and check this out. When we call
render it calls render view, it fetches twig out of the container. So hold on a
second.

How did our controller service get access to the container? Because it's not like we
are injecting the container via auto wiring or something like that. So how is it
doing this? To make matters more interesting, if you search for parameter parameter
bag inside of here, one of the other circle methods is called gate parameter. This
parameter bag service you spend over to your terminal and run

```terminal
php bin/console debug:container parameter_bag
```

It's public false. It's not a service that you should be
able to fetch out of the container by saying this air container arrogant parameter
back. So what the heck is going on here? The answer is that because our controller
extends this `AbstractController`, `AbstractController` implements a special interface
called `ServiceSubscriberInterface`. This is actually something we talked about in
our, one of our doctrine tutorials. When you implement `ServiceSubscriberInterface`,
it forces you to have a method called `getSubscribedServices()` where you actually
return a big array that says which services you want inside of this class.

The end result of this is that you're past a mini container that contains all these
services. So if I go to the top here, see this `ContainerInterface`, that's not the
real container, that's a mini container which contains the things down here. That is
what allows us to fetch those things out of that mini container. This gives our
controller super powers and it also allows it to fetch these services at lazily. It's
not, it doesn't instantiate all these services, uh, until we actually ask for them.
The nice thing is this is not something special at the controller. This is something
that any service can implement in your system. So once again, our controller is just
a good old boring service. So next, we now know that we have a controller executable.
So let's keep tracing down this function to see what happens next, because one of the
big missing things right now is what arguments Symfony should pass when it calls our
controller function. That's next.
