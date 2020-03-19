# How does the Controller Access the Container?

Our controller is a *beautiful*, boring service. I *love* boring things. This
means that, if we need to access some *other* service from here, we need to "inject"
it - either through the constructor *or* by autowiring it as an argument to the
controller method - a special superpower of controllers that we'll talk about soon.

The point is: we can't just "grab" a service out of thin air that we haven't
injected.... which is why *I'm* wondering: how the heck does this `render()`
shortcut method work? *Certainly* that uses the `twig` service... but we have
*not* injected that into our class

Let's go digging! Hold command or control and click `render()` to jump into
our parent class: `AbstractController`. This method basically just calls
`renderView()`, which is right above us.

Hmm: `renderView()` apparently fetches the `twig` service directly from the
container. But, hold on a second. How did our controller service get access to
the container? Because, it's not like we're injecting it via autowiring or any
other way. So... *who* is populating the `$this->container` property?

Oh, but it's even *more* mysterious than this. Search for `parameter_bag` in
`AbstractController` to find a method called `getParameter()`. This method fetches
a service directly from the container called `parameter_bag`.

Let's get some info on this service. Find your terminal and run:

```terminal
php bin/console debug:container parameter_bag
```

Woh. It's public *false*! This is *not* a service that you should be able to
fetch out of the container directly by saying `$this->container->get('parameter_bag')`.
It should give us an error! So what the heck is going on?

## Service Subscriber Magic

Here's the answer: our controller extends `AbstractController`. And
`AbstractController` implements a special interface called
`ServiceSubscriberInterface`. This is actually something we talk about in
one of our
[Doctrine tutorials](https://symfonycasts.com/screencast/symfony-doctrine/service-subscriber).

When you implement `ServiceSubscriberInterface`, it forces you to have a method
called `getSubscribedServices()` where you return an array that says *which*
services you need inside of this class. Then, Symfony will pass you a "mini"
container that *holds* all of these services.

At the top of `AbstractController`, see this `setContainer()` method with a
`ContainerInterface` type-hint? That will *not* be the real container. Nope, that
will be the "mini-container" that holds all the services from our `getSubscribedServices()`
method. And because our controller is an autowired service... and this method has
`@required` above it, Symfony knows to call `setContainer()` immediately after
instantiating this object.

*This* is what gives our controller the ability to fetch all those services that
*we* didn't inject directly. It also fetches them *lazily*: none of the services
are instantiated *unless* we need to use them.

So... our controller is not *just* a boring, normal service: it has this extra
superpower. But... this is actually something that... *any* service in our system
can implement - it's not special to controllers. So once again, our controller
*is* beautifully boring and normal.

Next: we *now* have a callable controller! Let's keep going through `HttpKernel`
to see what happens next. Because... one *big* thing we're still missing is what
*arguments* we should pass to the controller.
