# FlattenException & Error Status Codes

The job of this `ErrorController` is to turn the `Exception` that was thrown into
a `Response`. By the way, the `error_controller` is actually configurable. So if
you want to control the exception on your site, we have two options so far. First,
register a *listener* to `kernel.exception` *or* override the error controller
via the `framework.error_controller` config.

But... if you did that, you would be responsible for rendering both the normal
exception pages and production error pages. If you want to *change* how an error
page looks, there are better ways. We'll see.

Inside the `__invoke()` method, the `ErrorController` *immediately* offloads the
work to someone else - something called the `errorRenderer`. That returns some
sort of exception... which apparently has `getAsString()`and `getStatusCode()`
methods, which this uses to return the `Response`.

## The SerializerErrorRenderer

Let's... find out what this `errorRenderer` thing is:
`dd($this->errorRenderer)`. Move over and refresh. Ok cool: it's something called
`SerializerErrorRenderer`. And actually, it only uses this class because this
project has the *serializer* component installed. If you did *not*, this would
be a different class - we'll see that other class in a moment. And, by the way,
this *whole* "error renderer" thing is part of a Symfony component called
`error-handler` that's new in Symfony 4.4.

Let dig in! I'll close a class, then hit Shift + Shift to open
`SerializerErrorRenderer.php`. Perfect!

## The All-Important FlattenException

`ErrorController` calls this `render()` method, which *immediately* calls
`FlattenException::createFromThrowable`. A `FlattenException` is basically a
visual representation of an exception. And notice: this render method *returns*
a `FlattenException`.

Hold Command or Ctrl to jump into this class. Yea, see: it's not *actually* an
exception - it doesn't extend `Exception` or implement `Throwable`. But it
*does* contain a lot of the same info, like the exception `$message`, `$code`,
`$previous` and the stack trace.

The `FlattenException::createFromThrowable` - if we jump to that - is a way to
easily create this "visual representation" based on a real exception. And *this*
contains some pretty important stuff. For example, if `$exception` is an instance
of `HttpExceptionInterface`, then it calls `$exception->getStatusCode()` to get
the status code and `$exception->getHeaders()` to get headers. Both the status
code and headers are *ultimately* two properties that are stored on this
`FlattenException` object and *used* by `ErrorController` when it creates the
final `Response`.

## Why do Some Exceptions Cause Different Status Codes?

So... what *is* this `HttpExceptionInterface` thing? We've actually seen it.
Go back to `ArticleController`. We know that `$this->createNotFoundException()`
is a shortcut to instantiate a new `NotFoundHttpException`. Click to open that
class... and click again to open its *base* class `HttpException`. Here it is:
`HttpException` implements `HttpExceptionInterface`.

This is a *long* way of showing you that certain exception classes in Symfony -
like `NotFoundHttpException` map to a *specific* status code *because* they
implement `HttpExceptionInterface` and because `FlattenException` uses this.

Why does `NotFoundHttpException` *specifically* map to a 404. It calls
`parent::__construct()` with 404... that is set to a `$statusCode` property...
and then returned from `getStatusCode()`. You can *also* pass custom `$headers`
to the exception.

There are a number of other exceptions like this. I'll double-click on the
`Exception` directory at the top of PhpStorm. Wow! There are a *bunch*, like
`BadRequestsHttpException`, which will give you a 400 status code,
`PreconditionFailedHttpException`, which will be a 412 and many more. If you
throw any of these exceptions from *anywhere* in your app, they will trigger
an error page with the correct status code. This is a *powerful* thing to
understand.

Back in `FlattenException`, there is also another type of exception interface called
`RequestExceptionInterface`. It's not as important and it always maps to a 400
status code.

If the exception doesn't implement either of these interfaces, the status code
will be 500.

These are the *most* important parts of the `FlattenException`. Close this class
and go back to `SerializerErrorRenderer`. The job of this method is to create
a `FlattenException` object *from* the exception and make sure it contains three
things that the `ErrorController` needs: a status code, headers and a
*string representation* of the error, which will become the *body* of the response.
We've got the status code & headers... but we *still* need to somehow generate a
"string" representation of this exception. Let's see how that's done next.
