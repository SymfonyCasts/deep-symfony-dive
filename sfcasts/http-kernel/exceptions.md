# Exceptions

Coming soon...

We've now walked through the happy path. We know how a successful request goes all
the way through the response process, but in index dot PHP, this Colonel handle call

basically me basically is this handle function inside H to be Colonel. Immediately
our entire application is wrapped in a try catch block. So basically if an exception
is thrown from anywhere, we're going to hit this catch here and as you can see, this
catch catch argument is sets a true by default. So we're not going to hit this a
catch block here. Basically if an exception is thrown anywhere in our code, we are
going to go to this handle handle, throw a bubble method. And it's an interesting
situation because no matter what in your application, like if your database is down
or you have some horrible bugs somewhere, ultimately you need to return a response to
your user even if that's a picture of your servers on fire. So simply somehow needs
to convert your exception into a response and that's the job of handle through
trouble. So hold command or control and click that to jump down to this method and
surprise. What does handable throw will do. It dispatches another event called the
exception event. Let's flip over here and I'll refresh the page. I'll go into a
profiler. Now, in this case, if we click on events, this page didn't have an
exception, so that event actually wasn't dispatched, but we can click on not called
listeners

and go down here and there we go. I want right past it, Colonel, that acception. You
can see that there are about five different listeners to those.

The most important one is this air listener, which we're going to look at in the
section second, but check this out. Look at router listener. That's the same class we
looked at earlier. It is a listener on on kernel exception and it's not really a
super important feature, but it's a fascinating look at the complexity of how the
features work inside Symfony. So let's check out that class. I'll hit shift shift, go
to router, listener dot PHP, and let's see here. Look down here. I'm looking for the
get subscribed events method. So yeah, you can see it. Let's just do Colonel events
exception on kernel exception with a priority of negative 64 which means that it
happens fairly late compared to other listeners.

Well, let's look for this on kernel exception events right here and interesting. So
let me tell you what this does and then we'll look at it in more detail. This is
actually the code that's responsible for rendering the Symfony five welcome page.
When you start a brand new project that has no routes, that's actually what this
create welcome response does. Down here, it actually renders a little PHP template.
I'll hit shift shift and open that up real quick. Little PHP tumble that says welcome
to Symfony and it has a bunch of information about documentation. So if you start a
new Symfony, five projects today, this is the first page that you're going to see.
What's really interesting is how this works.

So you can see here it looks for something, uh, it looks and checks to see. So if you
look back at age, to be Colonel, one of the exception event is past the actual
exception. And that makes sense. So any listeners to this event can actually look and
see what exception was thrown in router listener. It looks to see if the exception
that was thrown is an instance of not found HTTP exception, which by the way is the
exact type type of exception that we throw in a controller when we want a four Oh
four page file command or control to click create enough on exception look not found
HB exception. So we don't know exactly why yet, but this is the exception that you
can throw anywhere to create a four Oh four page but more on that in a second.
Anyways, this looks to check to see if the event is a not found age to be exception.
And then it looks to see if the previous exception, cause sometimes exceptions can
have a embedded exception is an instance of something called no configuration
exception. And if so it renders the lock and response.

So what happens here is that the router itself, if the router itself has a route not
found and it detects that there are no other routes internally, it throws this no
configuration exception. And this actually happens up here. If you scroll up a little
bit, this is the on Colonel request method that we looked at earlier. This is the
code that actually runs the router specific. So specifically the mass request of the
match method. Those are the methods that are going to throw that no configuration
exception. If a route can't be matched because there aren't no routes in the system,
the no configuration, et cetera, except an extends resource not found exception.
That's important because notice this entire thing here is wrapped in a try catch
block and it's catching resource not found exception. So in general, if the router
can't find something, it throws a resource, not found exception, but there's a
special case where if it can't find the route and there are no routes, it throws a
subclass of that called no configuration exception. So you can see here it's going to
catch the no configuration exception and that throws a new not found HTB exception
and it puts the previous exception on eat. So basically, so at this point, the not
found HCAHP exception is actually what's thrown

that's ultimately caught by the tri catch and eight to be kernel and the exception
event is dispatched with that not found HTTP exception. Then router listener listens
to that exception. And if it's a not found HTP exception and previous exception is no
configuration, it renders the welcome page. How about that? For different parts of
the system working together, we can actually see this in action. If you go to our
article controller, you can actually fake this in here, we're throwing a not fond HTB
exception, so there's not a real reason to do this, but we can kind of fake the what
the router does when there are no routes in our system. So the first argument here is
just a message. I'll keep that blank. And here, let's throw a previous exception.
Let's sort of the previous exception as new no configuration exception. All right, so
if we move over now I'll click back to go to a real article page. The real article
page still works, but we changed that to a article that doesn't work. Boom, welcome
to the Symfony Bible welcome page, which we just trick the system into showing pretty
cool.

Okay,

so I'll go back here and remove that code. Now, one interesting thing here is that in
HTB kernel, what Symfony ultimately wants is a response. It wants somebody to set the
response on this event. You can see down here it actually says mentioned, says
response = event and get response. So if we look at that exception event, it's
similar to the request event that we saw earlier, similar to the very, very first
event that's thrown inside Symfony. Actually, let me scroll up here. Remember in
handle raw, the very first event it's ever thrown in Symfonys or request event and
listeners to that event are able to set a response on it if they want to. This is the
exact same situation down here on handle. Throw a bowl, listen to this, can set a
response on the event. And the reason that if you look at the exception event, you
won't actually see that code inside of this class because it's actually in the base
class. So I'm going to hold command or control to open this request event. And if you
scroll down here, here's how you do it. Set response. And we saw that in router
listener event,->set response, and then this->create welcome response for that
welcome page.

So the key thing on that I want you to notice is that when somebody sets a response
internally, the event class calls a stop propagation, which if I hold command open,
that goes to another class. And that sets a little flag called propagation stopped.
So internally, what's going to happen is if you have, if you have multiple listeners
to the exception event, and one of them sets the response, the other listeners won't
be called. So it's basically the first listener to set a response on this is going to
win and the other ones won't be called afterwards. Let me close a couple of classes
here and go back to HTTP kernel.

So if we go back to the

profiler, if we go back to our page and click on the profiler and click on events.
This time, this was a four Oh four page. So Colonel dot exception is on the main
page. As I mentioned earlier, the most important one here is actually, um, this,
that's fine. So if we go back here and refresh this page, get our normal not found
page and I'll click anywhere down here to get to the profiler and go to events. And
this time, because this was a 44 page, the current of that exception was thrown. So
you can see down here. Now as I mentioned, the most important one here is actually
air listener. That's the most important listener.

So I'm going to go over and hit shift shift and open air listener dot PHP. Want the
one from HTTP kernel, not console that handles console EHRs. And let's look down here
for the uh, get subscribed events method. All right, cool and interesting. Check this
out. It actually listens to controller arguments. More importantly, listens to
currently exception and it listens on it twice. It listens on log kernel exception
and on kernel exception minus negative 28. So the law kernel exception is going to be
called first. And then on Colonel exception it's going to be called second be long
Colonel exception. That's up here on top is very simple. It's job is to log that an
exception was thrown. So if you followed this log exception logic down here, it
basically uses the logger, uh, and then based on the status code logs, either a
critical air or critical level air or a slightly labral level or slightly lower air
level. So it's a 500 it's critical. If it's lower then it's an error. And we're going
to talk about how the uh, how the exception gets the status code here in a second.

The other method on kernel exception, this is actually what's responsible for
rendering the error page. Whether that air page be the nice development air page or
your production error page. And it's got a priority of negative 128 because that
makes it very easy for you if you want to to register your own listener on Colonel
day, that exception. So if you want to do something different, you can register your
own listener, set the response and because your listener will be called first. And
because when you set the response that stops propagation, the on kernel exception
method won't be called, let's check out what happens inside that method. So on
criminal exception, let's see here. So first thing it does, you can see it's
referencing some property called this->controller. Let's actually check out what that
is. I'm going to go down here, Deedee, this->controller and spin back over here and
make sure you're on a four four page refresh and huh.

Okay, interesting. It's a string air_controller. If you find your terminal run bin
console, debug container air_controller, you're going to find out that air controller
is actually a service. So your renders air or exception pages from a given flatten
exception and it's class is something called air controller. So let's go over here.
I'm gonna hit shift shift and type air controller that PHP and open up that one and
check this out here. It has an_underscore invoke method. This is important. This is
an in vocable controller. We talked a little about it, about it earlier. Usually
controllers have the format of class name, colon, colon method name. But really it
wasn't ever the class name, colon called method name. It was the service ID colon
colon method name. It's just that for our controllers, our class name usually matches
our service name.

So it kind of looks the same, but in some cases you don't have to have. But if your
controller is an invulnerable controller, meaning it has an_underscore and folk
method, you didn't need the con colon colon syntax. You just needed the service ID.
That's enough for Symfony to know that it should use, uh, your con. It should, it
should, uh, execute your controller using the_underscore invoke method. So that is
kind of what's happening here. And check this out. An air controller in air listener,
let me take out that DD this is fascinating. So look, it takes the request, which is
passes an argument to this method. Oh no. Is that all right? It says, request =
this->duplicate request and it passes the exception and the original request, I'm
gonna hold command or control and jump down to that and check this out here. The
request object has a duplicate method on it, which does exactly what you think. It
creates a request that looks uh, exactly like the original request, but you can see
here that in the third argument here are the requests attributes. So it's basically
the same duplicate the request, but I want no query parameters, no request
parameters, which are post parameters. But I want to, and I want to pass in
specifically the attributes is chaff and for one of the attributes, it's
setting_controller to that air controller string.

Okay, so let's actually go back up here again to our income exception. So we now have
a request object which has a request attributes_controllers had the error listener
and down here, check this out. It says event->get kernel->handle. It's using the
aides to be Colonel handle method. This same one that we're using an index dot PHP.
It's actually handling a second request and getting back the response. And notice
here there's something called a sub request. Where does that more about sub requests
in a few minutes. But right now, what I want you to understand is that this is a very
fancy way of calling the error_controller controller. Not by calling it directly, but
by creating a request setting the_controller attribute to that value and handling it
by the HTB Colonel.

Okay.

Would, yes, it means that all I all, I thought about that. So next, let's look into
air controllers specifically and figure out what this thing does to actually render
the error.

