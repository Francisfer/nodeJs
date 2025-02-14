/* 

--> This current server always responds with the same thing.

  -> Normally, we want the servers to be more dynamic, we want them to respond to different types of requests depending on some logic that lives in the server.

  -> The server that we are creating with createServer() is an event emitter, so when we are passing in the callback directly (the request listener), it is a shorthand for server.on("request", () => { the current callback }).

  -> However, the server is not giving us different events for requests made against different urls. If we write localhost:3000/mars we get the same json response.

  -> When we have a server that has multiple different urls that respond differently, depending on which url is being requested and with what http method is being requested, we call the different urls endpoints.

  -> Each different url that the client can hit is an endpoint, responsible for a specific piece of functionality, provided by the backend server.

  -> So how do we make different endpoints for our http server?

    -> We look at the request coming in, specifically, checking if the request.url 
    matches the endpoint for our functionality.

*/

import http from "node:http";

const server = http.createServer((request, response) => {
  if (request.url === "/friends") {
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify({
        id: 1,
        name: "Jonas",
      })
    );
  } else if (request.url === "/messages") {
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
