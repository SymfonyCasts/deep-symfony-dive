# Kernel Handle

Coming soon...

Let's start from the very beginning of the request. Whenever reload any page. The
first file it's executed is `public/index.php`. No matter what, this is where it
all starts. So let's literally just go down this line by line and see what happens.
The first thing it does is require this `config/bootstrap.php`. For our purposes,
this isn't that important. It requires the composer auto loader, which is super,
which is great, and then the rest of this file is all about, it's kind of loading and
normalizing environment variables. So environment variables are very important for
Symfony as far as understanding the request and response flow. This is just set up
work. The next thing it does is if we're in debug vote, it calls `Debug::enable()`
That's great to set up some debugging tools, but it's not
really that important. The first thing we care about is down here, 
`$kernel = new Kernel()`. This is actually instantiating our `src/Kernel.php` file, 
the Kernel and Symfony is the, the kernel is the heart of Symfony.

It handles everything and that's what we're going to see. Now notice the `Kernel` is
past the environment as the first argument and a debug flag as a second argument.
Okay, and that's something that's very important for how Symfony works because that
dictates a lot of it's behavior, but for our purposes it's not really that important.
The next line is very important. We always knew that there was a request object and
Symfony. If you ever wondered who creates the request to object or where did it come
from, it actually comes from this one line. This is Symfony creating the request
object. This `::createFromGlobals()` method. I'll hold command or control to
open. That is a shortcut that actually uses the normal below super global variables
in PHP to create a request object. So we give it this nice `Request` object that
contains all that represents the current request information.

The next line is probably is probably my favorite line in all of PHP 
`$response = $ernel->handle($request)` that runs our application. We don't know yet what happens
inside of there. That's what we're going to figure out, but isn't it gorgeous? Our
entire application instead of being some weird global monster that we can't
understand how it works. Our entire application is a pure function input request,
output response. In fact, one of the properties of pure functions like this is that
you can call them as many times as you want. So in theory a single `Kernel` can handle
multiple requests. In fact, let's do that. Up here I'm going to say 
`$request1 = Request::create()`, which is just a shortcut to create a the requests object
and let's pretend that I'm creating a `Request` object for our login page. So `/login`
and below that I'm going to create a `$request2`, and we will send that, we'll pretend
that that is a request for `/register`. I'll check this out. I'll say 
`$response1 = $kernel->handle($request1)` and then I'm gonna call handle again. 
`$response2 = $kernel->handle($request2)`. They'll show you what happens here on the bottom. I'm
going to `dump($response1)`, `dump($response2)` and then let's put a `die` statement.

So if you go over here and refresh, check this out. We just dumped two different, we
just have two different requests on the same page. You can see the first one is for
the login page, title login, and the second one is for the registration page. That is
huge. And this idea of handling multiple requests and Symfony is something that
really happens. It's something that happens with sub requests, which is a topic that
we are going to cover in this tutorial. And also that other library that I need to
double check if this is true. Um, loads Symfony ones and then handles metal requests,
uh, to be super performance.

Remove all of this code. All right, so really if we want to understand what happens
in Symfony, we need to understand what happens inside of this `$kernel->handle()` method.
We're going to be doing a lot of opening core files, so make sure that you have a
keyboard shortcut, um, to, uh, open a file in your project. In my case impedes your
storm, I'm gonna hit shift shift and I'm gonna open a class called `HttpKernel`.
Technically the `$kernel->handle()` goes to a different class, but that class eventually
really calls `HttpKernel` in. This is where all the magic is.

If we scroll down a little bit, here it is `Kernel->handle()`, and the first thing
you'll see here is nothing really happens in this method except it surrounds
everything by a try catch. So almost immediately when our application starts running,
our code is surrounded by a try catch. We're going to come back to what that does
later, but the real logic is in this `handleRaw()` method. So scroll down a little bit
further to find, `handleRaw()`. This is the Symfony framework. These 50 lines of code or
so are the heart of everything that happens in Symfony and not just Symfony. These
same 50 lines of code run Drupal, these same 50 lines of code run PHP. These same 50
lines of code run any application that uses Symfonys, HttpKernel. So next, let's
start going through this. Find out how Symfony framework works under the hood.

