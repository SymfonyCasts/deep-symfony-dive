# index.php to HttpKernel::handle()

Let's start from the *very* beginning of the request. When we load a page, the
*first* file that's executed is `public/index.php`. No matter what, this is where
it all starts. So let's literally go through this file line-by-line and see what
happens.

## index.php Bootstrapping

The first thing it does is require this `config/bootstrap.php` file. For our purposes,
this... isn't important. It requires the Composer autoloader... and then the
rest of this file is all about loading and normalizing environment variables. Sure,
environment variables *are* important to Symfony, but if you want to understand
the request-response flow, not so much.

Next, if we're in debug mode, it calls `Debug::enable()`. That's great to set up
some debugging tools... but not relevant to us.

## Hello Kernel

The first thing *we* care about is down here: `$kernel = new Kernel()`. This is
actually instantiating *our* `src/Kernel.php` class, which is the *heart* of our
application.

The `Kernel` is passed the environment as the first argument and a debug flag as
the second. That controls a *bunch* of behavior... but isn't very important
to the request-response flow.

But the next line *is* important. We always knew that there was a `Request` object
inside Symfony. If you ever wondered *who* creates the `Request` and *where*, here's
your answer: it's created in *our* code - not somewhere deep in the core.

The `::createFromGlobals()` method - I'll hold command or control to open that
method inside Symfony - is a shortcut to create the `Request` object and
populate its data with the normal superglobal variables, like `$_SERVER` and
`$_POST`. This gives us a nice `Request` object that represents the current request
info.

## HttpKernel::handle(): Our App in One Method

The next line... oh... the next line. This is probably my *favorite* line of code
in *all* of PHP: `$response = $kernel->handle($request)`. *That* runs our app.
We don't know exactly what happens *inside* that method - that's what we're going
to figure out - but isn't it beautiful? Our application & Symfony are *not* some
weird, global monster that takes over our PHP process and eats our objects.
Nope, it's a *pure* function. Input `$request`, output `$response`... which is
*exactly* what our job as a developer is! Understand the incoming request, and
use that to create a response.

One of the properties of a "pure" function like this is that you can call it as many
times as you want. So yes, in theory, a single `Kernel` can handle *multiple*
requests inside just *one* PHP process. In fact, let's do that!

Up above, let's say `$request1 = Request::create()` - which is another shortcut
to create a `Request` object. Let's make this look like a Request for our
login page. Pass `/login` as the first arg.

Now create a `$request2` variable and pretend that this is a request for `/register`.

Could we run our kernel and get 2 responses for these 2 requests? Uh... totally!
`$response1 = $kernel->handle($request1)`... and then
`$response2 = $kernel->handle($request2)`. Let's see what they look like:
`dump($response1)`, `dump($response2)` and then `die`.

Let's do this! Move over, refresh and... check it out! We just handled *two*
different requests on the same page! The first *does* contain the HTML for the
login page, and the second... for the registration page. Amazing.

And this idea of handling multiple requests in Symfony is something that really
*does* happen! It happens with sub-requests - a topic that we will cover later in
this tutorial - and some people use an event loop in PHP to boot a single kernel
and then handle *many*, *real*, HTTP requests.

Ok, remove all of this code. It's now obvious that if we *really* want to understand
what happens inside Symfony, we need to find out what happens inside of this
`$kernel->handle()` method. We're going be opening a *lot* of core files, so make
sure you have an easy way to "jump to a file" by typing a filename in your editor.
In PhpStorm, I can hit Shift+Shift to open a file called `HttpKernel.php`, which
lives *deep* inside Symfony. If you don't see it, make sure the
"Include non-project items" checkbox is checked - PhpStorm usually does that
automatically if you type a specific filename.

Once inside... scroll down to the `handle()` method.

## Hello HttpKernel::handle()

Ok, *technically* the `$kernel->handle()` method we saw in `index.php` is *not*
the `handle()` method in this class. Symfony *first* initializes the dependency
injection container - the topic of a *future* deep-dive tutorial - and *then* calls
this method.

The *first* thing I want you to notice is that the *entire* function is surrounded
by a try-catch block. So almost *immediately* when our app starts running, our
code is surrounded by a try catch! That's not important *yet*. But later, we'll
see what happens when an exception is thrown from *anywhere*.

The *real* logic of `HttpKernel` lives in this `handleRaw()` method. Scroll down
a little to find it. Ah yes: `handleRaw()`. *This* is the Symfony framework.
These 50 lines of code are the heart of *everything* that happens in Symfony! And
not just Symfony: these *same* 50 lines of code run Drupal, phpBB and many
other things!

So next: let's start our journey through this strange and wondrous method.
