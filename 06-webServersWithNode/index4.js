/* 

--> Handling post requests.

  -> Handling requests that submit new data to our server, like adding a new friend.

  -> To submit data to our server we often use one of two request methods.

    -> The post method. In the majority of servers is almost always the post method that is used, because it is specific to add new data.

    -> The put method. This method just updates existing data.


--> The first thing we need to do is to look into the request object and see the type of request being made.

  -> The second is to look into the url and see which is the endpoint.

  -> The third is to listen for the data event on the request object, which is a readable stream.

  -> The data that is provided on a readable stream like a request, is passed in as a node buffer object (raw bites), which needs to be converted to a string.

  -> If the data comes in json (stringified), we still need to convert the buffer object (because it is always received like this no matter the format of the data), but then convert the result into an object using json.parse(data)


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
  const items = request.url.split("/");
  // logic to add a new friend.
  if (request.method === "POST" && items[1] === "friends") {
    // Remember that the request object is a readable stream, so we listen for data.
    request.on("data", (data) => {
      // Making the buffer object into a string before we can use it.
      const friend = data.toString();
      // If the data comes in the json format, it is stringified, so we need to parse it into an object.
      console.log(friend);
      friends.push(JSON.parse(friend));
    });
    // piping the data back to the client
    request.pipe(response);
  }

  if (request.method === "GET" && items[1] === "friends") {
    response.writeHead(200, {
      "Content-Type": "application/json",
    });

    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      response.end(JSON.stringify(friends[friendIndex]));
    } else {
      response.end(JSON.stringify(friends));
    }
  }
  if (request.method === "GET" && items[1] === "messages") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<body>");
    response.write("<ul>");
    response.write("<li>Hello there.</li>");
    response.write("<li>Hello there twice.</li>");
    response.write("</ul>");
    response.write("</body>");
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
