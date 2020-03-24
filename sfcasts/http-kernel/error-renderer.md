# Error Renderer

Coming soon...

The job of the `ErrorController` is to turn the `Exception` that was thrown into a
`Response` unless some other listener to the `kernel.exception` event already did that
though. That doesn't normally happen. And by the way, this `ErrorController` is actually
something you can configure. So if you want to control the exception on your site,
you can register a listener to the `ExceptionEvent`

or You can actually override the error controller via the `framework.error_controller`
config. But as you'll see, but then you, if you did that, you'd actually be
responsible for rendering both the normal error pages and production and also the big
nice,

The big nice exception pages and development. So there are better ways to hook into
this. So let's check out what this `ErrorController` does. So as you can see
immediately, all it really does is call something called the `errorRenderer` and then
ultimately returns whatever it sends as the string, uh, on the response. So what is
that `errorRenderer`?

Of course

we can just debug that `dd($this->errorRenderer)` move over and okay, great. It's something called
a `SerializerErrorRenderer`. That's because I have these serializer installed. If you
didn't have a serializer installed, you would see a different class here. And I'll
talk about that in a second. So what's the `SerializerErrorRenderer`? So let's open that
up and actually I'm going to close `RouterListener` here and also that's it.

So `SerializerErrorRenderer`
perfect. So what's going to call it? It's `render()` method. The first thing it does is
call something called `FlattenException::createFromThrowable`. We've
seen that `FlattenException`, in the last video. `FlattenException` is basically a uh,
visual representation of an exception. I hold command and jump into the class C, it's
not an exception itself. It doesn't extend `Exception` or implement `Throwable`, it
just, but it does have all the mess, the information about like the actual exception
`$message`, the `$code`, the `$previous` and things about the, uh, the stack trace.

So the `FlattenException::createFromThrowable` is based EOP. If I click into that,
it's a way to easily create this object based on a real exception. Now, there are
some really important things in here. Check this out. `$exception` is an instance of
`HttpExceptionInterface`. Then it calls `$exception->getStatusCode()` to get the status
code and `$exception->getHeaders()` to get the headers for this. The status code and
headers are ultimately two properties that are stored on this `FlattenException` and
used on the final response. So what is this `HttpExceptionInterface` thing? We've
actually seen it.

we go back to our `ArticleController`. Remember this creating that exception, if I
hold command or control and click into that, we know that that throws a 
`NotFoundHttpException` and if we jump into that, not find each to be exception extends 
`HttpException` and if we jump into that, each `HttpException` implements 
`HttpExceptionInterface`. This is a long way of saying that there are certain exceptions in Symfony
like `NotFoundHttpException` that map to a certain status code. We can see this, the
`NotFoundHttpException` maps to a 404. Why? Because when it calls the parent
construct method, it passes four Oh four and this is ultimately set on a status code
property and return from `getStatusCode()`. You can also pass `$headers` here. There are a
number of other exceptions like this. If I, I'll double click on the directory
structure.

Up here you can see there's `BadRequestsHttpException`, which is a 400 exception. There
is `PreconditionFailedHttpException`, which is 412 Symfonys. These built
in exception classes for various status codes. If you throw any of these anywhere
within your system, it's going to trigger an air with that status code. So that is
why `NotFoundHttpException` maps to a 404 it's because of this spot and
`FlattenException`. There is also another type of exception interface called 
`RequestExceptionInterface`. It's not as important in those always mapped to a 400 if
it's neither of those, it maps to a 500 so that's why I would, if you just throw a
normal exception, it maps to a 500 air.

All right, perfect. So let me close the `FlattenException` here and let's go back to our
`SerializerErrorRender`. So it gets the `FlattenException` object and then it tries to
figure out what format it should try to convert that into the `$this->format` thing.
Here is actually a callback which points down here on this `getPreferredFormat()`
method, which is a fancy way of getting the request and Collin `$request->getPreferredFormat()`
format. This is a method that we actually saw earlier. I'm going to hold shift shift
and open `Response.php`. The one from `HttpFoundation`, the main response class
instead of here, search for `prepare()`. There we go. This is one of the methods that was
called by a listener to the `kernel.response` method. It's very late in very late
in the request it calls `prepare()`, it passes it the `Request` and if you remember this
normalizes a few things like setting a `Content-Type` header if it hasn't already been
set. If check out here, this is a spot where it calls `getPreferredFormat()` to try to
figure out if the user's requesting HTML JSON or something else and it used that to
set the `Content-Type`, so I'll close that class. In this case, it's using the 
`getPreferredFormat()` once again. And this can be set in a variety of ways.

If I open this, including you setting it manually by sending `setRequestFormat()` or
using the `_format`, um, a default on a route or if none of those are there, it actually
starts going over the accept headers defined, which, uh, type of, uh, format the user
is requesting.

So anyways, this is ultimately gonna return something like HTML or JSON. So
ultimately back here it gets this format, which is HTML or JSON. And then it actually
passes that to the serializer and asks, Hey, serializer, do you know how to serialize
the `FlattenException` object into JSON or HTML. Now if the format is HTML, this is
going to fail because the serializer doesn't handle HTML and it's going to hit this
`NotEncodableValueException`. We'll talk about that in a second. But if this is
JSON or XML, this is actually going to work and we can see that. So if I move over
right now and refresh the page, so we see our big HTML page here. We'll talk about
where this is coming from in a second, but I'm going to copy my URL here, find my
terminal and `curl` that. But pass a `-H` for header and then `"Accept: application/json"`

```terminal-silent
curl https://localhost:8000/news/foo -H "Accept: application/json"
```

this is actually going to change the preferred format on the request to JSON
and now check this out. We get that 404 page in a JSON format. We can even
do `text/xml` to get the XML version.

```terminal-silent
curl https://localhost:8000/news/foo -H "Accept: text/xml"
```

All right, so but in an HTML case, the serializer was going to throw this 
`NotEncodableValueException` and it's in a call `$this->fallbackErrorRenderer` you dig 
into the `fallbackErrorRenderer`. Because I have `twig` installed, it's going to be 
a class called `TwigErrorRender`. It's going to call it it's `render()` method and 
check this out. The first thing it does is called `$this->fallbackErrorRenderer`, and 
that is the core Error render, which is always there and it's called `HtmlErrorRenderer`. 
It's all open `HtmlErrorRenderer.php`.

All right, so let's actually look at what it does because `TwigErrorRender` calls
`render()` on it. So if we look at the render method here, it once again creates a
`FlattenException` and then calls `$this->renderException()` method down on this class in
very simpler. What this `renderException()` method does is you can see this `$debugTemplate`
here it set to `views/exception_full.html.php`. It actually renders
a PHP template. If we're in debug mode, it's this `exception_full.html.php`
If we are not in debug mode, then it uses an `error.html.php`, we can
actually look at these, you'll see

here, Nope,

the, this area include, uh, it's just going to go up and director to a resources and
then look for that. So let's go up a directory here, `Resources/views/`, and there they
are. So let's open `exception_full.html.php`. So this is actually what we
are seeing over here. Whenever we have an exception, uh, to prove it down here in the
middle, I'll put, I'm inside your exception page, go over here and refresh. There it
is right there.

So that is ultimately, this is the ultimate sample that does the exception. And you
can see inside of here, this also `error.html.php`, which would be your normal
error page when you're not in development mode. So I'm going to pose `exception_full.html.php`
and let's also close `HtmlErrorRenderer.php`. So you can see here it gets this
`$exception` object from the fallback render which now has the whatever our HTML is set
onto it, the whole rest of this `TwigErrorRenderer` is a way to override the template. If
you want to do, you can see here calls `$this->findTemplate` to see if the template
actually exists. And if it did find an O an override template, it renders it and uses
that instead instead. So if you look at the `fineTemplate()` down here, what at first
looks more is um, something called `error%status_code%.html.twig` And it's
looking at for an `@Twig`, which actually technically means it's looking forward in
`TwigBundle`. Um, it's not actually into a bundle but that gives us, that doesn't
actually exist in `TwigBundle`, but that gives us an override way cause there are ways
to override a twig templates. So first looks for one of the status code. If it's
there, it uses it. If there's not, it tries to look for a generic `error.html.twig`
So this is how your overdue able to override, uh, era templates, um, via twig
templates.

And that's it.

So if you have a serialized bubble format like JSON or XML, it uses 
`SerializerErrorRenderer`
ELLs and ultimately uses the `HtmlErrorRenderer` in the `TwigErrorRenderer` gives you an
override. So that's normally how you're going to override temp, uh, errors is by, um,
uh, creating the right template. But we now know that there are many hooks like
overriding the `ErrorController` or listening to exception event, then ultimately
handled through [inaudible]. That's basically it. Assuming we get a response back,
there's a bit of other code down here, but basically the response is passed to 
`filterResponse()` and that response is sent back to the user exactly like normal. Which means
even the kernel response method is ultimately called on the final response of an
exception, which is why we get the web. But two of our down here, even on air pages.
All right, next, let's talk about something else that I can't remember.

