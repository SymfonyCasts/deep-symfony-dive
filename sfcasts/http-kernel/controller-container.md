# How does the Controller Access the Container?

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
