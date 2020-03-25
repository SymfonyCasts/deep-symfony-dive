# How the HTML Error Page is Rendered

Coming soon...

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
