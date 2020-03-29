# How the HTML Error Page is Rendered

When you use a browser, the format will be `html`. That's also the *default* format
if no request format was set and if the request doesn't contain an `Accept`
header. In the case of `html`, the serializer will fail by throwing a
`NotEncodableValueException`. When that happens, this offloads the work to
*another* error render: `$this->fallbackErrorRenderer`.

If you dumped this object, you'd find out that it's an instance of
`TwigErrorRenderer`. Ok! Let's open that up: Shift + Shift `TwigErrorRender.php`.

It... interesting! It immediately calls *another* `fallbackErrorRenderer`. This
one is an instance of `HtmlErrorRender`. Open it up: `HtmlErrorRenderer.php`.

## Error Renderer Decoration

Then... stop. Let me explain *why* and *how* we have *three* different error
renderer classes. This `HtmlErrorRenderer` is the, sort of, "core" error renderer
and it *always* exists. But *if* you have Twig installed, the
`TwigErrorRenderer` suddenly "takes over" the error rendering process. It does
that via service *decoration*: `TwigErrorRenderer` *decorates* `HtmlErrorRenderer`.

And then... if you have the serializer component installed, suddenly there is
a *third* error renderer added to the system: `SerializerErrorRenderer`, which
decorates `TwigErrorRenderer`.

This is a *slight* over-simplification, but there is basically only ever *one*
official "error renderer" service registered in the container. It's `id` is
`error_renderer`. But through service decoration, multiple error renderers
are ultimately used.

## HtmlErrorRenderer: Default Exception & Error Templates

Let's look at the flow. `TwigErrorRender` calls `render()` on `HtmlErrorRenderer`.
Remember: the `render()` method on *all* of these classes has the same job: to return
a `FlattenException` that contains the status code, headers and the "body" that will
be used for the Response.

So, it's no surprise that this *once* again starts by creating a `FlattenException`
object. To get the "body" of the response, it calls `$this->renderException()`.
Jump to that.

*This* is what builds the error or exception page. The `$debugTemplate` argument
defaults to `views/exception_full.html.php`. Yea, this method render PHP templates!
This template will be used in `debug` mode. If we're *not* in debug mode, then it
"includes" - basically, renders - `error.html.php`. So `exception_full.html.php`
in debug mode, `error.html.php` on production. The `include()` function is as
simple as it gets.

Let's go *see* the debug template. Using the directory tree on top... click the
`error-handler/` directory, then navigate to open
`Resources/views/exception_full.html.php`

*This* is what we're seeing in our browser right now. To prove it, in the middle,
let's add:

> I'm inside your exception page!

Back on the browser, refresh the 404 page. There's our text! Go... take that out.

So this template and `error.html.php` are responsible for rendering the debug
and production HTML error pages out-of-the-box.

Close `exception_full.html.php`... and also `HtmlErrorRenderer.php`.

## TwigErrorRenderer: Twig Overrides

Back in `TwigErrorRenderer`, this starts by getting the `FlattenException` from
`HtmlErrorRenderer`. So then... if we *already* have the finished `FlattenException`,
what's the point of *this* class?

This *entire* class exists to give *you* - the application developer - the ability
to *override* what the error template looks like. `$this->findTemplate()` is used
to check if you have a Twig *override* template. If you don't, the `FlattenException`
from `HtmlErrorRenderer` is used. But if you *do* have an override template, it
renders that and uses *its* HTML.

## Twig Namespaces & Override Templates

Scroll down to the `findTemplate()` method. Cool! It first looks for a template
called `@Twig/Exception/error%s.html.twig`, where the `%s` part is the *status*
code. The `@Twig` thing is a Twig *namespace*. Every bundle in your app automatically
has one. Want to render a template from `FooBarBundle`? You could do that by saying
`@FooBar` then the path to the template from within that bundle.

This is *normally* used as a way for a bundle to render a template *inside* itself.
But Symfony *also* registers an *override* path for every bundle namespace.
When you say `@Twig/Exception/error404.html.twig`, Twig *first* looks for the
template at `templates/bundles/TwigBundle/Exception/error404.html.twig`.

*Anyways*, if this template exists because you created it, it will be used.
Otherwise, it looks for a generic `error.html.twig` that handles all status codes.
*This* is how the Twig error template overrides work.

And... phew! That's it! `SerializerErrorRenderer` renders XML & JSON pages, or,
really, anything format that the serializer supports. `HtmlErrorRenderer` renders
the HTML pages and `TwigErrorRenderer` allows you to override that with
carefully-placed Twig templates.

## Finishing the Process

Close both of the error renderers. We *now* know that there are *many* ways to
hook into the exception-handling process. You can override `ErrorController`,
listen to the `kernel.exception` event, customize the `ProblemNormalizer` for
JSON or XML exceptions *or* add a Twig template override for custom HTML.

No matter what, `ErrorListener` sets this `Response` onto the `ExceptionEvent`.
In `HttpKernel`, if the event has a response, there's a bit of final status code
normalization, but it eventually passes the `Response` to `filterResponse()`. So
yes, even an error page will trigger that event, which is why a 404 page *has*
the web debug toolbar.

Ok team, we're now *truly* done walking through the HttpKernel process: both the
happy and unhappy paths. Next, let's use our new knowledge... to start hacking into
the system.
