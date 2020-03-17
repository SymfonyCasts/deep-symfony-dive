# Events, Events & Events!

Hi friends! Ok: so you already know how to use Symfony... maybe you... use it
every day. Heck, I love it so much, I've been known to use it on vacation! And
now, you're ready to go deeper - to find out how Symfony *really* works
under-the-hood. If this is you, welcome! We're in for a wild ride.

In this first deep dive tutorial, we're going to the *heart* of what happens
during the request-response process in Symfony. It all centers around a
class called `HttpKernel`, which is an *incredible* class. This *one* class
is used as the *heart* of Symfony *and* Drupal... as well as a bunch of other
projects, for example, phpBB - the famous forum system.

So how can one class be the *heart* of technologies that are seemingly *so*
different? That's what we're going to find out.

## Project Setup

As always, if you *truly* want to impress your friends with your *deep*
knowledge of Symfony, download the course code and code along with me. After you
unzip the file, you'll find a `start/` directory with the same code that you see
here. Follow the `README.md` file for all the *thrilling* setup instructions.

The *last* step will be to leverage the [Symfony binary](https://symfony.com/download)
to start a web server with `symfony serve`. I'm actually going to pass `-d` so it
runs in the background as a daemon:

```terminal-silent
symfony serve -d
```

Now, *spin* back over to your browser and head to https://localhost:8000 to
find: The SpaceBar. Some of you might recognize this from our Symfony 4 tutorials.
Well, I've upgraded it to Symfony 5 and it will be our *perfect* guinea pig for
diving deep into Symfony.

## Request -> Controller -> Response. But what else?

Ok: we know that *everything* starts with a request: a request comes into our
server, it's handled by our application, yadda, yadda, yadda, a response comes
out... and profit! The goal of this tutorial is simple: find out what *really* happens
in between.

For the homepage, let's find its controller: `src/Controller/ArticleController.php`.
Here it is: `homepage()`, with the route above it.

The two things that we *know* happen between the start of the request and the end
of the response, are that the route is matched and then *something* calls our
controller... probably Fabien personally calls it... I don't know. And then
our controller always, well *usually*, returns a response. That's what
`$this->render()` returns.

What I want to know is: *who* executes the routing and *who* ultimately calls
my controller? I want to see the code that does that!

## Holder of Secrets: The Profiler Performance Tab

To start this journey, go back to your browser and, on the web debug toolbar on
the bottom, right click on the milliseconds link and open it in a new tab to
jump into the "Performance" section of the profiler.

This screen is *awesome*. It's *meant* to show you where your site might be slow,
but its *real* superpower is that it can show you *everything* that's happening
inside of Symfony. The trick is to change this "threshold" input box from 1
milliseconds down to 0... so that it doesn't hide anything.

Simply gorgeous. This is the request-response process. You can see - kind of in
the middle here - is our controller: it took 36 milliseconds to execute. You
can see the Twig templates being executed below it, and even little Doctrine
queries happening along the way.

The biggest thing I want you to notice is that most of the other lines - both
before and after the controller - contain the word `Listener`, or sometimes
`Subscriber`, which is basically another word for "listener".

Because, at a high level, here's what happens inside Symfony: it boots, triggers
some events, executes your controller, then dispatches some other events.

To get an even *better* view of these events, click... the Events tab! This
shows all the events that were dispatched during this request. So, apparently
there's an event called `kernel.request`: that was the *first* event dispatched.
And here are all of the listeners - so all the "functions" - that were called
when that event was triggered.

Then there's another event called `kernel.controller`... and many more. You
can even see listeners for events that were *not* triggered during this request.

So... let's start messing with stuff! Next, let's create our *own* event listener
and execute code *before* our controller is called.
