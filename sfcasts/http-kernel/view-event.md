# View Event

Coming soon...

So let's look, remember what we've done so far. It's really not that much. We
dispatch an event,

no,

found the controller, dispatch another event, found the arguments, and then
dispatched another event, and now we're dispatching another event. 
`ControllerArgumentsEvent`. There's no core important lessons on this. It's just another hook
point.

The difference between the `ControllerArgumentsEvent` and `ControllerEvent` is that
controller arguments event is actually past the arguments. So if you needed to do
something in the system that was based on what arguments were about to be passed to
the controller, then you'd listen to `ControllerArgumentsEvent`. This event also has
the possibility to change the controller or change the arguments on that event. And
then drum roll. We call the controller. Yes. This is literally where the controller
is called `$controller`  open parentheses, `...$arguments`. It's
that simple. And of course, what does our Symfony controller always return a response
unless it doesn't, and that's this next part. Check us out. Your controller doesn't
actually have to return a response. If what? If you return something different, then
you end up in this. If statement here or Symfony dispatches a view event, so
basically Symfony says the controller returns something.

It wasn't that response, so I'm going to dispatch an event and see if any listeners
to the events can transform what the controller return into a response. This is kind
of the view or the V and a true MVC framework. Normally in a Symfony controller, we
return a response, but you could, for example, instead of returning the response, you
can just return like an article and STI and then you can write a listener that
transforms that article entity into HTML, for example, by rendering the template
there and practice. This isn't used anywhere in Symfony's core.

but this is used internally, an API platform internally at API platform. Their core
controllers just return the object behind the API resource. Then they have a list and
they have a number of listeners on this event that transformed that object, like an
entity into JSON or XML, whatever the user is requesting. There's also a another
lesson on this comes from `SensioFrameworkExtraBundle`. No, I'm not going to talk
about that. So as you can see down here, it checks if event has response, I'm
actually gonna command and click on to `ViewEvent`. So if you have a listener on
this, they can go get controller results who get what the controller return. And the
important thing is actually it's in the parent class. So I'll hold open the request
of that parent class. They can call the `setResponse()` method to set the new response
onto that.

So if one of the listeners sent the response, then event, uh, then it calls
`$event->hasResponse()`. And if so `$response = $event->getResponse()`. So that's what happens
in API form. If none of the listeners, if no listener, set a response in the event.
Then finally Symfony panics down here and it says that controller must return a
response object, but it returned at something different. And of course, my favorite
part of this whole system, if `null = $response`. Did you forget to add a return
statement somewhere and your controller? So we've drawn this in our show action. I'm
just going to return on the first line, spin over, refresh that page. And there it
is. The controller must return a response object by it returned null. Did you forget
to add a return statement somewhere in your controller?

Okay,

so I'll go back and remove that. So at this point, we definitely have a `Response`
object. Either our controller return response object or a listener to `ViewEvent`
returned a response object. So finally down here we're done. We return 
`$this->filterResponse()`. What does this do? You can probably guess [inaudible] 
dispatches and event, but let's look into that next and actually finish the whole 
rest of the request response process.

