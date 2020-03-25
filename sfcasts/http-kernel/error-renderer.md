# Serializer Error Renderer: JSON/XML Errors

This method is called by the `ErrorController` and its job is to return a
`FlattenException` that contains the status code, headers and *body* that should
be set on the `Response` sent back to the user. The
`FlattenException::createFromThrowable` intelligently sets the status code and
headers. But we *still* need to, somehow, figure out what *content* to send back,
like a JSON error, or an HTML page that says "Please send help!".

## Determining the Preferred Format

To do that, `SerializerErrorRenderer` *first* tries to figure out what *format*
the user wants - like HTML or JSON. The `$this->format` property is actually a
callback that points down here to this `getPreferredFormat()` method. This is a
fancy way of getting the request and calling `$request->getPreferredFormat()`.
Hey! We know that method! I'll hit Shift + Shift and open `Response.php` from
`HttpFoundation`. Search for `prepare()`. This method is called by a listener to
the `kernel.response` method. This normalizes a few things... *including* setting
the `Content-Type` header if it hasn't *already* been set. It calls
`$request->getPreferredFormat()` to try to figure out if the user is requesting
HTML, JSON or something else. We talked quite a bit about how it does that.

Back in `SerializerErrorRenderer`, we're once again using
`$request->getPreferredFormat()`, which will return a simple string like `html` or
`json`.

## Serializing the Error to JSON, XML, etc

Up in `render()`, this is pretty cool: it says:

> Hey serializer! Can you try to serialize the `FlattenException` object into
> this format?

If the `format` is HTML, this will fail with a `NotEncodableValueException`: the
serializer doesn't handle HTML. We'll talk about that case in a minute. But if
the format is `json`, `xml` or some other format that the serializer *does*
support, this will convert the exception to *that* format!

We can see this. If we refresh the page... we see the big HTML exception - and
we'll see where this is coming from soon. Copy the URL, find your terminal and
use `curl` to fetch that URL. Also pass a `-H` flag to add a header:
`"Accept: application/json"`:

```terminal-silent
curl https://localhost:8000/news/foo -H "Accept: application/json"
```

This will change the "preferred format" on the request to `json`. Check it out!
It's a 404 status code but in a JSON format. We can even use `text/xml` to see
this in XML.

```terminal-silent
curl https://localhost:8000/news/foo -H "Accept: text/xml"
```

## How is a FlattenException Serialized?

How does this work? One of the normalizers in the serializer is called
`ProblemNormalizer`. I'll hit Shift + Shift to open it: `ProblemNormalizer.php`.

If you don't know much about the serializer component, the important thing to know
is that a normalizer is responsible for taking an object and *converting* it into
an array of data. Thanks to the `supportsNormalization()` method, *this* class is
used when you try to normalize a `FlattenException` object.

This class creates a response format that follows an HTTP specification: it helps
us return an official, standardized error response. It's pretty simple: it sets
keys for `type`, `title`, `status` and `detail`. In `$debug` mode, it *also* adds
`class` and `trace`. Also, the `detail` key in debug mode will be the exception
message... but in production, it will be the "status text", which is a generic
"Not Found" message or something similar, based on the status code.

So, the `normalize()` method is passed the `$exception`, which is the
`FlattenException`. But if you look back at `SerializeErrorRenderer`, it *also*
passes the *original* exception as an `exception` key on the `$context` - that's
the 3rd argument to `normalize()`.

So this gives us a really nice error response body, without any work. If you wanted
to *change* the response, you could do that by adding your *own* custom normalizer.
We actually talk about this in our
[API Platform Security Tutorial](https://symfonycasts.com/screencast/api-platform-security/custom-normalizer).
You could *decorate* the `ProblemNormalizer`... and maybe just add or tweak some
of the data *or* you could create an entirely *new* normalizer. Heck, you could
use the `$context` to make that *new* normalizer responsible for *only* normalizing
`ProblemNormalizer` classes for a *specific*, *original* exception. If you want to
try that and have problems, let us know.

Ok, close that class up. Next, let's find out what happens if the format is *not*
something that the serializer can handle. Like, HTML.
