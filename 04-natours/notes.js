/*

SETTING UP EXPRESS

Let's start by create a simple server and do some basic routing, just to get an initial feeling of how we actually work in express.

In this project we start with the prettier extension file with the configuration for the single quotes.
We also have a config file for ESlint (we are going to set it up later in this section). Linting is to fix errors.

We now have a new project, and the first thing that we usually do in a new project is to create the package.json file.

1. NPM INIT - Note that the entry point is now app.js

2. NPM I EXPRESS

3. New file app.js - It is kind of a convention to have all the express configuration in app.js

In there we require express and create a variable called app (convention) and assign it the result of calling express().

Express is a function which, upon calling, will add a bunch of methods to our app variable.

The first method that we're gonna use is called .listen() to start up a server.
As arguments we pass in the port (create a variable for that) and a callback function (which will be called as soon as the server starts listening).

4. This is our port already listening, now, what we need to do is to define route. Remember that routing means to determine how an application responds to a client request (to a certain url and also the http method that is used for that request (get for ex)).

We define routing using methods of the express app object, which correspond to http methods, for example app.get() to handle get requests and app.post() to handle post requests.

In Express, the first method that we are going to use is the get method. In this method, we pass the url ("/" root url for now). Again, the route is the url and the http method.

Now we need to specify what do we want to happen when someone hits that url with a get request. For that we use a callback function that we specify as the second argument.

This callback function can accept a couple of arguments. The basic ones, the ones that we usually always need are the request and the response.
It is quite similar to what we've done in node, but in express they have a lot more data and methods on them.

For now we just want to send some data back quickly by calling the send() method on the response object response.send().

We can also specify the status code, which is very easy, all we need to do is to chain the status() method BEFORE the send() and specify our code in there.

For now that is all we need to do, if we start the app with nodemon we see the log of the app running on port 3000.

To test this api, we would now write the ip for local host on the browser with the port and see the response in there. But instead we now use postman, where we do the same.
The use of postman is yet to be known because it makes this api testing a lot easier for us.

The send method simply sends the string that we've specified, but we can actually send json to the client.
In the json method, we can pass an object with the keys and values that we want (right now just a message and the app name).
Now we have a nicely formatted json file.

Since we are just trying to get used to this, remember that get() is the http method for the request (when someone hits the url with a get request). 
So, the response that we are sending is only sent when a get method is sent to our server.
If we do a post method, express automatically sends back some html saying that cannot post with a 404. This happens because we don't have any route defined for the url (root) and for the http post method that the client is requesting.

In sum, for now two types of requests can hit the server, a get request or a post request and we need to specify a route for each one.
This is how we send different responses for different http requests, in this case we have the same root but a different response for each type of request.




*/
