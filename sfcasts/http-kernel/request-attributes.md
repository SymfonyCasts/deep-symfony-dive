# Routing Secrets & Request Attributes

underscore, but actually to understand more, let's create a Yammel route by hand to
see what it looks like. So I'm going to go to config routes side Yammel. Let's
uncomment are this fake route here, right here. I'll change the path through. Slash.
Plane. All right, it's over here. I'll open another tab. Go to local was 8,000
/playing. There we go. So that's exactly what we expected. The name of the route
under school route and under score controller, but in reality, this controller key
that you have here, and this is just a shortcut for many for years in Symfony, the
way that you defined a controller in Yammel was by actually having a default ski here
and then under that an_controller key set to that. If I go over and refresh now, that
makes no difference. It turns out that controller key that you can have is simply a
shortcut for setting defaults, `_controller`.

Well actually let's take this a little bit further. So first thing, I'm going to add
a curler grace ID to the end of this, and not surprising, I'll need to go to /plane
/five now we have an ID inside of this array. Now normally the purpose of defaults
down here is to give the wildcards a default value. So I can say ID 10 right here and
now if I just refresh this page, it's still ID five cause I haven't that URL. But if
I just go to /playing, now it's ID 10 so what we're actually seeing here is that, let
me add one more thing and then we'll kind of talk about the whole, the picture it
turns out, but you can actually invent values and put them under unDefault. So I'm
going to say totally inventing this default. So that's a true, this won't affect how
the route works at all. It's not going to change how this URL matches. But if we go
over and refresh, now that's a new key inside of that array. So in reality, this
array here is a merge of all the values inside the faults, plus all the values inside
the wild cards. So if I go back to /playing slash, fine, you can see that it includes
the_controller and he totally inventing this default and it merges that in to the
real value for the ID wildcard.

In annotations, it looks a little bit different, but it's the same thing. We can edit
the false key here and we can set food to bar. And now if we go over, I'll close this
last tab. If you go over and refresh, this is the same as before, but except now we
have a food set bar that's merged into that. So that is the job of the routes to find
which route matched, but actually returned to us the defaults in that route, which
includes_controller plus the values inside any of the wild cards. Okay, so let's go
back to router in the controller. Let's actually remove those defaults. I'll move
that in the fall. Okay, let's go to router listener. So now that we kind of
understand a little bit about what this parameters thing is, how is it used? Cause
right now it's just set to a parameters variable, but you know what's actually going
on with that.

So I'll remove the DD and let's kind of trace this down a little bit so it does some
logging of stuff. And here check this out. Request->attributes,->add parameters. So
back up here for a second. The request object has a number of public properties on
them in all of the public properties correspond to something on the request on the
HTTP request, like request->headers is a object that holds all of the headers
requests.->cookies is a way to get all of the cookies on the request request.->query
is a way to get all the query parameters on the request. So all of those properties
correspond to real things on the HTTP request. With the exception of request
attributes, request attributes doesn't have a real world equivalent. You can't talk
to a Java developer and say, Hey, what are the attributes on your request? This is
something totally invented inside of Symfony, and the purpose of this, of the
attributes on the request is it's a place where you can just store data about your
request that's specific to your application. So a high level storing the co which
controller this request should execute is a perfect match for this. A controller is
not something that makes sense when you're just thinking about HTTP requests and
responses, but controllers do make sense inside of Symfony.

Okay,

so these parameters are attitude request attributes. What does that do right now?
Absolutely nothing. I just want you to understand that the end result of the routing,
that array that we saw earlier, this stuff is put onto the request attributes. It
also says another attribute called_route prams. That's less important that that's
less important and that's it. That's basically all that the router listener does. So
I'm going to close robber listener and go back to HTP kernel. So as we saw, there are
lots of listeners to this request event, but by far the most important one is the
router listener. So the difference before and after this dispatch line is simply that
the request attributes have new stuff in it. In fact, let's see this above it. I'll
dump request->attributes,->all. I'll copy that and we'll dump afterwards. And then I
will say die. It's a big over right now. I'll refresh the article show page, checked
it out before we dispatch the event. We have an empty array. After we dispatched the
event, we have our route controller and our slug said it also stuck a couple of lows
and said Rob Rams and a couple of other things were added related to security. These
were also added by other listeners. Not important right now for understanding the
request and response flow.

I'll remove all those dumps and dies. So next we're going to see why that's important
because ultimately we know Symfony needs to somehow we're gonna see why that's
important. But before we get there, I want to show you a cool thing related to
routing. When you actually execute the router, like we just saw in router listener,
if you look in your VAR cache dev directory, you're going to find a file in here
called URL matching routes. .php. This is a file that was automatically generated
by Symfony from your routes. It's an insane file. This dumps a bunch of metadata
about your routes, including this crazy list of regular expressions down here. And
this is actually used by the router at runtime and it's as a super efficient way to
find exactly which route matched. So all these regular to this regular expression
here is actually run against the URL, and that's how it matched up down here. So the
Symfony routing layer is incredibly fast because this crazy dumped file is used by
the router internally. Anyways, next, let's see the significance of those requests.
Attributes as we continue to look down the HTP kernel function.
