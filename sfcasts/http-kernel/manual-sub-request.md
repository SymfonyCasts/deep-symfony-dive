# Manually Making a Sub Request

To understand more about sub requests, let's create one by hand! Because, it's
not super obvious *what* these two Twig functions are *really* doing
behind-the-scenes.

Insides our homepage controller, let's execute a sub request right here. How?
It's simpler than you might think. Step 1: create a new request object:
`$request = new Request()`. This is a totally empty `Request` object: it
basically has nothing in it. 

[[[ code('65d47e64e8') ]]]

It's not like the `Request::createFromGlobals()`
method that we saw earlier. *That* method pre-populates the object with all the
current request information. This does *not* do that. To render the partial
controller, set the request attribute: `$request->attributes->set('_controller')`
and set that to the same string we have inside our Twig template. I'll copy
that... and paste it here:
`'App\\Controller\\PartialController::trendingQuotes'`.

[[[ code('0ef8eab973') ]]]

We now have a `Request` object with nothing in it except for an `_controller`
attribute. And... that's all we need! Well, to work around some internal validation
that checks for a valid IP address, we *also* need to say
`$request->server->set('REMOTE_ADDR', '127.0.0.1')`.

[[[ code('50e1fac205') ]]]

To send this into `HttpKernel`, we can fetch that *service*. Yes, even the mighty
`HttpKernel` is a service in the container. Add another argument:
`HttpKernelInterface $httpKernel`. Then, down here, we can say
`$response = $httpKernel->handle()`. We're going to pass this *two* arguments. We
already know from `index.php` that the first argument is the `Request`. So, pass
`$request`. But there is also an optional *second* argument: the request "type".
This allows you to pass a flag that indicates if this is a "master" request -
that's the default - or if this is a sub-request - some request that is happening
*inside* the main one. That's our situation, so pass:
`HttpKernelInterface::SUB_REQUEST`.

[[[ code('1ec52334f1') ]]]

What difference will that make? Not much. But listeners to almost *every*
event that we've seen are *passed* this flag on the event object and can behave
*differently* based on whether or not a master or sub request is being handled.
We'll see that in a few minutes.

To check if this works, `dump($response)`. 

[[[ code('2fa9e1568e') ]]]

Um... ok! Let's try this! We added
this to the homepage... so refresh. Everything looks normal on this *main* request.
Now hover over the target icon on the web debug toolbar. There it is! A dumped
`Response` with the trending quotes content inside.

And, yes, if we click the time icon on the web debug toolbar to get to the
Performance section of the profiler, we can see our sub request! Heck, now
we have *two* sub requests: our "manual" sub-request and then the one from
the template.

Set the threshold back down to 0 milliseconds. *Way* down on the main profiler,
the sub-request shows up as this strange `__section__.child` thing.

Go back to the homepage controller and comment out the sub request logic. 

[[[ code('359b8bf9b2') ]]]

I wanted you to see that this is *all* that *really* happens to trigger 
a sub request.

## Listeners and the isMasterRequest() Flag

As we talked about, many listeners will use this `SUB_REQUEST` flag to *change*
their behavior. Because sometimes, it only makes sense for a listener to do its
work on the main, *master* request. For example - if you wrote a custom listener
that checked the URL and denied access based on some custom logic, that listener
only needs to *do* that check on the *main* request. It either denies access or
allows access initially, and then the rest of the page should render normally.

Our `UserAgentSubscriber` is a perfect example of this. It makes no sense to read
the `User-Agent` off of a sub request. It might work - because, in reality,
sub-requests copy *some* of the data from the main request, but trying to read
real information off of the request in a sub-request is asking for trouble. I
*really* want you to think of the master and sub requests as *totally* independent
objects.

So, what can we do? At the very top of our listener, if *not*
`$event->isMasterRequest()`, simply return.

[[[ code('f9f97112e7') ]]]

The `isMasterRequest()` method is a shortcut to check the flag that was originally
passed to `HttpKernel::handle()`. Our listener *will* still be called on a sub-request,
but now it will do *nothing*. And that makes sense: this class is doing *nothing*
more than logging the `User-Agent`. We didn't realize it before, but thanks to our
sub-request, each page refresh was logging the `User-Agent` *twice*: one for the
main request and once for the sub-request.

Ok, but! We still haven't fixed our original problem: when we add `?mac=false` to
the URL, this is *correctly* read on the master request but *incorrectly* on the
sub request. That's because we're trying to read that query parameter from *inside*
the sub request... which doesn't work.

How can we fix that? The answer leverages an *old* friend of ours and will also
touch on the proper way to pass data from the main request to the sub-request if
you want to use HTTP caching with edge side includes. That's next.
