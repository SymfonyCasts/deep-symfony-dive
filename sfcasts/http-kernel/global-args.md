# Global Args

Coming soon...

In our continued challenge to figure out what kind of cool things we can hack into
Symfony. Let's pretend that one of the things we need to know in our application is
whether or not the user visiting our site is using a Mac or not. Okay. Just pretend
like that's something we need. In fact, we use this information in so many places
that we want the ability to have an `$isMac` argument on any of our controllers like
this. We want to be able to do that on any controller anywhere. So now that we've
added that argument, let me `dump($isMac)` right here. And not surprisingly, when we
refresh that page, we get an air. The controller's show requires that you provide a
value for the $isMac argument. And actually let me go back to a real page, but that
won't make any difference. Okay? So how can we make this work? There are actually two
answers that we've seen and we're going to go through both of them. The first one is
kind of the lower level way of doing it.

and it works like this. And we know that if we have a `{slug}` wild card, we are allowed
to have a `$slug` arguments. So in theory, if we had an `{isMac}` wildcard, we
could have `$isMac` argument. But of course we don't, we don't want one. But really
it's not that we're allowed to have a `$slug` argument because there's a `{slug}` wildcard.
We're allowed to have a `$slug` argument because there is a `slug` key in the request
attributes the route the router puts it there because the wild card, but really the
arguments here come from the request attributes. So what we can do inside of our
listener is let's say `$isMac = stripos($userAgent, 'Mac')` does not equal false
[inaudible]. So there it is that simple enough. We just look for Mac instead of a
user agent and then on here and we can now say `$request->attributes->set('isMac', $isMac)`
and that's it. And suddenly when we refresh we are allowed to have in `$isMac`
argument. And of course for me it's set to true. So this is the lower level way of
doing things. And then this is always worked in Symfony more recently in Symfony
something point something.

The other way was added to do it. The `ArgumentValueResolver` remember when we were
going through how the arguments are determined? We found out that there are various
classes that determine all the arguments that you're allowed to have your controller
and we can actually add our own.

Okay,

so let's do that instead of the `src/` directory. It doesn't matter, but I'll put it
in `Service/`. Let's create a new class called `IsMacArgumentValueResolver`. The only
rule is that this class must implement and `ArgumentValueResolveInterface`.
I'll go to the Code -> Generate menu or Command + N on a Mac and go to "Implement
Methods" to implement the two methods that we need. Now, before we do anything else,
this class is already being used by the core of Symfony as an argument resolver. If
you remember when we went through the argument resolvers I hinted that the way that
you get an argument resolver into the system is you have to have a service that's
tagged with `controller.argument_value_resolver`. So we use that back to run 

```terminal
php bin/console debug:container --tag=controller.argument_value_resolver
```

We use this command as a way to print all of the argument value resolvers that are in
Symfony
and now if you look at these service at ease here, it took this out. One of them is
for `App\Service\IsMacArgumentResolver`. It's got this debug thing around it because
a Symfony is decorating all the services by `TraceableValueResolver`. It does that
just to add more debugging information, but that is our service being used there
because it already has that tag. Thanks to Symfony's auto configuration feature.
Anyways, let's go fill in the logic. So here's how I want this to work. Very simply.
If the argument name is exactly `$isMac`, we'll fill in our value. So for supports
we'll say return `$arguments->getName() === 'isMac'`. And then if it is, we'll
pair logic down here. First, let me go grab the `$userAgent` from our subscriber and
I'll paste that. And then here I'll also go and grab our little `stripos()` logic. And
then I will delete those two things. They're not working anymore. And finish up is
our the our resolver by saying return `stripos($userAgent, 'Mac')` does
not equal false. Now if we move over and refresh

Oh, an error can I use yield can use yield from only with a raise and traversals my
bad, bad habit. This actually this method returns a traversable so you need to eel
the value, not an important detail except that you get a huge error if you forget it.
There we go and now it works and we still have true down here.

So a while ago and this tutorial right now, Oh, previous in the tutorial, we actually
changed our code in this controller. Right now we're getting the slug value directly
and then we're querying for it and then we're manually throwing the 404
originally the code looked like this instead of a `$slug` argument. We had an `$article`
argument type into with `Article` and then we didn't need to do the query because it
was being done for us and we didn't need to do the 404 part cause that's
also done for us. Question is how and what is doing that for us. At first you might
think this is probably an Argument Value resolver, but it's not one that we saw in
the list. I don't see anything here about like doctrine or entity value resolvers
nothing that would make me think that that's how that's working and in fact this is
working via a different system. So if I refresh right now, you can see that the page
still works, but if we put a value that won't be find found, it's going to give us a
hint. Look, it says app entity article object not found by the `@ParamConverter`
annotation and it's coming from a class called `DoctrineParamConverter`, which if
you trace things down here is coming from something called the parameter

coming from something called the `ParamConverterListener`. I want to start there. So
let me go over. I'll hit shift shift. `ParamConverterListener.php`. This
functionality comes from `SenseoFrameworkExtraBundle`. So it's actually hooking
into Symfony and doing some cool stuff. The first thing I want you to notice is that
this implements `EventSubscriberInterface`. This is an event listener and it listens
on the `kernel.controller` event. So this is the event that's dispatched right after
the controller is determined, but before the controller is executed. And that makes
sense. If this class is going to do some magic on the arguments to our controller,
it's going to need to know what those arguments, which control is is so it can read
the arguments. I'm not going to go to the details of this class too much, but
basically this loops over all of the parameters, all of the arguments of our
controller and get some metadata about them. Most importantly, it gets metadata
about, uh, the class, the type hint on that class. So this specific class just
collects metadata about each argument. And eventually if you look at the stack trace
here, this actually calls into something called `DoctrineParamConverter`. That's
really where all the magic happens. So let me hit shift shift 
`DoctrineParamConverter.php`

And again, just from a high level, we'll look at this. Here's the apply method. What
this does is it gets the class here, which will actually be whatever the type hint is
and then eventually,

tries different ways of querying for that. So for example by the ID, `$this->find()` and
actually checks that class tries to skip the identifier for the class. Like the
primary key gets the entity manager for that class if there is one and then
ultimately tries to call a method to find that entity. So it's querying for that
entity. The really cool part is no matter how it finds your entity, so this if we
have, if we follow a logic down here, eventually it takes that queried article object
in, it sets it on the request attributes. So name here in our case is going to be the
word `article`

and the object at this point is going to be the `Article` object that it queried from
the database. So this is kind of a fancier system that ultimately re use it. The same
request attributes thing behind the scenes to set that in there since their
framework. Extra mental also comes with various other kind of shortcuts and
annotations that you can add to your controller and all of these work via listeners
and really, really cool ways. So if you want to keep learning more, go and find out
how, go and check out some of the other, uh, listeners that come from 
`SensioFrameworkExtraBundle` and see how they work. So if we go back to our main page and
refresh, everything still works. Next, let's talk about a huge topic that we've seen
a little bit about so far. I want to talk about sub requests.

