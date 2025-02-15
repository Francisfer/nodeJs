/* 

--> There are many packages that can help us building servers in node, but the most widely adopted is express.

  -> The way we create a server with express is somehow similar.

  -> We set up our application by using the express function that is imported from the express package.

  -> Calling the express function returns a server (object with methods in it), so we can call the listen function. Which is just like the listen function on node built in http server. 

  -> We set the port that we want our server to be made available on.

import express from "express";

const app = express();

const PORT = 3000;

app.listen(PORT, () => `Server listening on port ${PORT}`);


  -> Just with this code, we get an 404, because we are not handling the route for the root.

  -> For this, we need to respond to the get request that comes from the user to the root url.

  -> Here things are a bit different from node, instead of having to set the header and write the response and ending the response, we can just use the send() function.

  -> It also automatically sets the content type, so if we send an object to the stream, we don't have to manually set the content type.


------------------------------------- MIDDLEWARE -------------------------------------

--> To use middleware functions we use the app object and call the use() method.

  -> This registers the middleware with express, so it knows to run it.

  -> The callback function that we pass into use() handles both the request and the response, just like any other route handler, the only difference is that it takes another argument, next().

  -> This callback has the opportunity to work with the request, use the data from it and take some action before it the request reaches any of the route handlers.

  -> We do validation on the data that is in the request, or check if the user is logged in and authorized. We do take a lot of actions using middleware.

  -> Every time we use middleware, we need to call the next() middleware, this function controls the flow of our middleware.

  -> We use it to call the next middleware, and we need to always do it, otherwise we break the flow of the code.

*/

import express from "express";

const app = express();

const PORT = 3000;
const friends = [
  {
    id: 0,
    name: "Jonas",
  },
  {
    id: 1,
    name: "Michael",
  },
  {
    id: 2,
    name: "Bono",
  },
];

// Middleware

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  // To measure the time that the request takes from here, passing through the handler, and pass through here again:
  const start = Date.now();
  next(); // ensuring that the requests are passed to the correct handler

  // After next(), we see the request passing again through the middleware.
  const delta = Date.now() - start;
  console.log(delta); // in milliseconds.
});

// Built in middleware, this makes it so we don't need to parse the string coming from the client in order to read the data in the route handler. Already calls next automatically.
app.use(express.json());

// The handler for the post request

app.post("/friends", (req, res) => {
  if (!req.body.name) {
    // We must return here so that the rest of the code does not run. Otherwise we will be sending another response when we pipe the data back.
    return res.status(400).json({
      error: "Missing friend name.",
    });
  }

  const newFriend = {
    id: friends.length,
    name: req.body.name,
  };
  friends.push(newFriend);

  // piping the data back
  res.json(newFriend);
});

// Defining the routes
app.get("/", (req, res) => {
  res.send("Hello from the root");
});

app.get("/friends", (req, res) => {
  // WE DON'T NEED TO STRINGIFY IT
  res.json(friends);
});

// To get one friend, we don't need to parse the url. We define url parameters with (:) with express. Like that, express will parse whatever comes after the (:). DON'T FORGET THE /

app.get("/friends/:friendId", (req, res) => {
  // we get access to the parameters like this:
  const friendId = Number(req.params.friendId);

  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist.",
    });
  }
});

app.get("/messages", (req, res) => {
  res.send("friends route");
});

// Post method
app.post("/messages", (req, res) => {
  res.send("updating messages");
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
