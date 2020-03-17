# Multiple Requests

Coming soon...

Remember that cool trick that we did a few minutes ago with our argument value
resolver that allowed us to have an is Mac argument to any controller in our system.
Well does that also work in a controller? That is called by sub request. Of course
cause there's nothing special about this. This isn't when, when this controller is
called, it's a completely new cycle of the HTTP Colonel handle method. So everything
is called again and everything works exactly the same. So let's say you actually use
this, I'll add is Mac argument. Then I'm gonna to pass that into the controller cause
another is Mac argument to the controller and then I'll go over to my training quotes
here and down at the bottom on the site. If it is smack and Def, then I'll do an HR
and a small tag. I'll say, by the way, if you're using a Mac, cool, terrific. Go over
here. I'll actually go back and back again.

There we go. All the way back to my homepage and there we go. You can see by the way
you're using a Mac. Makes perfect sense just for the heck of it. Let's have that same
thing up here. So this part is still from the homepage template. So I'm actually
going to, uh, go over to my article controller here, go to my homepage controller,
add an is Mac argument there. The past is Mac into the [inaudible] template of our
homepage template. And then I'm gonna just going to steal that same logic from our
trending quotes and put that into our homepage. So let's see.

Well actually put it right here. I'm going to go over and refresh. There we go. By
the way, are you using a Mac by the way? You're using a Mac. So it's the same at both
spots. So let's pretend now that since I'm always on a Mac, I want a kind of a work
around so that I can test to see if this feature is working correctly. So what I'm
gonna do is I'm going to have add the ability where I can say question Mark Mac =
true or false. And I want that to override the real a logic that looks at my user
agent.

So the logic for setting that argument is in is Mac argument resolver. So if we want
to kind of short circuit it, we're going to need to do it in here before we read the
user agent. So simple enough, the resolve passes us the request. So let's say if
request->query to read a query parameter,->has Mac, then we're going to yield
requests.->query->get Boolean give Boolean is a cool little thing where it gets the
value. It's been the same Mac here, but it's um, runs it through parse function that
I need to look up later so that it'll actually value a string value, like false will
turn into a false Boolean, a string value like true, and it does a couple other
things. And then down here I'll return just so that it doesn't continue.

So if I refresh without doing anything, it's still using my user agent. Everything
looks right now. Let's say question Mark. Mac = false. And there it goes. It worked.
You can see it's gone except, Oh, the message coming from my sub request is still
there. That didn't work. Why? If you're thinking that somehow the argument value
resolver isn't called on a sub request, that's not it. A sub request is exactly like
a main request. It's handled in the same way. This functions actually being called
twice on this page. Once for the main request and again for the sub request. So why
are they different? The answer to that is that internally, if I click into the
profiler and go to performance, the request on top here is not the same as the
request down here and I literally am talking about the request object Symfony grades
two separate requests, objects HTB Colonel handles the first one which is the main
page, but then at grates a second request object and asks HTB kernel to handle it
again, which is how you get the bottom thing. The first request object is the request
that the first request object contains that query parameter cause the first request
object, it's the main request, but that second request object, it's kind of a fake
object. You're not really meant to read information from it. It doesn't contain the
query parameter. And actually we can prove this. I will dump request inside of my
resolve method and refresh and look it up to dumps here. And the request attributes
on the first one.

Oh, sorry. Not request attributes. The requests query on the first one as Mac false.
And if we go down here, the request query on the second one has a path argument, but
no query parameter false. So the point is here that there are two different requests
being handled and when you're inside of a controller that is actually being called by
sub request, it's not really a good idea to read information from the request because
the query request object you're dealing with is not the real request. It's a sub
request, this fake request object, which is just created to help render a controller.

Yeah.

So let's learn a little bit more about this next and I can't remember exactly what
we're going to do next, but we'll do something next.

