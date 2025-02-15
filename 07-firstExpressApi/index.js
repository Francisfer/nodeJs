/* 

--> When refactoring for MVC, we start with the route handlers. The functions that process the request coming in and the response going out.

--> There are our CONTROLLERS in the mvc architecture.

  -> We create a controllers folder, which will contain one controller module for each of our collections of data.

  -> One for friends and one for messages.

  -> Always use named functions for the controllers because, if there is an error, node will give us the name of the function where the error is.

*/

import express from "express";
import { getMessages, postMessage } from "./controllers/messages.controller.js";

import {
  getFriends,
  getFriend,
  postFriend,
} from "./controllers/friends.controller.js";

const app = express();

const PORT = 3000;

// Middleware

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(delta); // in milliseconds.
});

app.use(express.json());

// Routes

app.get("/friends", getFriends);
app.get("/friends/:friendId", getFriend);
app.post("/friends", postFriend);

app.get("/messages", getMessages);
app.post("/messages", postMessage);

// Server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
