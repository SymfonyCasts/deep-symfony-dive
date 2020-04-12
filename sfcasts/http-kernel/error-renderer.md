# Serializer Error Renderer: JSON/XML Errors

This method is called by `ErrorController` and its job is to return a
`FlattenException` that contains the status code, headers and *body* that should
be set on the final error `Response`. The `FlattenException::createFromThrowable`
intelligently sets the status code and headers. But we *still* need to, somehow,
figure out what *content* to send back, like a JSON error, or an HTML page that
says: "Please send help!".

## Determining the Preferred Format

To do that, `SerializerErrorRenderer` *first* tries to figure out what *format*
the user wants - like HTML or JSON. The `$this->format` property is actually a
callback that points down here to this `getPreferredFormat()` method. This is a
fancy way of getting the request and calling `$request->getPreferredFormat()`.
And... hey! We know that method! I'll hit Shift + Shift and open `Response.php`
from `HttpFoundation`. Search for `prepare()`. This method is called by a listener
to the `kernel.response` event. It normalizes a few things... *including* setting
the `Content-Type` header if it hasn't *already* been set. To help with that, it
calls `$request->getPreferredFormat()` to try to figure out if the user wants
HTML, JSON or something else. One of the ways it figures this out is by looking
at the `Accept` header on the request.

Back in `SerializerErrorRenderer`, we're once again using
`$request->getPreferredFormat()`, which will return a simple string like `html` or
`json`.

## Serializing the Error to JSON, XML, etc

Up in `render()`, this is pretty cool: it says:

> Hey serializer! Can you try to serialize the `FlattenException` object into
> this format?

If the `format` is `html`, this will fail with a `NotEncodableValueException`: the
serializer doesn't handle HTML. We'll talk about that case in a minute. But if
the format is `json`, `xml` or some other format that the serializer *does*
support, this will convert the exception to *that* format!

We can see this. If we refresh the page... we see the big HTML exception - and
we'll see the code that makes this soon. Copy the URL, find your terminal and
use `curl` to fetch that URL. But *also* pass a `-H` flag to add a header:
`"Accept: application/json"`:

```terminal-silent
curl https://localhost:8000/news/foo -H "Accept: application/json"
```

This will change the "preferred format" on the request to `json`. And... check it
out! It's a 404 status code but in a JSON format! We can even use `text/xml` to see
this in XML.

```terminal-silent
curl https://localhost:8000/news/foo -H "Accept: text/xml"
```

## How is a FlattenException Serialized?

How does this work? One of the normalizers in the serializer is called
`ProblemNormalizer`. I'll hit Shift + Shift to open it: `ProblemNormalizer.php`.

If you don't know much about the serializer component, the important thing to know
is that a normalizer is responsible for taking an object and *converting* it into
an *array* of data. Thanks to the `supportsNormalization()` method, *this* class
is used when you try to normalize a `FlattenException` object.

This normalizer creates a response format that follows an HTTP specification: it
helps us return an official, standardized error response. It's pretty simple: it
sets keys for `type`, `title`, `status` and `detail`. In `$debug` mode, it *also*
adds `class` and `trace`. Also, the `detail` key in debug mode will be the exception
message... but in production, it will be the "status text", which is a generic
"Not Found" message... or something similar, based on the status code. That's done
so that your exception messages don't "leak" to the public.

The `normalize()` method is passed the `$exception`, which is the `FlattenException`.
But if you look back at `SerializerErrorRenderer`, it *also* passes the
*original* exception as an `exception` key on the `$context` - that's the 3rd
argument to `normalize()`.

So this gives us a really nice error response body, without any work. If you wanted
to *change* this data, you could do that by adding your *own* custom normalizer.
We actually talk about this in our
[API Platform Security Tutorial](https://symfonycasts.com/screencast/api-platform-security/custom-normalizer).
You could *decorate* the `ProblemNormalizer`... and maybe just add or tweak some
data *or* you could create an entirely *new* normalizer. Heck, you could
use the `$context` in `supports` - you need to implement
`ContextAwareNormalizerInterface` to make that work - and make that *new*
normalizer responsible for *only* normalizing `FlattenException` classes for
a *specific*, *original* exception. If you want to try that and have problems,
let us know.

Ok, close that class up. Next, let's find out what happens if the format is *not*
something that the serializer can handle. Like, HTML.
