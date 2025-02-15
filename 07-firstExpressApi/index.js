/* 

--> When refactoring for MVC, we start with the route handlers. The functions that process the request coming in and the response going out.

--> There are our CONTROLLERS in the mvc architecture.

  -> We create a controllers folder, which will contain one controller module for each of our collections of data.

  -> One for friends and one for messages.

  -> Always use named functions for the controllers because, if there is an error, node will give us the name of the function where the error is.




--> Express Routers.

  -> When we are building large express applications, we will often take advantage of the concept called router.

  -> With routers, we organize the routes in our application into smaller groups.

  -> A router is like a mini application, it contains its own set of middleware and routes.

  -> We use routers to break our application and make it more modular.

  -> We can create a route by using the express object called Router() on the express object itself.

  -> Then, we can add the specific routes on the router, rather than adding them to the app directly.

  -> Like this, each router is like middleware, we need to use() on app.

  -> We sometimes call this mounting the router on the app object.
*/

import express from "express";

import { friendsRouter } from "./routes/friends.router.js";
import { messagesRouter } from "./routes/messages.router.js";

const app = express();

const PORT = 3000;

// Middleware

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;

  console.log(`${req.method} ${req.baseUrl}${req.url}`);
});

app.use(express.json()); // to parse

// Routers

// Mounting the friends router on the app object. One special thing that routers allows us to do is that we can mount a group of routes under a specific path.

// This means that, if we know that all of friends are going to be under the /friends path, just with different http methods or parameters, we can mount the router directly on the /friends path.

// This just means that if the requests all go to the same end point, just with different http methods and parameters, we can simplify the code and directly mount the router on that endpoint path.

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

// Server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
