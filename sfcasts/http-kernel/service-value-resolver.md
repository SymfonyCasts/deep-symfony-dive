# How Service Autowiring Works in a Controller Method

Coming soon...

want to talk about, which is `ServiceValueResolver`. And this one is pretty awesome.
So first `supports()` is called, and actually before we even look at this, I'm going to
`dd()` the `$argument` right here. We've over refresh. There we go. So you can see that this
one, the first time that this one is called is actually for the second argument cause
the first argument is immediately returned by the `RequestAttributeValueResolver`. So the
`SlackClient` is the first one where it `supports()` is called for it. And check this out,
we have the name `slack` and we have the type `App\Service\SlackClient`.

So if you look at the logic here, the first thing that does actually goes and gets
the controller goes and gets the `_controller` value, the value that was put there by
the routing. So for us that's that class name, `::` method name Sendak's down
here it has some normalization for some edge cases, but ultimately controller here is
going to be set to the a is going to be the class name of our controller. And then
down here it's really interesting it says if not `$this->container->hasController()`.

Hmm.

So it's seemingly grabbing the our controller out of that container. There's actually
a lot more going on here. Then just that before the return, I'm going to `dd()` `$controller`
and also `dd()` `$this->container` so we can see what that looks like.

Go over and refresh. All right. First thing I want to see is that the controller is
the full class name :: and method named syntax. Now the second thing I
want you to notice is that `$this->container`, this is not the main Symfony
container. This is once again one of those smaller containers called service
locators. You can see it, um, it's a service locator and the details of this class
aren't that important. But if you open up the service map here, check it out. Inside
of this fake container, there are 34 services. Every service is actually, um, uh,
referring to [inaudible] as one service for every single controller in our entire
system

ever before.

But let me show you something else to really make sense of this. So I'm going to `dd()`
one more thing would be the, `$this->container->get()` and pass it the `$controller`. So
that's exactly what eventually it does. Down here. `$this->controller->get()`, uh,
passes at the `$controller`. So now refresh over here, check this out. The last thing
here, when we say `$this->container->get($controller)`, it gives us back another
container. And if we look at the service map here, the two things inside of that are
`articleRepository` and `slack`, which correspond to the two arguments that we have,
`$articleRepository` and `$slack`, the service arguments that we have on that controller.
So in reality, in reality, inside of `ServiceValueResolver`, `$this->container` is
basically a big array of small service containers. One service container for every
single controller in our system. In each of those containers contains all of the
services that are, uh, type hinted for that specific method.

And that allows us down here to ultimately return. Let's go down here. If I go all
the way back down to the end of the method, there's some normalization that happens,
but ultimately it yields  `$this->container->getController()`. So this returns
that kind of mini container just for that controller method `->get($argument->getName())`
and that's going to go and get these service that corresponds to this Slack or this
article repository service. So is there a container is a big container full of many
containers and inside each mini container contains all of the services needed for all
of the arguments that are type handed with it. How crazy is that? Now all of that
logic, all the logic to build this container of containers is done when your cache is
built and the key behind this working is inside of your `config/services.yaml` file.

Have you ever wondered why the controller was specific to `controller/` directory? He
specifically has its own import. The reason is this tag because really if we remove
this import here, the controller classes are already being registered as a service up
here. The only reason they're re-registered down here is to give them this tech. When
Symfony's container is booting, it looks for all of the all services that have this
tech and then looks at all of their public methods and auto wires uses auto wiring to
figure out all the arguments to all of those methods. And uses all of that to create
the final container of containers that's inside of a `ServiceValueResolver` through
this was the key innovation in Symfony 3.4 that allowed us to use auto wiring in our
controller, but it only works inside of our controller.

All right, so let's go back to `ServiceValueResolver` and back up here. Let me take
out this `dd()`. So that's basically it. You can, uh, if your argument matches the curly
brace wild card, then that can be an argument. And actually now that we understand
these wild cards go into the attributes. If you open `config/routes.yaml` in this
particular, uh, fake here, it would be totally valid to have a totally inventing this
default argument on my controller because this value on under, under defaults would
go into the request attributes. And then I'd be able to reference this as an
argument. But basically you can use the wild cards, you can type in services. And
then there's a couple of special things like the request class and the session class
and the user interface. But this still doesn't explain one thing.

It doesn't explain how, if I open an `ArticleAdminController` and go down to the
`edit()`, it doesn't explain how I can type into an entity and have something
automatically query for it. I'll actually explain how that works later. It uses a bit
of an older system inside of Symfony to make that happen, but technically this right
now is not done by a `ServiceArgumentResolver`. Alright, next, let's con, let's go
back to `HttpKernel`. We, now that we have our arguments, let's trace through what
happens in this method and actually we're going to get to the end of it. Most of the
work is behind us.
