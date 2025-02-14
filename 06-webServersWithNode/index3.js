/* 

--> The code that we've written so far is functional, but not realistic. When we write real life servers, we will be sending back data that is coming from some sort of database.

  -> In that database, we might have dozens of different friends and, each of those friends might have their own set of friends.

  -> In our server, we need to have the ability to query / request information for individual items in our collections.

  -> So, when our data lives in a larger collection of data, say we have a list of our friends.

  -> To query this data in the browser, next to the name of the collection (or the collection endpoint), we would pass in the id of the friend that we want to get.

  -> The id is a parameter in our friends endpoint.

  -> There are many better ways of doing this, but one is to manually split the url.

*/

import http from "node:http";

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

const server = http.createServer((request, response) => {
  // Manually splitting the url to get the id.
  // /friends/2 => ["", "friends", "2"]
  // This makes us change all the urls.
  const items = request.url.split("/");
  if (items[1] === "friends") {
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    // logic needed if we have the id parameter on the friends endpoint.
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      response.end(JSON.stringify(friends[friendIndex]));
    } else {
      response.end(JSON.stringify(friends));
    }
  }
  if (items[1] === "messages") {
    // Instead of writing the head like above, we can do it separately:
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<body>");
    response.write("<ul>");
    response.write("<li>Hello there.</li>");
    response.write("<li>Hello there twice.</li>");
    response.write("</ul>");
    response.write("</body>");
    response.end(); // we are no longer writing to the stream
  } else {
    response.statusCode = 404;
    response.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

/* 

----------------------------------- Same Origin Policy -----------------------------------

--> 



*/
