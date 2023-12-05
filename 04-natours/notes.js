/*

SETTING UP EXPRESS

Let's start by create a simple server and do some basic routing, just to get an initial feeling of how we actually work in express.

In this project we start with the prettier extension file with the configuration for the single quotes.
We also have a config file for ESlint (we are going to set it up later in this section). Linting is to fix errors.

We now have a new project, and the first thing that we usually do in a new project is to create the package.json file.

1. NPM INIT - Note that the entry point is now app.js

2. NPM I EXPRESS

3. New file app.js - It is kind of a convention to have all the express configuration in app.js

4. In there we require express and create a variable called app (convention) and assign it the result of calling express().
Express is a function which, upon calling, will add a bunch of methods to our app variable.

5. The first method that we're gonna use is called .listen() to start up a server.
As arguments we pass in the port (create a variable for that) and a callback function (which will be called as soon as the server starts listening).

6. This is our port already listening, now, what we need to do is to define route. Remember that routing means to determine how an application responds to a client request (to a certain url and also the http method that is used for that request (get for ex)).

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

UNCOMMENT
// 4
const express = require("express");
const app = express();

// 6
app.get("/", (request, response) => {
  response
    .status(200)
    .json({ message: "Hello from the server.", app: "Natours" });
});
app.post("/", (request, response) => {
  response.status(200).json({ message: "You can post to this endpoint" });
});

// 5
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

API'S AND RESTFUL API DESIGN - Theory lecture.

Now that we know what express is, we are almost ready to start building our api, but before we need to talk about api's on a higher level.

The most used API architecture is the restful api.
We have talked about api's before, more specifically web apis, where we build an app that sends data to a client whenever a request comes in.

Imagine that we have our app running on a server and we have a client, in fact, we have two pieces of software talking with each other.
This is the kind of api that we will build in this course.

Apis are not always related to data and aren't always related to web development or javascript. Take for example the node's fs or http API's (node api's), the browser's DOM javascript api or exposing methods in classes to the public in oop (we are creating an api).

Like this we understand that api has a broader meaning than just building web apis.

In the context of node, a web api is what's most important to us, so let's take a look at the rest architecture to build apis.

REST stands for representational states transfer and it is a way of building apis in a logical way, making them easy to consume.
To build restful apis, or to build apis following the rest architecture, we just need to follow a couple of principles.

1. Separate our api into logical resources. 
The key abstraction of information in rest is a resource, therefore, all the data that we wanna share in the api should be divided into logical resources.

But what actually is a resource? In the context of rest a resource is an object or a representation of something, which has some data associated to it.
Any information that can be named can be a resource (it has to be a name, not a verb), in our app we have tours, users or reviews.

2. These resources should then be exposed (made available) using structured, resource-based url's.

This means that we need to expose the data using structured url's that the client can send requests to. 
For example:
https://www.natours.com/addNewTour
This ENTIRE address is called the url, and the /addNewTour part is called an api endpoint.

So, our api will have many different endpoints, each of which will send different data back to the client, or also perform different actions.

But, as you might guess, there is something very wrong with the endpoint that we've just described because it does not follow the third rule.

3. To perform different actions on data, like reading, creating or deleting, the api should use the right http methods and NOT the url.

This means that our endpoint example is wrong because the endpoints should only contain our resources and not the actions that can be performed on them. 
In the examples we have one endpoint for each action that we want to perform, /getTour, /updateTour, /deleteTour, etc. 

But this shouldn't be made with/in the url endpoint, we should have one endpoint for /tours, and in there use the right http method to perform those actions. If /tours endpoint is accessed with get() we send data to the client, if it is accessed with a post() we expect data to come in with the request, so that we can create a new resource on the server side.
Otherwise, this becomes a nightmare to maintain.

The ability to update resources is done with a put() or a patch() request to the endpoint. The difference between them is that with put, the client is supposed to send the entire updated object, while with patch it is supposed to send only the part of the object that has been changed. But both of them have the ability to send data to the server, a bit like post with a different intent.

Finally, to delete a resource, there is the delete() http method. To delete, the client must be authenticated.

So these are the five http methods that we should respond to when building our restful apis:
post() - create, get() - read, put() - update, patch() - update, delete() - delete.
These are the four basic CRUD operations that the client can perform.
CRUD stands for create, read, update and delete.

There might be actions that are not crud, like search operation or a login, in that case we need to be creative with our endpoints.

4. The data that we send back to the client or the data that we receive from the client should usually use the json data format, with some formatting standard applied to it.

All the keys have to be strings, it is also typical for the values to be strings as well, but they can be other things like numbers, booleans, other objects or even arrays of other values.

Before we send the data back to the client, we do some simple formatting.
There are a couple of standards for this formatting and we're gonna use a very simple one called JSend.

We simply create a new object, add a status message to it (in order to inform the client whether the request was a success, fail or error) and we put our original data into a new object called data.

Wrapping the data into an additional object is called enveloping and it is a common practice to mitigate some security issues and other problems.

There are also other standards for response formatting that we can look into like JSON:API or the OData JSON protocol.

5. Finally, another important principle of rest apis is that they must be stateless.

What does stateless actually means? In a stateless restful api all state is handled on the client and NOT on the server.
This means that each request must contain ALL the information necessary to process a certain request on a server, the server should not have to remember previous requests in order to process the current request.

State simply refers to a piece of data in the application that might change over time. For example whether a certain user is logged in or on a page with a list of several pages (what the current page is).

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

STARTING TO BUILD OUR API

We start by implementing the tours route.

GET REQUESTS
1. Again, we use app.get() with the url "/api/v1/tours".
It is a good practice to specify the version of the api, like that, if we want to do some changes we do them on version 2 (without breaking everyone who is still using v1). RESEARCH

After the route, we write our route handler (express term for the callback). So, what we want to do when someone hits this route is to send back all the tours.
Again, we have the tours endpoint, where we send back all of the data for that resource (tours).

We have all the tours in the dev-data folder (the tours-simple.json file).

2. Before we can send the data, we need to read it. We don't do this inside of the route handler, but before, in a synchronous way.
Remember that the top level code is only executed once, which is right after the app starts (no blocking code inside of the event loop).

Remember that the __dirname is the location (in our case is the folder) where the current script is located.

Note that we parse the result of reading the json file in the same step so that the json that we have is converted to a javascript object (an array of javascript objects is our case).

3. Now all we need to do is to send it back to the client. The default status code is 200, but it is not a bad practice to specify it. 
As good practice, when we are sending multiple results (multiple tours), we should create a property to specify their quantity to the client.
This just makes sense when we are sending an array with multiple objects, if we were sending just one tour this wouldn't make sense.

As for the json() method, remember that we are going to use the JSend json formatting standard, so we specify a status (can be success, fail or error) and the data properties.
As for the data property, it is the so called envelope for our data. We specify the data property and, inside, we have an object that contains the response(data) that we want to send (tours). 
If the key and the value are the same tours: tours, we don't have to specify the key, i left it like this in order to make more sense. The key must be equal to the endpoint.

POST REQUESTS

Let's now implement a route handler for the post request so that we can add a new tour to our dataset.

4. Just like with the get() handler, let's start by adding a new route with the same url. So for getting all the tours and for creating a new tour, the url is the same, only the http method that we use for post request in this case. 

Then we have the usual callback where we get access to the request and the response objects so that we can retrieve some data from the request and send back an appropriate response.

Remember that, with a post request, we can send data from the client to the server. Ideally, this data is available on the request object (which holds all the data/information about the request that was done).

If the request contains some data that was sent, it will be on the request. Out of the box, express does NOT put that body data on the request. In order to have that data available, we have to use something called middleware.

5. We will talk about middleware in detail, for now we just need to include a simple middleware at the top of the file. 
express.json() is the middleware, middleware is a function that can modify the incoming request data.
Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

6. Now, body is the property that is going to be available on the request because we've used that middleware. NOTE that when we are testing, we always need to send a response in order to finish the req res cycle.

The next part is to work on postman. First, note that we can save all the requests in a collection. This is specially handy for what we are about to do, which is to simulate a request made to our server as a post request with a body.

This body is the data that we want to send to the server. In the body tab, there are several ways of doing this, but the easiest is to choose raw and application json.

Now, all we have to do is to specify some json and that will get transmitted to the server. Remember that json is an object in which everything must be in double quotes (key and value, not the numbers).

{
  "name": "Test Tour", 
  "duration": 10, 
  "difficulty": "easy"
}

These properties are of course related to the ones that we have on all tours, so it is obvious that, if we want to create a new tour in the app, we should have a form (later CONFIRM) with these fields to fill.

Now we have the following javascript object in the req.body (no longer json):
{ name: 'Test Tour', duration: 10, difficulty: 'easy' }

Without the middleware we would get undefined as the response.

We have the post route all set up, it is working, we also have access to the req.body so, what we want to do now is to persist the data into the tours-simple.json file.
IMPORTANT - This (and maybe all the others) file acts like our fictional database for now. We are going to modify it to save the users tour into it.

7. The first thing that we need to do is to figure out the id of this new object. Remember that whenever we create a new object, we never specify the id of that object, the database usually takes care of that.
In databases, a new object usually gets it's id automatically. 

Since we are not yet in databases, what we can do is to take the id of the last object and add one.

7.1 - Next we create a new tour, which will be req.body and the id that we created. We can use object.assign(), this allows us to create a new object by merging two objects together.

7.2 - Now we push this new tour into the tours array.

7.3 - Now we write the file in order to persist this data. Here is where we overwrite the file, so that when we restart the app it will be there (also when we have a new request the id also counts with the new tour)

We need to stringify the tours array (of objects) because we want to write a json string. 

7.4 - As for the callback, what do we want to do as soon as the file is written? usually we send the newly created object as the response.
The status is now going to be 201, which means created.
The json is not going to have the number of results because it is just one and the data will have the new tour as tour.

IMPORTANT - He said that this wouldn't work right away because we needed to restart the server. It actually makes sense because the tours file (where our tours are coming from) is read outside of the event loop (so in the top code), meaning that it will only be read once (at the beginning).

However, this actually works already because whenever we save something in the tours-simple.json, the server restarts (making the tours be read with the new data).

UNCOMMENT
// Core modules
const fs = require("fs");

// Third party modules
const express = require("express");
const app = express();

// 5.
app.use(express.json());

// 2.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 1.
app.get("/api/v1/tours", (req, res) => {
  // 3.
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      // tours: tours,
      tours,
    },
  });
});

// 4.
app.post("/api/v1/tours", (req, res) => {
  // 6.
  // console.log(req.body);

  // 7.
  const newId = tours[tours.length - 1].id + 1;

  // 7.1.
  const newTour = Object.assign({ id: newId }, req.body);

  // 7.2.
  tours.push(newTour);

  // 7.3
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 7.4
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );

  // res.send("done"); // to finish the cycle
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

RESPONDING TO URL PARAMETERS

In this part, we are going to learn an easy way of defining parameters right in the url, how to then read these parameters and also how to respond to them.

What we want to implement is a way of getting only one tour. Right now we have the /tours endpoint, which gives us all tours. 

So, we want something like this: http://127.0.0.1:3000/api/v1/tours/4

The /4 represents the id of the tour. If we hit the /tours endpoint without any id we get all the tours, but if we specify an id after that we get the corresponding tour.
Of course it doesn't have to be an id, it can be any unique identifier.

The 4 in the url (the id) is a variable, it is 4 now but it can be anything else. Meaning that the piece of the url where the id is placed is a variable.

1. This means that we need to define a route that can accept a variable.
It is of course another get request and, in the route, all we need to do is to add that variable.
We have the / and the variable we define it using a colon :
/api/v1/tours/:id

Just like this we've created a variable called id (remember that it could be anything else (x,y, whatnot)).

2. req.params is where all the parameters (all the variables that we define in the url) are stored, so it is from there that we are going to retrieve the value.

If we test the endpoint with the variable in postman, let's say that we wanted tour 4, the req.params log shows the following:
{ id: '4' }

The potential for this is huge because we can define multiple variables in the url, however we would have to define ALL of the routes (or always define them in the url, which is not good). If we define three variables and we just make the request to the server with two of them we get an error.
One solution for this is to mark optional parameters. 

Say that we want the x parameter to be optional, we just add a ? after it. Now we no longer have to specify it in the url.

/api/v1/tours/:id/:x?

3. Now, all we need to do fetch the tour with the id that is specified in the url.

For this we use the find() method. We need to convert the req.params.id into a number.

4. Now we just need to sent that tour as a response, the only thing to point is that the key and the value are the same, so we don't need to do tour: tour,

5. If we now test this with an id that is greater (does not exist in our api), we still respond with the 200 status of success but with an empty data object.

To fix this we can so a simplistic solution, remember that we are just scratching the surface and getting the basics, this is not yet the real deal.

So if the id is greater than tours.length return (we want to exit the function right at this point) and send a status of 404 not found and a simple json response.

The fail status is for when we have a 400's code. 

(remember that .length is not zero based, so it will count the exact number of elements(objects) in the array, that is why in order to give the right id to a new tour we had to use -1)

We could have done the same logic after we tried to find the tour, so if there is no tour !tour (undefined if the id was invalid) apply the same return logic.

UNCOMMENT
// 1.
app.get("/api/v1/tours/:id", (req, res) => {
  // 2.
  // console.log(req.params);

  // 3.
  const id = Number(req.params.id);

  // 5.
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  const tour = tours.find((el) => el.id === id);

  // 4.
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

HANDLING PATCH REQUESTS

After get and post, let's handle patch requests to update data.

We have two http methods to update data, put and patch.

With put, we expect that our application receives the entire new updated object.
With patch, we only expect the properties that the user wants to update in the object. 

We use patch because it is easier to work with the properties than with the entire object. Also, when using mongo, this is what we will do most.

1. We expect a patch request to come in on the url and we also need the id of the tour that should be updated.
"/api/v1/tours/:id".

2. What do we want to do when there is a patch request? We want to update the data.

We are not going to implement the data update operation, that is just a matter of writing some more javascript that is not really important. 
We would have to get tour from the json file, change that tour and then save it again to the file.

Instead, we just send a standard response. The code still 200 for updating a resource.

3. We can also implement the same logic for when the id is not valid.
Now we are ready to test in postman, test to change the only the duration on the body of the request to the tour with id = 3. 

IMPORTANT
This is just a testing API using files, in the real world we are never going to use files for that.

In this module, we are just implementing all the common verbs (get, post, patch, put, delete) to get a general idea of them, the kind of status codes that we send back, send the number of results when the request asks for several, etc.
This is what is important here, the basics of working with express and also the correct way of sending back API responses. 

// 1.
app.patch("/api/v1/tours/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  // 3.
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  // 2.
  res.status(200).json({
    status: "success",
    data: {
      tour: "Here is where we would send back the updated tour",
    },
  });
});

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

HANDLING DELETE REQUESTS

The last of the crud operations is the delete request.

Just like in the previous lecture, we are not implementing the deleting of a resource in the route handler.
Again, we are only dealing with files, which is not a real world scenario.

The procedure is very similar to the patch, we still need the id of the tour that we want to delete and the testing id logic.

1. As for the response, the code that we usually send on delete requests is a 204. 204 means no content because we usually don't send any data back, instead we just send null as data.
The status is still a success of course but the data is null in order to show that the data/resource that we deleted no longer exists.

app.delete("/api/v1/tours/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  // 1.
  res.status(204).json({
    status: "success",
    data: null,
  });
});
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

CODE REFACTORING - Refactoring our routes.

Right now we have all these routes in the code (the http method + url together with the route handler).

We have these routes and the respective handlers kind of all over the place one after the other.
This makes it hard to read what route we have in the code. All the routes should be together and also the handler functions (separate from the routes).

This is the code that we started with:

// Core modules
const fs = require("fs");

// Third party modules
const express = require("express");
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Read
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Read
app.get("/api/v1/tours/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// Create
app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// Update
app.patch("/api/v1/tours/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Here is where we would send back the updated tour",
    },
  });
});

// Delete
app.delete("/api/v1/tours/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

1. We start by exporting all the handler functions into their own function. Remember that we don't call the functions in the http methods, it is a callback.

Exporting the callbacks already make the code more readable but it still not perfect because, let's say that we want to change the resource name (tours) or change the api version.
We would have to change it all of the http methods.

The first idea that comes to mind is to do kind of the same thing that we've done with the callbacks, like store the url's in variables, but we can use a better tool.

2. We use the route() method, where we specify the route that we want, then we specify what we want to happen on get and on post. Basically, this route() method allows us to chain the different http methods that we have for the same route.

So, from this:
// Read
app.get("/api/v1/tours", getAllTours);
// Read
app.get("/api/v1/tours/:id", getTour);

// Create
app.post("/api/v1/tours", createTour);

// Update
app.patch("/api/v1/tours/:id", updateTour);

// Delete
app.delete("/api/v1/tours/:id", deleteTour);

To this:
app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

The code that we end up with:

// Resource name (read sync outside of the event loop)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Functions
// 1.
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Here is where we would send back the updated tour",
    },
  });
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

MIDDLEWARE AND THE REQUEST-RESPONSE CYCLE

In the last couple of lectures we went through the fundamentals of express.

Now we need to go a bit deeper into how express works, for that we need to talk about middleware and the request-response cycle.

The essence of express development is to understand and then use the req-res cycle.

To start off the req-res cycle, our express app receives a req when someone hits our server. For this req(get for ex), it will create a request and a response object.

That data will then be used and processed to generate and send back a meaningful response. In order to process that data in express, we use something called middleware.

The middleware can manipulate the req or the res objects and really execute any other code that we would like. Mainly, middleware is more about the request (remember that we didn't have access directly to the body of a request obj before express.json()).

It is called middleware because it is a function that is executed between, or in the middle of receiving the req and sending the res.

Some examples of middleware are express.json() (also called body parser), logging functionality or setting some some specific http headers. 
The possibilities are endless with middleware.

In more technical terms, we say that all the middleware together (that we use in our app) is called the middleware stack. 
What is important to keep in mind here, is that the order of middleware in the stack is defined by the order they are defined in the code.

So, a middleware that appears first in the code is executed before another that appears later. This means that the order of the code matters a lot in Express.

We can imagine this hole process to be like this: 
1. The req and res objects that where created at the beginning (upon a request hitting our server), go through EACH middleware (where they are processed or some other code is executed).

2. Then, at the end of each middleware function, a next() function is called. We have access to this function in each middleware function. Upon calling the next() function, the following/next middleware in the stack will be executed, with the same req and res objects.

This happens with all the middlewares (functions) until we reach the last one. Here the function is usually a route handler, just like we coded before.
In this handler, we do not call the next() function, instead we finally send the response data back to the client.
This marks the end of the req res cycle.

Just like this, the initial req and res objects, go through each middleware step by step.
We can think of this hole process as kind of a pipeline that our data goes through. 

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

CREATING OUR OWN MIDDLEWARE

app.use(express.json());

We've already used middleware before, remember that we say app.use() (calling the use() method on app) to use/add middleware to our stack.

In our case, calling the json() method on express basically returns a function. This function is then added to the middleware stack. 
Similar to that, we can create our own middleware functions.

1. We use the app.use() to pass in the function that we want to add to the middleware stack.
Remember that, in each middleware function, we have access to the req and res objects but also the next function.
So of course that it is practical to add them all as arguments in the function that we want to add. req res and next are the convention names in express.

IMPORTANT
We NEED to call next(), otherwise the req res cycle gets stuck at this point.

2. In order to test this we are going to just log something to the console and make any kind of request to our api.
We have our log, meaning that the this middleware applies to every single type of request that is made to our server. Still with this idea in mind, we can say that our route handlers are themselves kind of middleware. 
The only difference is that they only apply for a certain url/route.

The more simple middleware functions that we define at the top of our code, they apply to every type of request, no matter the route. This if the route handler comes after in the code.

For example, if we cut this middleware function and use it AFTER a route handler, when we make a request to that route the log from the middleware does not appear. This occurs because the handler for that route ends the req res cycle because it sends a response with res.json().
If the cycle is finished, the middleware does not get called. 

We define this middleware before all our route handlers.

3. We can create as many middleware functions as we like. But, in this one, let's actually manipulate the req object.

4. What we want to do is to add the current time to the req. We just need to create a new property on the res object.
With this we are pretending that we have some route handler below that needs the information about when exactly the request happens.

5. Now we could go to the handler for all the tours and simply log this.
We could also send this in the response.

 // 1.
app.use((req, res, next) => {
  // 2.
  console.log("Hello from the middleware.");
  next();
});

// 3.
app.use((req, res, next) => {
  // 4.
  req.requestTime = new Date().toISOString();
  next();
});

// Resource name (read sync outside of the event loop)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Functions
const getAllTours = (req, res) => {
  res.status(200).json({
    // 5.
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

USING THIRD PARTY MIDDLEWARE

Let's now use a third party middleware function from npm called morgan, in order to make our development life a bit easier.

As reference, the middleware is in the resources tab of the express website.

This is a very popular logging middleware. This function will allow us to see request data right in the console. 
So, we will be able to see the information about the request (the http method, the url, the status code, the time it took to send back the response and the size of the response in bytes).

This is code that we will include in our application, so we need to install it as a regular dependency and not as a development dependency.

1. Of course, the first thing is to require it.

2. Now let's use this middleware function in our code. In this function we pass an argument that will kind of specify how we want the log to look like.
We can use some predefined strings for that, we use "dev", but vscode shows us the options.

// 1.
const morgan = require("morgan");

// Third party middleware
// 2.
app.use(morgan("dev"));

This is it, we've required it and we've used it. However let's try to understand how this works.
Calling the morgan function will return a function similar to the ones that we've wrote in our middleware:

(req, res, next) => {
 
  next();
}

This makes sense because this is how a middleware function has to look like.

After making a request, this is the log
GET /api/v1/tours/26 404 3.133 ms - 40

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

IMPLEMENTING THE "USERS" ROUTES.

In this lesson we just kind of implement the users route.
We write the code structure (the route without the id, the route with the id and the handlers/controllers) but their functionality is to simply send the corresponding error to the client.
We implemented this second resource just so we can refactor all the code in the next lesson.

Let's start to implement some routes for the user's resource.

Our api will have a couple of different resources. The first one, that we've already started to implement, is the tours resource.

Another one will be the users resource, so that, for example we can create user accounts and have different user roles.

For now, this user's resource will be similar to the tours resource, but it is important to start implementing it now for what we are going to learn next.

Don't forget to read the users file async and outside of the event loop.

1. So let's go to our routes, now the route is going to be /users.

We can start to see the structure that we are following. Usually, when we do get() or post() on a route without the id, it means that we either want to get all the users (all the elements/objects that are part of one resource) OR want to create a new resource on the server (in this case a new user) with post. 
This pattern is always gonna be the same.

So, we respond to the both request methods (get and post) using the functions/routeHandlers that we created like before.


2. When we receive a get request with the id, it means that the client wants to get one user. Then we might receive a request to make changes (patch) or to delete the user.

// 1.
app.route("/api/v1/users").get(getAllUsers).post(createUser);

// 2.
app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

As for the functions, we are not implement what we should. 

For all the route handlers, we will simply send back a message that this route is not yet implemented, the status is 500 (internal server error).
We still send back a json object with a status "error".

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

CREATING AND MOUNTING MULTIPLE ROUTERS

In this lecture, things will start to get more advanced, we will now create multiple routers and use a process called mounting.

Before we start, keep in mind that the ultimate goal is to separate all the code that we have in this file into multiple files.

What we want is to have one file that contains all of the routes for the tours resource, another file for the routes of the users resource, one file for the tours handlers and another for the users handlers. This we will do in the next lesson, for now, and to be able to do this, we need to create one separate router for each of our resources.

If, at this point, we go to the routes code, we can see and say that all the four routes (2 for the tours and 2 for the users) are ALL on the same ROUTER.
That router is the app object, but if we want to separate these routes into different files (one for each resource route), the best thing to do is to create one router for each of the resources.

Continue after reviewing the code so far.

CODE SO FAR

// CORE MODULES
const fs = require("fs");

// THIRD PARTY MODULES
const express = require("express");
const app = express();
const morgan = require("morgan");

// THIRD PARTY MIDDLEWARE
app.use(morgan("dev"));

// MIDDLEWARE
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware.");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// RESOURCES (READ SYNCHRONOUSLY OUTSIDE OF THE EVENT LOOP)

// >>>>>>> Tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// >>>>>>> Users
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

// FUNCTIONS - ROUTE HANDLERS
// >>>>>>> Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Here is where we would send back the updated tour",
    },
  });
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// >>>>>>> Users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
// ROUTES

// >>>>>>> Tours
app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// >>>>>>> USER'S

app.route("/api/v1/users").get(getAllUsers).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// SERVER START
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});


Creating a router for each of the resources is not that complicated, but it is necessary to wrap our head around a couple of concepts.

1. Let's start by saying that tourRouter is = express.Router();
Like this, we create a new router and save into the variable.
const tourRoute = express.Router();

2. Now let's use this router for these two routes. For that we use that variable instead of the app object.
tourRoute.route("/api/v1/tours").get(getAllTours).post(createTour);

3. So far so good, but using the variable instead of the app object actually disconnects the routes from our application. In order to connect this new router with our application we need to use it as middleware.

In fact, the new, modular, tourRouter is a real middleware (express.Router()).
If it is middleware we can say app.use the tourRouter in our application.
And where do we want to use/run the middleware? We want to use it in the users specific route (first argument of the get method)
app.use("/api/v1/tours", tourRoute);
NEEDS TO BE AFTER WE DECLARE THE VARIABLES.

At this point we need to understand that, like this, it is as if we have created a sub app for that route. So, being a new sub app for a route, means that the tourRouter middleware only runs on the route that we've specified upon use(). Being so, that becomes the root when we are in the router.

This process is mounting the router. Mounting a new router on a route. Meaning that we can only use() the routers after we declare them in the code.


// 1.
const tourRouter = express.Router();
const userRouter = express.Router();

// 2.
tourRouter.route("/").get(getAllTours).post(createTour);

tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
>>>>>>> User's
userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);


// 3. 
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

With this, we are no able to separate our different routers into different files in the next lecture.


ALL THE CODE BEFORE REFACTORING:

// CORE MODULES
const fs = require("fs");

// THIRD PARTY MODULES
const express = require("express");
const app = express();
const morgan = require("morgan");

// THIRD PARTY MIDDLEWARE
app.use(morgan("dev"));

// MIDDLEWARE
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware.");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// RESOURCES (READ SYNCHRONOUSLY OUTSIDE OF THE EVENT LOOP)

// >>>>>>> Tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// FUNCTIONS - ROUTE HANDLERS
// >>>>>>> Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Here is where we would send back the updated tour",
    },
  });
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// >>>>>>> Users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

// ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

// >>>>>>> Tours
tourRouter.route("/").get(getAllTours).post(createTour);

tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

// >>>>>>> User's
userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// Need to use the routers only after we declare them.
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// SERVER START
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

CODE REFACTORING - A BETTER FILE STRUCTURE

Remember from the last lesson that we want to separate our routers into different files. That will be the first step that we will do here.

1. We create a new folder called routes, in there we will have one file for tour routes and one for the user routes.

It is needless to say that we are going to start working with modules.

2. We start with the tour router, we move all the respective code in there, require the modules that we need at the top (express) and export the router.

Now that we are separating the routers into their own file, it is a convention to call the variable router instead of tourRouter (we already make that distinction in the name of this module).

To export the router, since we only have one thing to export we use module.exports.
At this point we also put in this module the route handlers/functions, so that the code doesn't brake. Also, we move the files that we read synchronously (all the tours).

3. Now we import both of the routers into our main file (app.js). To do that, since we've used module.exports, we can simply define the variable with the router name. 
Note that we need the fs module on tourRoutes and, also in there, we need to change the readFileSync path because our __dirname there makes us jump one time to go to the dev data.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

With this we have the routers separated into different files. We can say that each of them is one small sub application. Now it makes more sense to see. It is then in the global app.js that we import and mount the routers on the two different routes.

It needs practice to automate and understand these tactics, for now just keep in mind that we've created these different routers for each of the resources to have a nice separation of concern between these resources.

Basically, creating one small app for each of them and putting everything together in one main app file. 

This main app file is mainly used for middleware declarations.
This means that here we have all the middleware that we want to apply to all the routes.

For now, we have four middlewares that we want to apply to ALL of the routes (the morgan to have a nice log of the req; the express.json to have access to the req body and the other two that we've created).
THEN, FOR THE TOURS ROUTE, we want to apply the tourRouter middleware AND FOR THE USERS ROUTE, we want to apply the userRouter middleware.
LIKE THIS IS BECOMES EVEN MORE CLEAR.

4. Now we need to remove the route handlers from the routes files. For this we will create a new folder and name it as controllers.
In there we have two files, tourController and userController.

5. After passing all the route handlers and the async code that is needed (just for the tours), we need to export all of these functions from this module.
In this case we do not have just one export, so we will put all of these functions into the exports object.
exports.getTour = () => {}

6. Now we import them in each of the routes. 
const tourController = require("./../controllers/tourController");

Like this, the variable becomes an object with all of the handlers that we need, all we need to do is: 

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

We could have used destructuring in order to write them directly, but it is better like this.

THE FLOW GOES LIKE THIS: 
We start receiving the requests in the app.js file

Then, depending on the route, enter one of the routers.

Let's suppose that is the tours router, in there, again depending on the route (if the request is for the root (now app.use("/api/v1/tours", tourRouter);) or for the id) and also depending on the type of the request, it will execute one of the controllers.
After this, the response gets sent and the req res cycle finishes. 
LECTURE 63.

7. The last step is to create a server.js file.
This is done because it is a good practice to have everything that is related to express in one file (app.js) and everything that is related to the server in another main file (server.js).

This means that, starting now, server.js will be our starting file where everything starts and it is there where we listen to our server.

We move the respective code into the file and import our application (which is exported from app.js).

With this, app.js has everything that is related with the application configuration in one standalone file.

As for the server.js, we will later have other stuff in this file that is not related with express, but still related with our application (database configurations, error handling, environment variables). All of this will live in this server.js, which is kind of, but NOT, our entry point.

We need to change the script for nodemon because we no longer listen to app.js, we listen the server.js file.

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

PARAM MIDDLEWARE

Let's create a special type of middleware called param middleware.

This is middleware that only runs for specific parameters, basically, when we have a certain parameter in our url.

In our example, the only parameter that we might have in our route is the id. So, we can write middleware that only runs when the id is present in the url.

We write this code in the router, so in one of the routes file that we have.
We will do this in the tourRoutes file (userRoutes code don't actually do anything at this point).

1. On our router, we call the param() method. This method accepts a string as the first argument, this is where we specify the parameter that we want to search for (the parameter for which this middleware is going to run).
The second argument is for the function/callback/handler.

As usual with middleware, we get access to the req, the res objects and also to the next() function.
However, the param method gives us access to a forth argument, which is the value of the parameter in question. We call it val.

2. For now we just log the result of val when we make a req with the id of the tour (if we don't specify the id, no log appears.)
Also, NEVER forget the next() function.

// 1.
router.param("id", (req, res, next, val) => {
  // 2.
  console.log(`Tour id is ${val}`);
  next();
});


This function will not run for any of the user routes (because it is only specified in this router - in this mini application).

To review all the process, let's suppose that we have an incoming request on tours/id route. 

The request will go through all the middlewares in the app.js (middleware stack). When it reaches the routers middleware, it will get into the tourRouter middleware, where the response is given and the req res cycle ends.

This is how param middleware works, it is not that useful for now because we only have the id to work with. However, there is a practical use case that we can use here.

If we go to our handler functions file, so the controllers for the tours route, we see that all the handler functions that use the id need to check if the id is valid (getTour(), updateTour() and deleteTour()). 

All those functions use the same code, which is not a good practice because we repeat ourselves (also notice that it is with req.params.id that we make the check).
The solution is, of course, to create a 
param middleware and perform the check outside, with a outside middleware that is going to run before the request hits the handler functions.
Notice the importance of the return statement in that code, if we don't use it, the code will still running, go through next() and the next middleware, where we send another response (which gives us an error, we want the code to stop if the id is not valid.)


We write AND export this middleware function in the controller. So that we can call it in the tourRoutes before all the other code.

router.param("id", tourController.checkID); IN TOUR ROUTES.

We should always work with the middleware functionality instead of creating a function inside of each controller so that we can validate the id inside of the controllers that need it. Like this the controller function is clean an does just what it needs to do, having just one purpose.
They can get the tour, create it or delete it, but the validation is not in their concern. 

Even if we add another controller depending on the id, the validation was something that we no longer have to worry about because the code flow checks for it before.

This is a very important tool to write express applications.
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

CHAINING MULTIPLE MIDDLEWARE FUNCTIONS.

We do this for the same route of course. Up until this point, whenever we wanted to define a middleware we only ever passed one middleware function.

For example (in the tourRoutes router), to handle the post request for creating a new tour, we only passed in the createTour middleware function that is in the tourController file. This is the only function to be called whenever we get a post request.

Let's say that we want to run multiple middleware functions. We might want to do this, to run a middleware before createTour, to check the data that is coming in the body. Just like we did for the id, before the actual route handlers (so that they are only concerned with getting, updating, or deleting).

In this example with post, we might want to do the same thing.

So we start by writing the code in the tour controller to export. DON'T FORGET THE NEXT() WHEN BUILDING MIDDLEWARE.

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "No name or price for the tour",
    });
  }
  next();
};

Then we just need to add this middleware function to the post stack, this is how we chain different middleware:

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

The post request arrives, the code from the checkBody runs, if everything is ok the next() will call the createTour middleware.

We will use this kind of logic all the time though this project because it is very useful. Chaining multiple kind of handlers for the same route in order to make checks (if a certain user is logged in, of if he has the privileges (access rights to be able to write a new tour) or all the things that we want to check before the tour is actually created).

We use this because we want to take all the logic there is not concerned with creating the tour/resource outside of that handler.
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

HOW TO SERVE STATIC FILES WITH EXPRESS (from a folder and not from a route like we did with all the tours).

First of all, what does static files actually mean? Those are the files that are sitting in our file system, which we can't access by using our routes, currently.

For example, we have the overview.html file in the pubic folder, but there is no way that we can access this using the browser, the same goes to the images files etc simply because we haven't define any route for a url like this: 3000/public/overview.html.
We do not have any handler that is associated with this route.

This to say that if we want to access something from our file system, we need to use a built in express middleware.

We do this in the app.js file of course.
In this section we are just talking about the api, so there is no need to serve static files like images or html, but since this is an introduction to express, this content is also important.

As we said, we use a built in middleware where we pass the directory from which we want to serve static files, we are going to use the public folder.

In order to see this in the browser we do not include public in the url, just: http://127.0.0.1:3000/overview.html

Although the images aren't there, this already works.

So why don't we need the public folder in the url? Because, when we open up a url that the browser can't find in any of our routes, it will then look into the public folder that we defined and king of sets that folder to the root.
So this http://127.0.0.1:3000/overview.html in now this public/overview.html

Like this we can open any file that is in the public folder. What we can't do is public/img because this is not a file and it seems a route that the browser can't find.
It only works for static files (.html, .png)

When we make a request for a static file, like the html, there is a series of requests to our server in order to get all of the assets of that file.

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

ENVIRONMENT VARIABLES

What they are, how we set them and how we use them.

This is not exactly about express, it is about nodejs development in general, but we need this to move on in the project.

So, nodejs, or express apps, can run in different environments. The most important ones are the development environment and the production environment.

Because, depending on the environment, we might use different databases for ex., we might turn logging on or off or turn debugging on or off. All kinds of different settings that might change depending on the environment that we're in.

The most important are those two, but there are others that bigger teams might use.

This type of settings that we've mentioned, like different databases or turn logging on or off, this will be based on environment variables.

By default, express sets the environment to development, which makes sense for when we start a new project.

For demonstration purposes, let's look at that variable in the server. Remember that everything that is not related with express we do outside of app.js (this one we only use to configure everything that is related with the express application).

console.log(app.get("env"));
development on the console.

So, development is the environment that we're currently in. app.get("env") will get us the "env" environment variable.

In summary, environment variables are global variables that are used to define the environment in which a node app is running. 

The "env" variable is set by express, but nodejs itself sets a lot of environment variables. Let's take a look at those as well. These are located at process.env.
console.log(process.env);

This log shows us a bunch of different environment variables that node uses internally.
These variables come from the process core module and were set at the moment that the process started. We didn't even had to require the process module because it is available everywhere.

In express, many packages depend on a special variable called node NODE_ENV
This variable is kind of a convention that should define whether we are in development or in production mode.
However, express does not define this variable, we have to do that manually.

There are multiple ways in which we can do it, but let's start with the easiest one, which is to use the terminal.

Remember that when we start the process we do it with npm start (nodemon server.js). So, we use nodemon server.js to start the process, but if we want to set an environment variable FOR this process we need to prepend that variable to the command that we use.
So this is how it should look like:

NODE_ENV=development nodemon server.js

At this point, already have in mind the these variables must be defined BEFORE the process is started.

Again, many packages on npm that we use for express development depend on the NODE_ENV environment variable. So, when our project is ready and we are gonna deploy it, we then change the variable to production.

We usually use environment variables like configuration settings for our application. So, whenever our app needs some configuration for things that might change based on the environment that the app is running in, we use environment variables. 
For example we might use different databases for development and for testing, so we could define one variable for each and then activate the right database according with to the environment.

Also, we can set sensitive data like passwords and user name using environment variables.

It is not really practical to define all of these variables on the command when we start the app/process.
Instead, we create a config file config.env
env is really the convention for defining a file which has these environment variables, that is why the extension of the file is recognized by vs code.
In that file we define the variables in uppercase (convention). In there we defined the environment, the port is also a convention to define and then some sensitive data like a user and a password.

With the variables created and set, we need a way of connecting the config.env file with our node application.
We need a way of reading these variables from this file and then saving them as environment variables.

The standard technique to do this is to use a package called dotenv (npm i dotenv). 
We require the module in the server and use the config() method on it. In that method we need to pass an object to specify the path to our config file.

This command reads the variables from the file and save them into nodejs environment variables.

const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const app = require("./app");

Now, to use these variables, we go to app.js and only run the logger middleware when we are in development. We have access to the variable in there because the reading of the variables from the env file to the process only happens once. They are then available all over the place. console.log(process.env);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

On the server, we use the same condition but for the port.

IMPORTANT - When we tested with a request we saw that our logger wasn't working, even with the environment variable set to development.

That happened because, on the server, we are requiring the app file before the environment variables are read from the config file. This needs to happen the other way around, otherwise the NODE_ENV variable, as we as the others, will be undefined. 

As the final part, this allows us to create different scripts in the json file. We can create one for development, which is the same as before, and one for production. In production, we want the script to only change the NODE_ENV variable to production, so:

"scripts": {
    "start:dev": "nodemon server.js",
    "start:prod": "NODE_ENV=production nodemon server.js"
  },
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

SETTING UP ESLINT AND PRETTIER

Eslint is a program that constantly scans our code and finds potential coding errors or bad coding practices.

It is very configurable so that we can fine tune it to our needs and coding habits.
We can also use eslint for code formatting, but we will keep using prettier for that.

Prettier will keep being our main code formatter, but under some eslint rules that we will define. All eslint will do for us is to highlight the errors.

RECIPE TO FOLLOW

1. The first thing to do is to install eslint extension.

2. Next we need to install a bunch of dev dependencies. Prettier and eslint must also be installed as dependencies (npm packages).

eslint-config-prettier -> Disables formatting for eslint.

eslint-plugin-prettier -> This one will allow eslint to show formatting errors as we type (again using prettier).

eslint-config-airbnb -> Javascript style guide that we can follow. The most popular is airbnb style guide (we use an eslint configuration, just like we did with prettier).

eslint-plugin-node -> Adds a couple of specific eslint rules only for nodejs (basically to find some errors that we might be doing when writing nodejs code).

The following three plugins are necessary to make the airbnb style guide actually work:

eslint-plugin-import 

eslint-plugin-jsx-a11y

eslint-plugin-react

3. Now we need config files for both prettier and eslint. The prettier config file is where he allows the use of the single-quotes.
The file for eslint was also already in the starter files. We can configure it much more.

*/

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

INTRODUCTION TO MONGODB.

Mongodb is a noSQL database. The more traditional database is called relational database.

In mongo, each database can contain one or more collections (a table of data in relational databases). Then, each collection can contain one or more data structures called documents (a row in a table in relational databases).

Each document contains the data about one single entity, for ex one blog post, one user or one review. The collection is like the parent structure that contains all these entities, for ex a blog collection for all posts, a users collection for all the users or a reviews collection for all the reviews.

We can also see in the examples that the document has a data format that looks just like json, making our job easier when we start dealing with these documents.

Mongo's main features ----->

As we saw before, mongodb is a document-based database, so it stores data in documents, which are field-value paired data structures like json (instead of rows in a table like in traditional relational databases). Therefore it is a noSQL database and not a relational one. 

Mongo has built-in scalability, making it easy to distribute data across multiple machines as the apps get more users and starts generating much more data.

Another feature is the great flexibility of mongo, there is no need to define a document data schema before filling it with data. This means that each document can have a different number and type of fields. We can also change these fields all the time.

It is a very performant database thanks to features like embedded data models, indexing, sharding, flexible documents that we already talked about, native duplication and more.

DOCUMENTS, BSON AND EMBEDDING.

Let's talk a bit deeper about these documents, returning to our blog post example from the beginning, a json object with id, title, author, length, etc. could be a very simple representation of a single post document. 
This is called bson, it looks basically the same as json but it is typed (meaning that all values (not the keys) will have a data type such as string, boolean, number).

Just like json, these bson documents will also have fields and data stored in key value pairs.

Another extremely important feature in mongo, is the concept of embedded documents (the array of documents that are the comments in the blog).
Embedding/Denormalizing means including related data into a single document. This allows for a quicker access and easier data models (not always the best solution). In the example, the comments are related to the post, so they are included in the same document.

This makes the database more performant in some situations because, this way, it can be easy to read all the data that we need at once.

We download the community server in order to learn. When we finish the extraction, the content is a folder, what we need from there are the executable files in bin.

We need to copy them into a special binary folder that we have on our system. CONTINUE 1.58


*/
