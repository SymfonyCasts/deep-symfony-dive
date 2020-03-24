# Finishing the Request

Coming soon...

There are few other interesting ones on here. Another one here
is called `ContextListener`. You can see it's actually part of the security
components. Let's open that guy up. `ContextListener.php`. This listens to a
couple of events. So let's scroll down here. Fund on current response so you can see
rights, the security token into the session. So if you use, um, a session based
firewall, this is the class that's actually responsible for taking your user,
technically your token.

and ultimately saving it into the session. Here it is,
`$session->set($this->sessionKey, serialize($token))`. So this is actually
what starts it. This is also the class responsible for unsee. Realizing it at the
beginning of the request.

That is a couple of other ones. In here you can see there's a listener called
`DisallowRobotsIndexingListener`. A that's actually a config that supports that
configuration that you can do to return headers to uh, uh, disallow, um, robots
indexing your site. And down here there's a `SessionListener`, which I'll open that
one up.

`SessionListener` is responsible for actually storing the session information. So
actually here at extends `AbstractSessionListener` to it. That's where the majority of
the logic is. It actually listens on, `onKernerlRequest()`, but we're, we're interested
in `onKernelResponse()`. And you can see down here it does several things here, but it
actually calls it `$session->save()`. So all of these important background things are being
handled by these listeners. All right, so the point is once we get a response, we
this last event and then it calls `finishRequest()` and then eventually returns the
response off of the event. So I'm going to go into `finishedRequest()`. All this does
is dispatches one more event and then calls `$this->requestStack->pop()`.
Remember this request that object is holding a collection of requests. Something
we'll talk more about soon. This removes the last one off of it.

So it basically removes the most recent one that was added earlier. So does the
opposite. If I scroll up, does the opposite of `$this->requestStack->push($request)` So
ultimately we get a response, we return a response. All of this goes back to the
`handle()` method on top and every return `$this->handleRaw()` where the whole that response
object we have is ultimately returned from `$kernel->handel()` and it's ultimately
returned back. Giving back `index.php` `$response = $kernel->handle($request)`. The last
two things that happen here, our `$response->send()`, I'll open that up, which is a fancy
way of this is where it actually sends the headers. An echo echoes the content. And
then finally `$kernel->terminate()`. If we look at the terminate method here, I'll
look for it in my `HttpKernel` surprise it, dispatches it. One more event. This is a
special event that's dispatched even after the content incentive, the user, nothing
critical listens onto this, but this is actually where the, um, all the profiler
data, all the data that was collected during the request to power this section,
that's actually where it's ultimately stored. You can see profile listener on
`kernel.terminate` it stores all of the data.

So that may have seemed like a lot, but really, if you look at it more specifically,
here's what happens inside Symfony, we dispatch an event, we find the controller, we
dispatch an event, we find the arguments, we dispatch an event, we call the
controller, and then via `filterResponse()`, we dispatch another event, this furnace
request dispatchers at another event. And ultimately that's it in an index dot PHP,
we then send the headers and echo the content in dispatch one last event. So it's
kind of like five different steps. Controller arguments, call the controller with
events mixed in, in every single spots to make things happen. And most of those
events aren't critical for how Symfony functions. They're just convenient hook
points. And that's it. You just walked through the entire request response process.
The only thing we haven't talked about back in `Httpkernel`, if you scroll all the way
up, is remember the `handle()` method is ultimately what it's called and it wraps
`handleRaw()` in a try catch. We haven't yet looked at what happens if an exception is their
own somewhere in the system, and that controls quite a lot. Let's look at that next.
