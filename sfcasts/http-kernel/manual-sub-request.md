# Manually Making a Sub Request


To understand more about sub requests, let's create one by hand! Because, it's
not super obvious *what* these two Twig functions are *really* doing
behind-the-scenes.

Insides our homepage controller, let's execute a sub request right here. How?
It's simpler than you might think. Step 1: create a new request object
`$request = new Request()`. At this point, this is an empty `Request` object: it
basically has nothing on it. It's not like the `Request::createFromGlobals()`
method that we saw earlier. *That* method pre-populates the object with all the
current request information. This does *not* do that. It's just an empty `Request`
object. To render the partial controller, set the request attribute:
`$request->attributes->set('_controller')` and set that to the same string we
have inside our Twig template. I'll copy that... and paste it here:
`'App\\Controller\\PartialController::trendingQuotes'`.

We now have a `Request` object with nothing in it except for that `_controller`
attribute. And that's all we need. Well, to work around some internal validation
that checks for a valid IP address, we *also* need to say
`$request->server->set('REMOTE_ADDR', '127.0.0.1')`.

To send this into `HttpKernel`, we can fetch that *service*. Add another argument:
`HttpKernelInterface $httpKernel`. Then, down here, we can say
`$response = $httpKernel->handle()`. We're going to pass this *two* arguments. We
already know from `index.php` that the first argument is the `Request`. So, pass
`$request`. But there is *also* an optional second argument: the request "type".
This allows you to pass a flag that indicates if this is a "master" request -
that's the default - or if this is a sub-request - some request that is *not*
the main one. That's our situation, so pass: `HttpKernelInterface::SUB_REQUEST`.

What difference will that make? Not much. But listeners to pretty much *every*
event we've seen are *passed* this flag on the event object and can behave
*differently* based on whether or not a master or sub request is being handled.
We'll see that in a few minutes.

To see if this works, `dump($response)`. Um... ok! Let's try this! This is the
homepage... so refresh. Everything looks normal on this *main* request, but hover
over the target icon on the web debug toolbar. There is it! You can see the content
inside.

And, yes, if we click the time icon on the web debug toolbar to get to the
performance section of the profiler, we can see our sub request! Heck, now
we have *two* sub requests: our "manual" sub-request and then the one from
the template.

Set the threshold back down to 0 milliseconds. *Way* down on the main profiler,
the sub-request shows up as this strange `__section__.child` thing.

Go back to the homepage controller and comment out the sub request logic. I wanted
you to see that this is *all* that's *really* happening with a sub request.

## Listeners and the isMasterRequest() Flag

As we talked about, many listeners will use this `SUB_REQUEST` flag to *change*
their behavior. Because, sometimes, it only really makes sense for a listener
to do its work on the main, *master* request. For example - if you wrote a custom
listener that checked the URL and denied access based on some custom logic, that
listener only needs to *do* that check on the *main* request. It either denies
access or allows access and then the rest of the page should render normally.

Our `UserAgentSubscriber` is a perfect example of that. It makes no sense to read
the `User-Agent` off of a sub request. It might work - because, in reality, sub-requests
copy *some* of the data from the main request, but trying to read real information
off of the request in a sub-request is asking for trouble. I *really* want you to
think of the master and sub requests as *totally* independent objects.

So, what can we do? At the very top of our listener, if *not*
`$event->isMasterRequest()`, simply return.

The `isMasterRequest()` method is a shortcut to check the flag that was originally
passed to `Kernel::handle()`. Our listener *will* still be called on a sub-request,
but now it will do *nothing*. And that makes sense: right now this class is doing
*nothing* more than logging the `User-Agent`. We didn't realize it before, but
thanks to our sub-request, each page refresh was logging the `User-Agent` *twice*.

Ok, but! We still haven't fixed our original problem: when we add the `?mac=false`,
this is *correctly* read on the master request but *incorrectly* on the sub request.
That's because we're trying to read that query parameter from *inside* the sub
request... which doesn't work.

How can we fix that? The answer uses an old friend of ours and will also touch on
the proper way to pass data from the main request to the sub-request if you want
to use HTTP caching. That's next.
