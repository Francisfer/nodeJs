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

--> There is a concept that is important to understand, the same origin policy.


--> What is a origin?

  -> When we type the url of a website is something like https://www.google.com/maps/.

  -> The origin is a combination of three things that are in the url.

    -> 1. The protocol - How we are communication with the google server, in this case with https protocol.

    -> 2. The host - A critical part of the origin, tells us which server is going to be handling our request. www.google.com.

    -> 3. The port - Whenever is included in the request we can see it, but not often. 442 is the port for https. https://www.google.com:442/maps/


  --> Whenever one of these parts changes, we are no longer on the same origin. We can browse to other pages at that origin, like mail instead of maps but we cannot change www.google.com to facebook.com and still be at the same origin.

    -> We also can't change the protocol, if we change to http, the origin also changes.



--> Javascript and the browser uses the same origin policy.

  -> This policy is a security feature that restricts what the browser is allowed to load when we are browsing pages on the internet.

  -> This basically has to do with the fact that we can be on one origin and make a post request to a different origin, however, we cannot make a get request under the same origin.

  -> CORS - Cross Origin Resource Sharing. It is a way of relaxing the restrictions that the same origin policy puts on the developers.

    -> This allows us to make applications that potentially span many different domains and origins.

    -> The same origin policy generally limits us to talk to just one origin in the browser.

    -> But if we have content on many different origins or we have many different apis at different sites we need to use a header in our responses.

    -> The access-control-allow-origin: * allows us as developers to allow an exception when we know requests from a different domain are safe and expected.

    -> For example, if we have an online shop app, we would be expecting requests from paypal to proceed with the payments. Like so, we would have to include paypal domain on Access-Control-Allow-Origin: paypal domain.
*/
