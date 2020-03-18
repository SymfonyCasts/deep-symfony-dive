# Controller Resolver

Coming soon...

After the `RequestEvent` is dispatched, check this out. It immediately checks if event
has response and if it does, it returns that response. It calls `$this->filterResponse()`
method. We're going to look at, look at that in a few minutes, but that doesn't do
anything important. Basically, if the event, this request event has a response, it
returns it immediately and doesn't do anything else, doesn't render our controller or
doesn't do anything else. So it's cool I listener to `RequestEvent` can. If, if a
listener to `RequestEvent` somehow already has enough information to return an event? response,
it can do that. It's not very common, but it's totally possible. In fact, let's do it
with ours. So `src/EventListener/UserAgentSubscriber`, we can say `$event->setResponse()`
Not all event classes have you `setResponse()`, but this `RequestEvent`, does it say 
here? I'll say new response, the one from `HttpFoundation`

and I'll just put a `Response` right there. It's now the event. We'll have a response.
So when we go over and refresh any page, we get that response. All right. So let's go
over and I will remove that. Okay. And then close a couple of files. Okay, so back in
HB journals. So far, all we've done is dispatch one event and the router listener ran
on that event, which modified the request attributes. So let's keep following this
down. This next line, interesting. Says `$controller = $this->resolver->getController()`.
This resolver thing here is called a controller resolver. In a high level. It's
really cool. We know that we're eventually going to need to execute a controller, a
PHP callable that will build the response. This class is entirely responsible for
doing that. We pass it the request, and somehow it gives us back a controller, uh,
callable.

So let's check that out. So how do we figure out what class this resolver is? Well,
the easiest thing to do is you could just `dd($this->resolver)` and you'd find out that
this is an instance of this `TraceableControllerResolver`. And then you could dive in and kind
of see what the actual instance is right there. So it's 
`Symfony\Bundle\FrameworkBundle\Controller\ControllerResolver`. It's wrapped for dev mode. Uh, another way,
just because this is an advanced course, is that the resolver here is one of the
arguments to the constructor on top. There it is. Looks like its argument too. We can
see the interface there, but to find out what the concrete class of that is, let me
scroll back down here. I'm going to go over my terminal and run 

```terminal
php bin/console debug:container http_kernel --show-arguments
```

That's the name of the ACE to be kernel service `--show-arguments`.

that show me that. The second argument is this `debug.controller_resolver`. So
let's run that command again, this get information about that particular service 

```terminal-silent
php bin/console debug:container debug.controller_resolver --show-arguments
```

and this is that traceable controller resolver, which is actually just a decorator around
the real control resolver. This is using service decorations, something we'll talk
about our next deep dive course that more, but in reality it's this `debug.controller_resolver.inner`
which is the real service that a decorates. So I can rerun that
same command looking for `debug.controller_resolver.inner`, 

```terminal-silent
php bin/console debug:container debug.controller_resolver.inner --show-arguments
```

and here it is. Finally we find out that this `ControllerResolver` is this 
`Symfony\Bundle\FrameworkBundle\Controller\ControllerResolver`. So let's open that up and see what
it looks like. So I'm hitting shift shift and look for `ControllerResolver` and
include it. Non project items and let's put that PHP on the end. Now notice there's
two of them. There's one from `FrameworkBundle` and one from `HttpKernel`, the one
from `FrameworkBundle` actually the one that is but can. But in reality, the
`FrameworkBundle` one extends another one called `ContainerControllerResolver`, and
that extends this `ControllerResolver`. And the one from `FrameworkBundle` doesn't
have anything important that we need to look at. So I'm actually gonna open

the `ContainerControllerResolver` first and then I'm going to shift shift and go back
and open up the controller resolver. Actually scratch that. What I can do is you can
just see it right here. The control resolver is the base class. It lives in the same,
Oh isn't the same directory. So there's no use statement for it, but I'll command
then perfect. It pops right in there. So we're gonna look at these two classes right
here. This is the subclass and this is the parent class. So in `HttpKernel` it was
calling the method `getController()`. So let's just go see what that looks like. So 
`getController()`, pass the `Request` and checking out. The first thing it does is it fetches
the `_controller` attribute. So why is that? Why is `_controller` the string that we're
supposed to use in our routing files? Why is `_controller` the magic string? Because of
this line right here, because the controlling resolver looks for `_controller`.

Now ultimately it wants this controller to be a callable for us. That's going to be a
method inside of an object, but it can also be a number of things including even a,
an anonymous function, which was what was used by Silex. Let's see what our
controller looks like at this point. So I'm going to `dd($controller)` right after that.
If statements run over, refresh any page and okay, so right now we have these string
format where we have the class name :: and then the method name. All
right, so I'll remove the `dd()` and let's actually trace this through. So down here you
have a bunch of if statements trying to see whether or not the controller's already
inside a already a call before mass. So it's checking to see if it's an array and if
it has a zero element and one element because that's considered a call before Matt,
we are not in a array, we are not already a callable. We're not an object, we're not
a function.

So ultimately we fall down here into `$callable = $this->createController()` and it passes
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

