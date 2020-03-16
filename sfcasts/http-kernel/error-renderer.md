# Error Renderer

Coming soon...

The job of the error controller is to turn the exception that was thrown into a
response unless some other listener to the kernel exception event already did that
though. That doesn't normally happen. And by the way, this air controller is actually
something you can configure. So if you want to control the exception on your site,
you can register a listener to the exception event

or [inaudible].

You can actually override the error controller via the framework that air_controller
config. But as you'll see, but then you, if you did that, you'd actually be
responsible for rendering both the normal air pages and production and also the big
nice,

okay.

The big nice exception pages and development. So there are better ways to hook into
this. So let's check out what this air controller does. So as you can see
immediately, all it really does is call something called the error renderer and then
ultimately returns whatever it sends as the string, uh, on the response. So what is
that air render?

Of course

we can just debug that DD air render move over and okay, great. It's something called
a serializer air renderer. That's because I have these serializer installed. If you
didn't have a serializer installed, you would see a different class here. And I'll
talk about that in a second. So what's the serializer air render? So let's open that
up and actually I'm going to close router listener here

and also that's it.

So serializer air render

perfect. So what's going to call it? It's render method. The first thing it does is
call something called flatten exception. Create from flow from throw a bubble. We've
seen that flat exception, uh, in the last video. Flat exception is basically a uh,
visual representation of an exception. I hold command and jump into the class C, it's
not an exception itself. It doesn't extend exception or implement through trouble, it
just, but it does have all the mess, the information about like the actual exception
message, the code, the previous and things about the, uh, the stack trace.

Okay.

So the Flint exception create from thoroughal is based EOP. If I click into that,
it's a way to easily create this object based on a real exception. Now, there are
some really important things in here. Check this out. Exception is an instance of
HTTP exception interface. Then it calls exception get status code to get the status
code and exception and get headers to get the headers for this. The status code and
headers are ultimately two properties that are stored on this flat and exception and
used on the final response. So what is this HTTP exception interface thing? We've
actually seen it.

Okay,

we go back to our article controller. Remember this creating that exception, if I
hold command or control and click into that, we know that that throws a not found
HTTP exception and if we jump into that, not find each to be exception extends HTTP
exception and if we jump into that, each TTB exception implements HTTP exception
interface. This is a long way of saying that there are certain exceptions in Symfony
like not found HTP exception that map to a certain status code. We can see this, the
not found HV exception maps to a four four. Why? Because when it calls the parent
construct method, it passes four Oh four and this is ultimately set on a status code
property and return from get status code. You can also pass headers here. There are a
number of other exceptions like this. If I, I'll double click on the directory
structure.

Up here you can see there's bad requests exception, which is a 400 exception. There
is preconditioned failed HV exception, which is eight four 12 Symfonys. These built
in exception classes for various status codes. If you throw any of these anywhere
within your system, it's going to trigger an air with that status code. So that is
why not found eight speaks option maps to a four four it's because of this spot and
flatten exception. There is also another type of exception interface called request
exception interface. It's not as important in those always mapped to a four four if
it's neither of those, it maps to a 500 so that's why I would, if you just throw a
normal exception, it maps to a 500 air [inaudible].

All right, perfect. So let me close the flat exception here and let's go back to our
serializer air render. So it gets the flat and exception object and then it tries to
figure out what format it should try to convert that into the this->format thing.
Here is actually a callback which points down here on this get to preferred format
method, which is a fancy way of getting the request and Collin request->get preferred
format. This is a method that we actually saw earlier. I'm going to hold shift shift
and open response dot PHP. The one from HTTP foundation, the main response class
instead of here, search for prepare. There we go. This is one of the methods that was
called by a listener to the kernel. Dot response method. It's very late in very late
in the request it calls repair, it passes it the request and if you remember this
normalizes a few things like setting a content type header if it hasn't already been
set. If check out here, this is a spot where it calls get preferred format to try to
figure out if the user's requesting HTML JSON or something else and it used that to
set the content type, so I'll close that class. In this case, it's using the get
preferred format once again. And this can be set in a variety of ways.

If I open this, including you setting it manually by sending set request format or
using the_format, um, a default on a route or if none of those are there, it actually
starts going over the except headers defined, which, uh, type of, uh, format the user
is requesting.

So anyways, this is ultimately gonna return something like HTML or JSON. So
ultimately back here it gets this format, which is HTML or JSON. And then it actually
passes that to the serializer and asks, Hey, serializer, do you know how to serialize
the flattened exception object into JSON or HTML. Now if the format is HTML, this is
going to fail because the serializer doesn't handle HTML and it's going to hit this
not in quotable value exception. We'll talk about that in a second. But if this is
JSON or XML, this is actually going to work and we can see that. So if I move over
right now and refresh the page, so we see our big HTML page here. We'll talk about
where this is coming from in a second, but I'm going to copy my URL here, find my
terminal and curl that. But pass a dash H for header and then except application
/JSON, this is actually going to change the preferred format on the request to JSON
and now check this out. We get that four Oh four page in a JSON format. We can even
do tech /XML to get the XML version.

All right, so but in an HTML case, the serializer was going to throw this not in
quotable exception and it's in a call this fall back render you dig into the fallback
render. Because I have twig installed, it's going to be a class called twig error
render. It's going to call it it's render method and check this out. The first thing
it does is called it's fallback error render, and that is the core air render, which
is always there and it's called HTML air render. It's all open HTML air friend or dot
PHP.

All right, so let's actually look at what it does because twig air render calls
render on it. So if we look at the render method here, it once again creates a
flatten exception and then calls this render exception method down on this class in
very simpler. What this render acception method does is you can see this debug
template here it said to views exception_fold the HTM on the VHB. It actually renders
a PHP template. If we're in debug mode, it's this exception, fold that HTML, that
BHB. If we are not in debug mode, then it uses an error that HTML, that PHP, we can
actually look at these, you'll see

here, Nope,

the, this area include, uh, it's just going to go up and director to a resources and
then look for that. So let's go up a directory here, resources, views, and there they
are. So let's open exception_full that HTML, that PHP. So this is actually what we
are seeing over here. Whenever we have an exception, uh, to prove it down here in the
middle, I'll put, I'm inside your exception page, go over here and refresh. There it
is right there.

So that is ultimately, this is the ultimate sample that does the exception. And you
can see inside of here, this also erudite HTML, that PHP, which would be your normal
error page when you're not in development mode. So I'm going to pose exception full
and let's also close HTML, err rendered at PHP. So you can see here it gets this
exception object from the fallback render which now has the whatever our HTML is set
onto it, the whole rest of this twig air render is a way to override the template. If
you want to do, you can see here calls this->find template to see if the template
actually exists. And if it did find an O an override template, it renders it and uses
that instead instead. So if you look at the fine template down here, what at first
looks more is um, something called air status code at HTML. That's wig. And it's
looking at for an at twig, which actually technically means it's looking forward in
twig bundle. Um, it's not actually into a bundle but that gives us, that doesn't
actually exist in twig bundle, but that gives us an override way cause there are ways
to override a twig templates. So first looks for one of the status code. If it's
there, it uses it. If there's not, it tries to look for a generic error that HTML
twig. So this is how your overdue able to override, uh, era templates, um, via tweak
templates.

And that's it.

So if you have a serialized bubble format like JSON or XML, it uses serializer render
ELLs and ultimately uses the HTML air render in the twig. Air render gives you an
override. So that's normally how you're going to override temp, uh, errors is by, um,
uh, creating the right template. But we now know that there are many hooks like
overriding the error controller or listening to exception event, then ultimately
handled through [inaudible]. That's basically it. Assuming we get a response back,
there's a bit of other code down here, but basically the response is passed to filter
response and that response is sent back to the user exactly like normal. Which means
even the kernel bat response method is ultimately called on the final response of an
exception, which is why we get the web. But two of our down here, even on air pages.
All right, next, let's talk about something else that I can't remember.

