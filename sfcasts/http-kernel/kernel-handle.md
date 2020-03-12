# Kernel Handle

Coming soon...

Let's start from the very beginning of the request. Whenever reload any page. The
first file it's executed is public /index dot PHP. No matter what, this is where it
all starts. So let's literally just go down this line by line and see what happens.
The first thing it does is require this config bootstrap dot PHP. For our purposes,
this isn't that important. It requires the composer auto loader, which is super,
which is great, and then the rest of this file is all about, it's kind of loading and
normalizing environment variables. So environment variables are very important for
Symfony as far as understanding the request and response flow. This is just set up
work. The next thing it does is if we're in debug vote, it calls debug colon, colon,
colon, colon, enable. That's great to set up some debugging tools, but it's not
really that important. The first thing we care about is down here, Colonel = new
Colonel. This is actually instantiating our source Colonel. That PHP file, the
Colonel and Symfony is the, the kernel is the heart of Symfony.

It handles everything and that's what we're going to see. Now notice the Colonel is
past the environment as the first argument and a debug flag as a second argument.
Okay, and that's something that's very important for how Symfony works because that
dictates a lot of it's behavior, but for our purposes it's not really that important.
The next line is very important. We always knew that there was a request object and
Symfony. If you ever wondered who creates the request to object or where did it come
from, it actually comes from this one line. This is Symfony creating the request
object. This colon colon create from Global's method. I'll hold command or control to
open. That is a shortcut that actually uses the normal below super global variables
in PHP to create a request object. So we give it this nice request object that
contains all that represents the current request information.

The next line is probably is probably my favorite line in all of PHP response =
Colonel->handle request that runs our application. We don't know yet what happens
inside of there. That's what we're going to figure out, but isn't it gorgeous? Our
entire application instead of being some weird global monster that we can't
understand how it works. Our entire application is a pure function input request,
output response. In fact, one of the properties of pure functions like this is that
you can call them as many times as you want. So in theory a single Colonel can handle
multiple requests. In fact, let's do that. Up here I'm going to say request one =
request colon colon create, which is just a shortcut to create a the requests object
and let's pretend that I'm creating a request object for our login page. So /login
and below that I'm going to create a request to, and we will send that, we'll pretend
that that is a request for registered. I'll check this out. I'll say response one =
Colonel->handle request one and then I'm gonna call handle again. Response two =
Colonel->handle request two. They'll show you what happens here on the bottom. I'm
going to dump response one, dump response two and then let's put a dye statement.

So if you go over here and refresh, check this out. We just dumped two different, we
just have two different requests on the same page. You can see the first one is for
the login page, title login, and the second one is for the registration page. That is
huge. And this idea of handling multiple requests and Symfony is something that
really happens. It's something that happens with sub requests, which is a topic that
we are going to cover in this tutorial. And also that other library that I need to
double check if this is true. Um, loads Symfony ones and then handles metal requests,
uh, to be super performance.

Remove all of this code. All right, so really if we want to understand what happens
in Symfony, we need to understand what happens inside of this Colonel->handle method.
We're going to be doing a lot of opening core files, so make sure that you have a
keyboard shortcut, um, to, uh, open a file in your project. In my case impedes your
storm, I'm gonna hit shift shift and I'm gonna open a class called HTTP kernel.
Technically the Colonel->handle goes to a different class, but that class eventually
really calls HTTP Colonel in. This is where all the magic is.

If we scroll down a little bit, here it is Colonel Aero handle, and the first thing
you'll see here is nothing really happens in this method except it surrounds
everything by a try catch. So almost immediately when our application starts running,
our code is surrounded by a try catch. We're going to come back to what that does
later, but the real logic is in this handle raw method. So scroll down a little bit
further to find, handle raw. This is the Symfony framework. These 50 lines of code or
so are the heart of everything that happens in Symfony and not just Symfony. These
same 50 lines of code run Drupal, these same 50 lines of code run PHP. These same 50
lines of code run any application that uses Symfonys, HTTP Colonel. So next, let's
start going through this. Find out how Symfony framework works under the hood.

