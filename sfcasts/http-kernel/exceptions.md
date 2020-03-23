# Exceptions

Coming soon...

We've now walked through the happy path. We know how a successful request goes all
the way through the response process, but in `index.php`, this `$kernel->handle()` call

basically me basically is this `handle()` function inside `HttpKernel`. Immediately
our entire application is wrapped in a try catch block. So basically if an exception
is thrown from anywhere, we're going to hit this catch here and as you can see, this
catch `$catch` argument is sets a true by default. So we're not going to hit this a
catch block here. Basically if an exception is thrown anywhere in our code, we are
going to go to `$this->handleThrowable()` method. And it's an interesting
situation because no matter what in your application, like if your database is down
or you have some horrible bugs somewhere, ultimately you need to return a response to
your user even if that's a picture of your servers on fire. So simply somehow needs
to convert your `Exception` into a `Response` and that's the job of `handleThrowable()`
So hold command or control and click that to jump down to this method and
surprise. What does `handleThrowable()` will do. It dispatches another event called the
`ExceptionEvent`. Let's flip over here and I'll refresh the page. I'll go into a
profiler. Now, in this case, if we click on events, this page didn't have an
exception, so that event actually wasn't dispatched, but we can click on not called
listeners

and go down here and there we go. I want right past it, `kernel.exception`. You
can see that there are about five different listeners to those.

The most important one is this `ErrorListener`, which we're going to look at in the
section second, but check this out. Look at `RouterListener`. That's the same class we
looked at earlier. It is a listener on on `kernel.exception` and it's not really a
super important feature, but it's a fascinating look at the complexity of how the
features work inside Symfony. So let's check out that class. I'll hit shift shift, go
to `RouterListener.php`, and let's see here. Look down here. I'm looking for the
`getSubscribedEvents()` method. So yeah, you can see it. Let's just do 
`KernelEvents::EXCEPTION` `onKernelException()` with a priority of negative 64 which means that it
happens fairly late compared to other listeners.

Well, let's look for this `onKernelException()` events right here and interesting. So
let me tell you what this does and then we'll look at it in more detail. This is
actually the code that's responsible for rendering the Symfony five welcome page.
When you start a brand new project that has no routes, that's actually what this
`createWelcomeResponse()` does. Down here, it actually renders a little PHP template.
I'll hit shift shift and open that up real quick. Little PHP tumble that says welcome
to Symfony and it has a bunch of information about documentation. So if you start a
new Symfony, five projects today, this is the first page that you're going to see.
What's really interesting is how this works.

So you can see here it looks for something, uh, it looks and checks to see. So if you
look back at `HttpKernel`, one of the exception event is past the actual
exception. And that makes sense. So any listeners to this event can actually look and
see what exception was thrown in router listener. It looks to see if the exception
that was thrown is an instance of `NotFoundHttpException`, which by the way is the
exact type type of exception that we throw in a controller when we want a 404
page file command or control to click `createnotFoundException()` look 
`NotFoundHttpException`. So we don't know exactly why yet, but this is the exception that you
can throw anywhere to create a 404 page but more on that in a second.
Anyways, this looks to check to see if the event is a `NotFoundHttpException`.
And then it looks to see if the previous exception, cause sometimes exceptions can
have a embedded exception is an instance of something called 
`NoConfigurationException`. And if so it renders the lock and response.

So what happens here is that the router itself, if the router itself has a route not
found and it detects that there are no other routes internally, it throws this
`NoConfigurationException`. And this actually happens up here. If you scroll up a little
bit, this is the `onKernelRequest()` method that we looked at earlier. This is the
code that actually runs the router specific. So specifically the mass request of the
`match()` method. Those are the methods that are going to throw that `NoConfigurationException`
If a route can't be matched because there aren't no routes in the system,
the `NoConfigurationException` extends `ResourceNotFoundException`.
That's important because notice this entire thing here is wrapped in a try catch
block and it's catching `ResourceNotFoundException`. So in general, if the router
can't find something, it throws a `ResourceNotFoundException`, but there's a
special case where if it can't find the route and there are no routes, it throws a
subclass of that called `NoConfigurationException`. So you can see here it's going to
catch the `NoConfigurationException` and that throws a new `NotFoundHttpException`
and it puts the previous exception on eat. So basically, so at this point, the
`NotFoundHttpException` is actually what's thrown

that's ultimately caught by the tri catch and eight to be kernel and the exception
event is dispatched with that `NotFoundHttpException`. Then `RouterListener` listens
to that exception. And if it's a `NotFoundHttpException` and previous exception is 
`NoConfigurationException`, it renders the welcome page. How about that? For different parts of
the system working together, we can actually see this in action. If you go to our
`ArticleController`, you can actually fake this in here, we're throwing a `NotFoundHttpException`
so there's not a real reason to do this, but we can kind of fake the what
the router does when there are no routes in our system. So the first argument here is
just a message. I'll keep that blank. And here, let's throw a previous exception.
Let's sort of the previous exception as new `NoConfigurationException`. All right, so
if we move over now I'll click back to go to a real article page. The real article
page still works, but we changed that to a article that doesn't work. Boom, welcome
to the Symfony Bible welcome page, which we just trick the system into showing pretty
cool.

so I'll go back here and remove that code. Now, one interesting thing here is that in
`HttpKernel`, what Symfony ultimately wants is a `Response`. It wants somebody to set the
response on this event. You can see down here it actually says mentioned, says
`$response = $event->getResponse()`. So if we look at that `ExceptionEvent`, it's
similar to the `RequestEvent` that we saw earlier, similar to the very, very first
event that's thrown inside Symfony. Actually, let me scroll up here. Remember in
handle raw, the very first event it's ever thrown in Symfonys or `RequestEvent` and
listeners to that event are able to set a response on it if they want to. This is the
exact same situation down here on `handleThrowable()` listen to this, can set a
response on the event. And the reason that if you look at the `ExceptionEvent`, you
won't actually see that code inside of this class because it's actually in the base
class. So I'm going to hold command or control to open this `RequestEvent`. And if you
scroll down here, here's how you do it. `setResponse()`. And we saw that in 
`RouterListener` `$event->setResponse()`, and then `$this->createWelcomeResponse()` for that
welcome page.

So the key thing on that I want you to notice is that when somebody sets a response
internally, the event class calls a `stopPropagation()`, which if I hold command open,
that goes to another class. And that sets a little flag called `propagationStopped`.
So internally, what's going to happen is if you have, if you have multiple listeners
to the `ExceptionEvent`, and one of them sets the response, the other listeners won't
be called. So it's basically the first listener to set a response on this is going to
win and the other ones won't be called afterwards. Let me close a couple of classes
here and go back to `HttpKernel`.

So if we go back to the

profiler, if we go back to our page and click on the profiler and click on events.
This time, this was a four Oh four page. So Colonel dot exception is on the main
page. As I mentioned earlier, the most important one here is actually, um, this,
that's fine. So if we go back here and refresh this page, get our normal not found
page and I'll click anywhere down here to get to the profiler and go to events. And
this time, because this was a 404 page, the current of that exception was thrown. So
you can see down here. Now as I mentioned, the most important one here is actually
`Errorlistener`. That's the most important listener.

So I'm going to go over and hit shift shift and open `ErrorListener.php`. Want the
one from `http-kernel/`, not `console/` that handles console EHRs. And let's look down here
for the uh, `getSubscribedEvents()` method. All right, cool and interesting. Check this
out. It actually listens to `KernelEvents::CONTROLLER_ARGUMENTS`. More importantly, listens to
`KernelEvents::EXCEPTION` and it listens on it twice. It listens on `logKernelException()`
and `onKernelException()` minus negative 28. So the `logKernelException()` is going to be
called first. And then `onKernelException()` it's going to be called second. The 
`logKernelException()`. That's up here on top is very simple. It's job is to log that an
exception was thrown. So if you followed this log exception logic down here, it
basically uses the logger, uh, and then based on the status code logs, either a
critical air or critical level air or a slightly labral level or slightly lower air
level. So it's a 500 it's critical. If it's lower then it's an error. And we're going
to talk about how the uh, how the exception gets the status code here in a second.

The other method `onKernelException()`, this is actually what's responsible for
rendering the error page. Whether that error page be the nice development error page or
your production error page. And it's got a priority of negative 128 because that
makes it very easy for you if you want to to register your own listener on `kernel.exception`
So if you want to do something different, you can register your
own listener, set the response and because your listener will be called first. And
because when you set the response that stops propagation, the `onKernelException()`
method won't be called, let's check out what happens inside that method. So on
criminal exception, let's see here. So first thing it does, you can see it's
referencing some property called `$this->controller`. Let's actually check out what that
is. I'm going to go down here, `dd($this->controller)` and spin back over here and
make sure you're on a four four page refresh and huh.

Okay, interesting. It's a string `error_controller`. If you find your terminal run 

```terminal
php bin/console debug:container error_controller
```

you're going to find out that `error_controller`
is actually a service. So your renders Error or exception pages from a given flatten
exception and it's class is something called `ErrorController`. So let's go over here.
I'm gonna hit shift shift and type `ErrorController.php` and open up that one and
check this out here. It has `__invoke()` method. This is important. This is
an in vocable controller. We talked a little about it, about it earlier. Usually
controllers have the format of `class_name::method_name`. But really it
wasn't ever the class name, colon called method name. It was the service ID ::
 method name. It's just that for our controllers, our class name usually matches
our service name.

So it kind of looks the same, but in some cases you don't have to have. But if your
controller is an invulnerable controller, meaning it has `__invoke` and folk
method, you didn't need the con :: syntax. You just needed the service ID.
That's enough for Symfony to know that it should use, uh, your con. It should, it
should, uh, execute your controller using the `__invoke()` method. So that is
kind of what's happening here. And check this out. An `ErrorController` in `ErrorListener`,
let me take out that `dd()` this is fascinating. So look, it takes the request, which is
passes an argument to this method. Oh no. Is that all right? It says, 
`$request = $this->duplicateRequest()` and it passes the `$exception` and the original request, I'm
gonna hold command or control and jump down to that and check this out here. The
`Request` object has a `duplicate()` method on it, which does exactly what you think. It
creates a request that looks uh, exactly like the original request, but you can see
here that in the third argument here are the requests attributes. So it's basically
the same duplicate the request, but I want no query parameters, no request
parameters, which are post parameters. But I want to, and I want to pass in
specifically the attributes is chaff and for one of the attributes, it's
setting `_controller` to that `error_controller` string.

Okay, so let's actually go back up here again to our `onKernelException()`. So we now have
a `Request` object which has a request attributes `_controller` had the error listener
and down here, check this out. It says `$event->getKernel->handle()`. It's using the
`HttpKernel::handle()` method. This same one that we're using an `index.php`.
It's actually handling a second request and getting back the response. And notice
here there's something called a sub request. Where does that more about sub requests
in a few minutes. But right now, what I want you to understand is that this is a very
fancy way of calling the `error_controller` controller. Not by calling it directly, but
by creating a request setting the `_controller` attribute to that value and handling it
by the `HttpKernel`

Would, yes, it means that all I all, I thought about that. So next, let's look into
`error_controllers` specifically and figure out what this thing does to actually render
the error.

