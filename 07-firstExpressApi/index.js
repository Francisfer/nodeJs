/* 

--> There are many packages that can help us building servers in node, but the most widely adopted is express.

  -> The way we create a server with express is somehow similar.

  -> We set up our application by using the express function that is imported from the express package.

  -> Calling the express function returns a server, so we can call the listen function. Which is just like the listen function on node built in http server. 

  -> We set the port that we want our server to be made available on.

*/

import express from "express";

const app = express();

const PORT = 3000;

app.listen(PORT, () => `Server listening on port ${PORT}`);
