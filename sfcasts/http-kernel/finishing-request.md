# Finishing Request

Coming soon...

No matter what Symfony's job is to take in the re, look at the incoming request and
somehow convert that into response. That's the job of the HTTP kernel class and
specifically the handle raw. At this point we have a response object. Either our
controller returned the response object or a return something else and a listener to
the view event was able to turn that into response object. So ultimately the bottom,
we return this->filter response and pass in that response. And before we look at that
method, I'm going to show one other thing way up at the top of this. Remember the
very, very first event we threw, one of the things that listeners to that event can
do is actually set the response and if they do, it also calls this->filter response.
So no matter how we get the response, ultimately filter response is going to be
called a hold command or control and click into this to see what it does. What does
filter response to surprise? It dispatches another event called response event. This
is a number of interesting listeners on it. I'll actually go over and refresh our
page. I'll click any link to go into the profiler and then go to events. So down
here, here we go. Kernel dot response. That's the internal name of that response
event. So for example, one of the things this does is this is how the web profiler
work, how the web Depot two of our works look at web Debo, two of our listener on
kernel response,

any listeners to this event actually have the finished response. So very simply, that
listener checks to see if this is an HTML page. And if it is an HTML page, I'll
actually go up and click back to our page. If it is an HTML page search for script,
then it injects a whole bunch of JavaScript on the bottom. All this JavaScript here
is what's responsible for opening the web debug toolbar. So this is injected via a
listener on the response event.

Now as far as understanding the real mechanics of how Symfony handles the request and
calls a controller, there's no critical listeners, uh, to response listener. But
there are a couple of important ones. There are a couple of important ones like this
first one, uh, response listener. Let's actually open that up. So I'll shift shift
responses. Listener dot PHP get the one from HTB Colonel, not security. You can say
response listener fixes the response headers based on the request. So the key thing
down here is Encore response. This calls response arrow, prepare event->get request.
I'll hold command or control to jump into that. So basically once the response has
been created, this checks the response to see it has some missing pieces. For
example, if the con, if the response doesn't have a content type header yet it wasn't
something that was set, it actually uses some information on the request to to guest
the content type for you.

So get preferred format. I'll hold actually hold command to jump into that. This has
different logic in it. I won't go into the full detail here to either get something
called the request format to return the free form format or it can actually loop over
the content type headers to figure out which format to use. But basically it tries to
figure out what format does the user want, HTML, JSON or something else. And based on
that it sets the content type header so it doesn't a couple of them number other
normalizations down there to actually fix or prepare that a response. I'll close that
class and response listener. A few other interesting ones on here. Another one here
is called context listener. You can see it's actually part of the security
components. Let's open that guy up. Context listener, that PHP. This listens to a
couple of events. So let's scroll down here. Fund on current response so you can see
rights, the security token into the session. So if you use, um, a session based
firewall, this is the class that's actually responsible for taking your user,
technically your token.

Yeah,

and ultimately saving it into the session. Here it is, session arrow, set
this->session key serialize token. So this is actually what starts it. This is also
the class responsible for unsee. Realizing it at the beginning of the request.

Okay.

That is a couple of other ones. In here you can see there's a listener called
disallow robots indexing listener. A that's actually a config that supports that
configuration that you can do to return headers to uh, uh, disallow, um, robots
indexing your site. And down here there's a session listener, which I'll open that
one up.

Sesson listener is responsible for actually storing the session information. So
actually here at extends abstract session, listen to it. That's where the majority of
the logic is. It actually listens on, on current request, but we're, we're interested
in on kernel response. And you can see down here it does several things here, but it
actually calls it session safe. So all of these important background things are being
handled by these listeners. All right, so the point is once we get a response, we
this last event and then it calls finish request and then eventually returns the
response off of the event. So I'm going to go into finished requests. All this does
is dispatches one more event and then calls this error request stack error pop.
Remember this request that object is holding a collection of requests. Something
we'll talk more about soon. This removes the last one off of it.

So it basically removes the most recent one that was added earlier. So does the
opposite. If I scroll up, does the opposite of this request stack->push requests? So
ultimately we get a response, we return a response. All of this goes back to the
handle method on top and every return this around a raw where the whole that response
object we have is ultimately returned from Colonel Handel and it's ultimately
returned back. Giving back to that PHP response = Colonel->handled request. The last
two things that happen here, our response->send, I'll open that up, which is a fancy
way of this is where it actually sends the headers. An echo echoes the content. And
then finally Colonel Aero terminates. If we look at the terminate method here, I'll
look for it in my HDTV. Colonel surprise it, dispatches it. One more event. This is a
special event that's dispatched even after the content incentive, the user, nothing
critical listens onto this, but this is actually where the, um, all the profiler
data, all the data that was collected during the request to power this section,
that's actually where it's ultimately stored. You can see profile listener on Colonel
terminate it stores all of the data.

So that may have seemed like a lot, but really, if you look at it more specifically,
here's what happens inside Symfony, we dispatch an event, we find the controller, we
dispatch an event, we find the arguments, we dispatch an event, we call the
controller, and then via filter response, we dispatch another event, this furnace
request dispatchers at another event. And ultimately that's it in an index dot PHP,
we then send the headers and echo the content in dispatch one last event. So it's
kind of like five different steps. Controller arguments, call the controller with
events mixed in, in every single spots to make things happen. And most of those
events aren't critical for how Symfony functions. They're just convenient hook
points. And that's it. You just walked through the entire request response process.
The only thing we haven't talked about back in HTB kernel, if you scroll all the way
up, is remember the handle method is ultimately what it's called and it wraps handle
raw in a try catch. We haven't yet looked at what happens if an exception is their
own somewhere in the system, and that controls quite a lot. Let's look at that next.

