/* 

--> There are many packages that can help us building servers in node, but the most widely adopted is express.

  -> The way we create a server with express is somehow similar.

  -> We set up our application by using the express function that is imported from the express package.

  -> Calling the express function returns a server, so we can call the listen function. Which is just like the listen function on node built in http server. 

  -> We set the port that we want our server to be made available on.

import express from "express";

const app = express();

const PORT = 3000;

app.listen(PORT, () => `Server listening on port ${PORT}`);


  -> Just with this code, we get an 404, because we are not handling the route for the root.

  -> For this, we need to respond to the get request that comes from the user to the root url.

  -> Here things are a bit different from node, instead of having to set the header and write the response and ending the response, we can just use the send() function.

  -> It also automatically sets the content type, so if we send an object to the stream, we don't have to manually set the content type.

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

// Defining the routes
app.get("/", (req, res) => {
  res.send("Hello from the root");
});

app.get("/friends", (req, res) => {
  // WE DON'T NEED TO STRINGIFY IT?
  res.json(friends);
});

// To get one friend, we don't need to parse the url. We define url parameters with (:) with express. Like that, express will parse whatever comes after the (:). DON'T FORGET THE /

app.get("/friends/:friendId", (req, res) => {
  // we get access to the parameters like this:
  const friendId = Number(req.params.friendId);

  const friend = friends[friendId];
  console.log(friendId);
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
