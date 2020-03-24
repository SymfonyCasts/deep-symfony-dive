# The Critical kernel.exception Event Listeners

Coming soon...

Let me close a couple of classes
here and go back to `HttpKernel`.

So if we go back to the

profiler, if we go back to our page and click on the profiler and click on events.
This time, this was a four Oh four page. So kernel dot exception is on the main
page. As I mentioned earlier, the most important one here is actually, um, this,
that's fine. So if we go back here and refresh this page, get our normal not found
page and I'll click anywhere down here to get to the profiler and go to events. And
this time, because this was a 404 page, the current of that exception was thrown. So
you can see down here. Now as I mentioned, the most important one here is actually
`Errorlistener`. That's the most important listener.

So I'm going to go over and hit Shift + Shift and open `ErrorListener.php`. Want the
one from `http-kernel/`, not `console/` that handles console EHRs. And let's look
down here
for the uh, `getSubscribedEvents()` method. All right, cool and interesting. Check
this
out. It actually listens to `KernelEvents::CONTROLLER_ARGUMENTS`. More importantly,
listens to
`KernelEvents::EXCEPTION` and it listens on it twice. It listens on
`logKernelException()`
and `onKernelException()` minus negative 28. So the `logKernelException()` is going
to be
called first. And then `onKernelException()` it's going to be called second. The
`logKernelException()`. That's up here on top is very simple. It's job is to log that
an
exception was thrown. So if you followed this log exception logic down here, it
basically uses the logger, uh, and then based on the status code logs, either a
critical air or critical level air or a slightly labral level or slightly lower air
level. So it's a 500 it's critical. If it's lower then it's an error. And we're going
to talk about how the uh, how the exception gets the status code here in a second.

The other method `onKernelException()`, this is actually what's responsible for
rendering the error page. Whether that error page be the nice development error page
or
your production error page. And it's got a priority of negative 128 because that
makes it very easy for you if you want to to register your own listener on
`kernel.exception`
So if you want to do something different, you can register your
own listener, set the response and because your listener will be called first. And
because when you set the response that stops propagation, the `onKernelException()`
method won't be called, let's check out what happens inside that method. So on
criminal exception, let's see here. So first thing it does, you can see it's
referencing some property called `$this->controller`. Let's actually check out what
that
is. I'm going to go down here, `dd($this->controller)` and spin back over here and
make sure you're on a four four page refresh and huh.

Okay, interesting. It's a string `error_controller`. If you find your terminal run

```terminal
php bin/console debug:container error_controller
```

you're going to find out that `error_controller`
is actually a service. So your renders Error or exception pages from a given flatten
exception and it's class is something called `ErrorController`. So let's go over
here.
I'm gonna hit Shift + Shift and type `ErrorController.php` and open up that one and
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
kind of what's happening here. And check this out. An `ErrorController` in
`ErrorListener`,
let me take out that `dd()` this is fascinating. So look, it takes the request, which
is
passes an argument to this method. Oh no. Is that all right? It says,
`$request = $this->duplicateRequest()` and it passes the `$exception` and the
original request, I'm
gonna hold command or control and jump down to that and check this out here. The
`Request` object has a `duplicate()` method on it, which does exactly what you think.
It
creates a request that looks uh, exactly like the original request, but you can see
here that in the third argument here are the requests attributes. So it's basically
the same duplicate the request, but I want no query parameters, no request
parameters, which are post parameters. But I want to, and I want to pass in
specifically the attributes is chaff and for one of the attributes, it's
setting `_controller` to that `error_controller` string.

Okay, so let's actually go back up here again to our `onKernelException()`. So we now
have
a `Request` object which has a request attributes `_controller` had the error
listener
and down here, check this out. It says `$event->getKernel->handle()`. It's using the
`HttpKernel::handle()` method. This same one that we're using an `index.php`.
It's actually handling a second request and getting back the response. And notice
here there's something called a sub request. Where does that more about sub requests
in a few minutes. But right now, what I want you to understand is that this is a very
fancy way of calling the `error_controller` controller. Not by calling it directly,
but
by creating a request setting the `_controller` attribute to that value and handling
it
by the `HttpKernel`

Would, yes, it means that all I all, I thought about that. So next, let's look into
`error_controllers` specifically and figure out what this thing does to actually
render
the error.
