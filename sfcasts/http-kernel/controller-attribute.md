# Controller Attribute

Coming soon...

Now that we've learned so much about the request and the response process, let's
start seeing what kind of cool things we can do with this knowledge. So I'm going to
close up everything except for `index.php` in `HttpKernel`. So my first kind of
challenge is how could we, for example, from a listener, change the controller for a
page. And actually there's a few different obvious ways to do this. We know that, uh,
after the controllers determined Symfony dispatches that `ControllerEvent`, and this
actually has a `setController()` method on it, so you can override it by adding listen
to that event. You can do the same thing down here with `ControllerArgumentsEvent`.
So that's really cool. Or you can do it in a different way. Let me close up my tree
here. It's getting a little huge and let's go into our `UserAgentSubscriber`.
Remember when Symfony determines the controller instead of controller resolver, it
does that by looking at the `_controller` value of the request attributes.

So if for some reason we wanted to completely replace the controller from any
listener, we can do it right here. `$request->attributes->set('_controller'...`. And let's
set it to a anonymous function cause yeah, that's totally possible. Inside I'll say
return new `Response()`. We'll say I just took over the controller and just like that on
any page, this 404 page or actually the real page or the homepage, I clicked
back of the home page. We just took over the controller for everything. We can even
do the same argument stuff as before. So I could put eight `$slug` argument here. I'll
actually say `$slug = null` and I'll `dd($slug)`. So on the article page, this is going
to work because there's a slug wild card. So that an on page, it's no uh, but because
I made it equal, no, I made it optional. It doesn't give me an error.

So as far as the `RouterListener` concerned, it's actually opening back, open up,
back up, `RouterListener.php`. If you look at, it's `onKernelRequest()`, it
normally runs the routing and the routing figures out that _`controller` and it sets
it on the request attributes. But if you look down here on `getSubscribedEvents()` 
`onKernelRequest()` as a priority of 32 our subscriber has not specified a priority,
which means this priority zero. So the router listener actually running first right
now and it's executing routing and setting the `_controller` attributes and then we're
actually overriding that value inside of our listener. But even if we changed the
order, even if we made ours a higher priority, this would still work. And the reason
is that at the top of router listener on current request, one of the first thing that
it does is it checks to see has something else already set the `_controller`. If it has
routing is already done and it does nothing. So the order here actually doesn't
matter.

And this is how `ErrorListener` worked so far. I'm going to go back shift shift, go back
to `ErrorListener.php`. If you remember here, it actually duplicated the request. So
this is `onKernelException`. It duplicated the requests, which is a fancy way of
basically saying it graded a new request object where it set the `_controller` to the
`ErrorController`. And then it sent that entire thing back through `$kernel->handle()`,
which means before any of the listeners are run on this spot here, the `_controller` was
already set. So the router listener is actually called on this request too. But when
that happens, the `_controller`, um, already has a value back to, we can see this here.
If I

dumped

well, that's actually a `dump($request)`. Their attributes, `ErrorController` instead of
here,

if I go over here and go to a four Oh four page, so I'll go back to `/news/foo`.
You're going to see this is executed twice. Oh, I still have my `dd()` in there. Let's
actually go and comment out. Our controller stays out of the way. They're gonna
refresh again. And you can see down here in the Webby, but to bar it actually printed
out twice. The first time is the first time they ride around through. And this second
time is actually when the, uh, this second request from `ErrorListener` was being thrown
inside of there. And the router lists are now returned that it has the controller
we're actually seeing is sub requests. And action, which is something we're gonna
talk about later, but you can actually see Stephanie handling two requests at once.
We'll come back to that a little later. Right now I want to do more with messing
around with the controller arguments or move this `dump()`.

