# Events

Coming soon...

Hey friends, if you already know Symfony, but you want to really know it, like really
know how the pieces work under the hood, you've come to the right place. You're also
my kind of person cause I love to know how the under workings of systems behave. In
this first deep dive tutorial, we're going to go to the heart of of what happens
between during the request response process in Symfony, it is all centers around a
class called HTTP kernel, which is an amazing class because that same class is used
in the Symfony framework, Drupal, CMS, PHP, BB, the forum software, and many other
technologies. So how can one class be the heart of so many different technologies?
That's what we're going to find out as always, to get the most out of the tutorial,
you should download the course code and code along with me. After you unzip the code,
you'll find a start directory with the same code you see here. Follow this. Read me
to MD file down here for all the setup instructions. The last step will be to
leverage the Symfony binary to start a web server with Symfony surf. I'm actually
gonna pass the Symfony serve dash D. that's optional, but it runs Symfony in the
background as a Damon. So I get my terminal back.

Once you run that spin over and head to local host colon 8,000 to find the space bar.
Many of you might recognize this from our Symfony for tutorial. So I used it because
it's a fairly large project but it's been upgraded to Symfony five. So the big
question was this tutorial is that we know that every, we know that our job as a
developer starts with the request, the request comes into a server, then our
application does a bunch of work in the final product is the response. I want to find
out what happens between the request and the response. So for this homepage here, for
example, let's look at the controller for this source controller article controller,
and here it is homepage. This is the controller that renders that page and above it
is the route. So the one, the two things that we know happen between the start of the
request and the end of the response are the route the route is matched. And then
something calls our controller and our controller always returns a response. That's
actually what the render function returns is a response. What I want to find out
though is who executes the controller and who calls, who executes the routing and who
ultimately calls my controller. I want to see the code that does that.

To start this all off, go back to the browser and on the web Debo tool bar down here,
I'm going to click open this in a new tab. Click on the milliseconds, clicked open a
new tab and this will take me into the performance part of the profiler. This screen
is awesome. It's meant to show you where your site might be slow, but the really
great part about it is discovering what's happening inside of Symfony. And the real
trick here is to change this threshold from one milliseconds down to zero
milliseconds instead of hiding noise and now shows everything that happens between
the request and the response. So you can see here kind of in the middle here is our
controller. It takes 36 milliseconds to execute. You can see the twig templates being
executed below it and you can even see little doctrine queries happening various
times during that.

The biggest thing that noticed that this part is that most of the other lines you see
before and after the controller have the word listener on them or sometimes
subscriber, which can the same thing. These are event listeners on a high level. What
happens inside Symfony is it boots, some events, the beginning executes your
controller then triggers some more events and you're going to see that to get a
better view on this event stuff. We can click the events tab and this shows us all of
the events that were dispatched. So apparently there's an events called kernel dot
request. That's, that was the first event that was dispatched. And here are all of
the listeners. So all the functions that were called, uh, that listened to that.
There's another one called kernel, that controller and many other ones. And there's
also a few here for not called listeners.

So the first thing I want to do is actually hook into the request response process.
Let's create our own listener to this Colonel. Dot request event. To do that in the
source directory, I already have an event listener directory. It doesn't matter where
you put this class, but inside here let's create a new class called user agent
subscriber. All event subscribers need to implement event subscriber interface, the
one from [inaudible] and then I'm going to code generate or Command + N on a Mac and
go to "Implement Methods" to generate the one method we need which is get subscribed
events. So inside here I'm going to return an array of all the events that I want to
listen to, which right now is just going to be one. Now you might expect me to say
kernel that request. Normally I'd say come on requests on kernel requests. That means
is that I want this when the Colonel that request event happens, I want Symfony to
call an on kernel request method on this class, which I'm about to create, but this,
this will work, but this is actually an older way to do it. The Colonel of request
method has a new name. It's called request event ::class.

Little by little is replacing its event names as simple strings like Colonel that
request. It's replacing them with event classes cause it's just a lot easier to work
with. Next let's create a public function on kernel request. And inside of here I'll
do a dump and die for it's alive and that's all we need. With any luck, it's going to
call our event listener very early on in Symfony and kill the page. Let clause
profiler refresh and it's alive. Actually it's not, it's dead. We just had a dump and
die, but that's fine. So what's logged something inside of here. So I'm okay at a
public function_underscore construct. I'll type in the logger interface log, random
phrase logger and then I'm going to hit, um, I'll enter and go to initialize fields
to create that property and set it down here. We'll use that to say
this->logger->info and we'll say I'm logging super early on the request to show this
in comparison to the controller.

Let's also go to our controller and go to article controller. And for our homepage.
Let's also auto wire the logger. Enter the logger object here and I'll do a similar
thing. I'll say logger->info, but I'll just say inside the controller so we'd expect
the listener to be called first because the kernel that request event happens, the
request event happens before the controller. So when you go over and refresh this
time the page works. I'm going to once again open the profiler and a new tab, go to
logs and perfect. You can see the log from our events. Describe what happened first
and then the controller.

You can also see our subscriber inside of the performance section. Make sure you have
the threshold down to zero cause it's pretty fast. But let's see. There it is user
agent subscriber and then down way after that is the controller. What are the other
properties of an event is whenever you have a listener to an event, your listener
function's going to be passed in arguments. The nice thing is with these new class
event names is that the name of the events will match the type of object during the
past. So I'll say request events event and let's just D D that event in a little
while. When we dug further into Symfony, we're actually going to see why this
specific event kit gets that specific.

There were not, nevermind.

Well it's been over. I'll close the profiler again, refresh. And there it is. So
every event is going to happen, he's going to give you a different object and it's
always going to contain information that's relevant to that particular situation. So
for example, this one has the request object on it because if you're listening early
on in Symfony, there's a good chance that you'll want to use the request object to do
something. In fact, let's do exactly that. So let me clear out my method here and
we'll say request = event->get requests, it's a couple of gutters on here. And then
I'm gonna say user agent. Let's see if we're going to need the user agent off the
requests. So that's request->headers,->get, and they'll read the user agent header
off of there. And finally, let's log this, this air lager->info. I'll use sprint F to
say the user agent is percent S and pass the user agent for that string. So now we'll
go back, refresh. I'll open the profiler up in a new tab again, go down to logs, and
there it is right there, logging my user agent before the controller is executed. So
now that we've done a little bit of work hooking into Symfony, let's step back and
let's start tracing through what happens inside of Symfony from the very first line
of code that's executed to the very last. That is our deep dive.

