# Sub Request Attributes

Coming soon...

To understand a bit more about sub requests. Let's create one by hand because it's
not super obvious just by calling these two twig functions. What's going on behind
the scenes? I'm just trying to tell you, but let's actually code it just for the heck
of it. Right insides our homepage controller. Let's execute a sub request right here.
We can literally say literally create a new request object request = a new request.
Does this point, this is an empty request object. It basically has nothing on it.
It's not like the request colon colon create from Global's method that we saw
earlier. This actually pre-populates with the requests with all of the current
requests information. This doesn't do that. This is just an empty request object to
render the partial controller. We're just going to set the request attribute
request,->attributes, aerosept_controller and we'll set that to the same string that
we have inside of our uh, tweak template. So I'll copy that and paste it there.

Okay,

so app //controller //partial controller colon colon trending quotes. So we now have
a request object that's nothing in it except for that_controller attribute. I'll put
a little comment up here that we are and that's all we need. Well almost all we need
just to work around a little bit of internal validation. Alison need to make sure
that this request at least has a valid IP address with request->server,->set, remote
add are we need to set it to127@zero.zero.one that won't actually make any
difference.

Yeah.

All right. Do you send this into the, to be Colonel, we just need to fetch the age to
be Colonel as a service because it is actually a service you can dispatch so I'll add
another argument. HTTP, Colonel interface, HTTP Colonel and then down here I will say
response = HD, the Colonel->handle and we're going to pass this to arguments. We
already know again from index that PHP that the first argument this takes his hand is
the request you pass in the request that you want it to handle. So we are going to
pass in our request here. This also has an optional second argument. The type you can
actually pass a flag that indicates whether this is the master request, that's the
default. Or if this is a sub request, if, if, if the Colonel is currently handling
something other than the real main request, which, and that's our situation. So let's
pass an HTTP Colonel interface colon colon sub request.

What difference is that gonna make? Not much, but listeners in the system sometimes
behave differently based on this flag. And I'll show you that in a few minutes. Then
on here just to see if it's working, we will dump the response. All right, so go
back. This is the homepage, refresh the homepage and there it is. Everything looks
normal except yeah, here's a response. You can see the content inside of there being
rendered. And if we click the time down here to get to the performance part of the
profiler, once again it looks exactly like before you can see a sub request

[inaudible].

In fact you can see two sub requests here because the template actually has a sub
request. And um, and then we have our sort of manual sub request. You can see if we
kind of set this down to the milliseconds here. You can see way down here that it
actually shows up as this kind of strange_underscore section_underscore dot child
thing. That's where ours is happening. All right, so let's go back to the home page
and then I'm going to comment out the sub request wanted you to see this because this
is all that's really happening behind the scenes when we call a sub request.

So as I mentioned earlier, a lot of listeners will use this flag to determine their
behavior because if you have a listener, sometimes there's you have a listener that
is really only meant to operate on the, on the main request. Like if you have
somebody related to security, it only needs to operate in the main request. Then it
will either grant access or deny access and then if your page happens to render some
sub requests, who cares? The real request is either been granted or denied at that
point. Our user agents subscriber is a perfect example of that. It makes no sense to
get the user agent off of a sub request. It might work because these sub requests is
actually a clone of the main request. So it shares some information, but it's a best
practice. I want you to think of them as two separate requests objects, so it doesn't
make sense to get the user agent off of the main request off of the sub requests. So
the very top I'm going to say if not event = is master request, then simply return.
So this is master request is a flag that corresponds to um, that thing that we passed
in a to Colonel handle before. So now our listener will be called an ESOP request,
but it's just going to do nothing.

[inaudible] okay.

Now here's the really tricky part, but you know, right now that's, we know because
I've added this question Mark, Mac = false that our main requests and our sub
requests are behaving differently or sub requests is not able to read the query
parameter off of here correctly. And in general, I don't want my sub requests to you
try to use information off the request because it's not the real request. But it was
so easy to do. Instead of my partial controller, I, this edit is Mac like I do
everywhere else. And it worked because my, his Mac argument resolver is running every
single request. It doesn't know that the second time it's called, this request is not
the real request. So what I really want to do is prevent any controllers that are on
sub requests from being able to use. This is Mac argument. I actually wanted to throw
an air. So unfortunately the value resolver doesn't really have a good way to
determine whether this is a master request or a sub request, but our listener does.
So we're going to use a little trick here where our listener is actually going to
figure out whether or not we're on a Mac and then pass that information over to our
argument value resolver. So check this out. Down here. Inside my subscriber, I'm
gonna create a new private function called his Mac. It will take in the request
object from HTB foundation and return a bullion.

Okay.

And for that logic, I'm going to go steal everything from inside of resolve, copy
that and then paste it here and then I will return change both of my yields to just
normal returns. Perfect. We now have something that will tell us whether or not this
is a Mac. Now up here inside of our uh, event listener, if it's a sub request, it's
going to exit immediately. If it's a master request and only if it's a master
request, I'm going to store that is Mac information on the request where, well the
request attributes,

not for any reason, not for any really technical reason, just because that is
generally a, a PR, a good place to store information about the requests that's
specific to your application. So request error attributes,->set and I'm actually
going to call this_is Mac. And then I'll say this->is Mac and pass it the request
because if we start earlier, if I actually called this just is Mac, we wouldn't even
need the ARG argument value resolver. Um, because that would immediately make it
possible to have in his Mac argument without an error. So I want to try and do this
kind of the hard way. So I'm going to call it_his Mac. And then instead of the value
resolver, we're going to read that attribute, which will only be there for master
requests. So now instead of support, it's not just whether or not the argument Mac,
it's also and, and request Ariel attributes.->has_is Mac. So supports is now going to
return false on the sub requests. And then down here it's very, very simple. The
resolve is just yield request,->attributes,->get_is Mac

and that's it.

So does it work. First thing go back, I'm actually going to open a new tab to go to a
show page on the show page. It works. If you remember, we're actually dumping the,
his Mac argument from our show controllers. This proves that we're still able to pass
the his Mac argument, um, into a normal controller on a master request. But if we go
back to our home page, it explodes and exception has been thrown during the rendering
or a template could not resolve argument is Mac of partial controller trending
quotes. And you can see it's actually dying on our render controller. So actually
this is exactly what we wanted. I've now made it impossible to accidentally use an is
Mac argument

on a controller that's rendered in a sub request. Of course, the question now is how
do we fix this? What if I really do need the is Mac? I need to know if this is a Mac
inside this sub request or I'm thinking about it. I want you to think of those two
requests as completely two different requests that they operate independently. So the
only way to do this, and actually the best way to do this for lots of different
reasons, is to pass that his Mac value from your main request into your sub request.
And you do this right where you create the sub request. So for us right now, we're
doing it inside of, uh, our twink template by render controller. The controller
method has an optional second argument and here you can pass his Mac set to the his
Mac value. Now first, let me refresh and see if this works. It does allow me to
explain the second argument to the controller here. Whatever you pass here goes into
the request attributes of the sub request, so why does this work? In this case it's
not actually using our argument value resolver at all. It's just that we've put an is
Mac request attribute is Mac into the request to attributes and so we are allowed on
that one controller to have an is Mac value and this space you see it's not showing
here and it's not showing here. They're keeping consistent with each other and if I
take off our kind of work around it shows up in both places

as an added benefit. If you use edge side includes an HTTP caching. Then if I open
the profiler and go to the performance tab and then click down here to look in that
sub request, this would actually be the internal URL that it uses

[inaudible] Nope.

As an added benefit. That is Mac part. If you were to render this with ESI, that is
Mac part here actually becomes part of the URL internally and so this would maintain
two different caches based on whether this is Mac true or is Mac false.

The other solution you can use here is actually past_is Mac. If we past_is Mac, this
actually would use our argument resolver. Our user agent subscriber would still do
nothing cause it's a sub request but that_is Mac would be there and so our argument
value resolver when use it and pass it to partial controller, so two different ways.
Do the exact same thing. Neither is the best solution. You might even have a
different solution for this problem, but this is a great way to think about how all
the pieces are connecting. All right friends, hope you enjoy this deep dark trip trip
into the core of the Symfony HTTP kernel and the requests or response. If you have
still have any burning questions, I would love to hear them or as always we're here
for you in the comments section. If you want to know more or no, I won't say that.

