# Sub Request

Coming soon...

Let's talk about a fascinating part of the request response flow and something that
we've seen already a little bit. I want to talk about sub requests. So here's a good
way to look at this. Let's go to the homepage here and see these trending quotes on
the right here, right now. Okay. Actually close up a couple of files. The template
for this is templates article homepage dot. HTML that's waived. These trending quotes
here as you can see are just hard coded into the template. So let's make this a
little bit more realistic. Let's pretend that these quotes are coming from the
database. That would be simple enough. We could go find the homepage controller query
or for those quotes and pass them into the template, except I'm going to complicate
it a little bit. I'm going to also say that this whole trending quotes thing here,
we're going to want to include this on a bunch of different pages, like different
pages. We'll want to embed this same widget, which means ultimately

[inaudible] that

we need to isolate this, uh, this markup and the logic for doing the query into a
separate place that we can then call from multiple different templates. No, there are
two different ways to do this. The first one, maybe the simpler one would be to use a
twig extension at a twig function that would actually return the trending quotes and
then maybe pass that data to a, uh, a template partial that would render them.

And depending on whether or not you want to leverage something called HTTP caching,
if you don't, that would actually be the faster way. Well, we're going to do it in a
different way to show off sub requests and also a different way that if you use HB
caching is far more performance. So here's what we're gonna do. I'm going to remove
this entire section here and we are going to call render controller. This is a way in
twig where you can literally render a controller, you can call another controller and
whatever it's aged, whatever its responses, the content of their response will be
dumped. Right here. We're going to call a new controller, so I'm going to say app
SLAs /controller, and you need to use two slashes in here just because we're inside
of the string. One /the slashes will be escaped. Then slash, slash, and let's use a
new controller called partial controller. This will be a part of the page, and then
colon, colon, trending quotes. Cool. Next, let's create that. So I'll go up to
controller, go to new PHP class, call it partial controller, make it extend the
normal abstract controller, and we'll make public function

trending quotes. Now, instead of actually making a database query right now, that
part's not really important. I'm going to paste a new function out of here called
private to get trending quotes. So kind of have a little array here with different
information about all those three quotes. So up here we can now say quotes = this
arrow, get trending quotes.

Okay.

And then finally we're going to return to template this error render and we'll call
it partial /trending quotes.

Okay.

That HTML, that twig. And we will pass in a quotes

variable.

And finally let's create this template. We'll go down to templates, create a new
directory here called partial. And then inside of that new directory, the new file
called trending quotes, that HTML, that twig. Perfect. And for this, this is not very
interesting. I'll go over here and I'll paste in some code. So this has the same
rappers before and now we're just looping over the quotes and printing out that quote
information

[inaudible].

So this is a way that you can render a controller from TWIC. So let's go see if it
works. Whoever free fresh. And it does in, congratulations you just made a sub
request

checking out. I'll click one of the click any of the icons down on the web Depot, two
of our to go to the profiler and go to the performance tab. We'll look closely. It
has all the stuff that we are normally used to seeing, right? The router listener.
You can see our controller. We'll see this little shaded line back here. This is
actually indicating that there was another request that was processed and you can see
down here sub requests one and you can see that it is also handling another request
for turning quotes. This will all be a lot more clear if you set the threshold down
to zero so that shows everything. So again, down here you can see the little shaded
spot here. This is when that sub request is being handled, which literally means that
another request is being sent into kernel handle down here. Now this looks a lot
better. Check it out. So to render that controller, it didn't just call the
controller directly, it went through an entire process, another entire kernel handle
process with the Colonel, that request event dispatch event in all of its listeners,
including our user agents subscriber a its own controller and then Colonel that
response events. And of course there are other events here that we can't quite see
cause everything's a little bit too close together.

Yeah. When you call render controller, it actually renders a whole other cycle
through HD Colonel. In fact, you want to get really crazy. We can click this and go
to the profiler for that sub request. Check out the URL here. This is a kind of like
an internal URL which um, which actually at the moment won't work there. You can
activate it to work and they'll get sub request. I'll set this down to zero and we
can see everything in a little bit more detail.

Mmm,

and we already kind of know how this works though. We're going to go into that in
more detail to get a hint here. I'll go to the request response and on the request
information, if you look at the request attri, it's check it out, check out
the_controller.

Yeah.

This is ultimately going to work a lot like what we saw in air controller. This is
ultimately gonna work. It's ultimately works by internally Symfony creating another
request object in setting the_controller on that request object. That means the
router listener didn't run for this request or really the router listener did run for
this request, but it didn't actually execute routing. It exited immediately because
the_controller was already set. So this is a sub request. I went, we're going to talk
more about a sub request and some special things about it next. But before we do

[inaudible],

I just want to mention that the main use for sub requests is actually HTTP caching.
You have to do a little bit more work to set it up, but you can actually tell Symfony
that you want to cache this response independently. So you could actually have the
trending quotes, response cache for an hour, but then have the rest of your own page
not cached at all. It's the most efficient way to, uh, cache, um, those things behind
the scenes. All right, next we're going to make our sub requests a little bit more
interesting. It's going uncover it something mysterious.

