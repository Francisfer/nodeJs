/* 

--> What defines how our webserver responds to requests is our api.

  -> The api tells us what kind of functions the server should support and how those functions should be used.

  -> These functions are to get data, post data etc.

  -> We can implement our api on the server with node. The language that we use when reacting to requests and sending responses is http. Which is used for browser and server communication.
  
  -> Search mdn for http request methods. get, head, post, put, delete, connect, options, trace, patch.


--> API is a software intermediary that allows two applications to talk with each other. Like a browser and a web server.

  -> On the web, generally, it is the browser that makes the requests and the server that responds to those requests.


--> Requests / verbs have four main parts.

  -> 1. Method - post, get... The method defines the operation that the browser wants to perform on the server.

  -> 2. Path - Each method is matched up with a path, to a collection or a specific item of a collection /messages.
  
  -> 3. Body - We can send data to the server by using the body of the request. This can be done with a variety of formats like text, but the most common is json. 
  
    -> We usually have a body on post and put requests, but not on get or delete because for those operations, the server has all the information that it needs from the method and the path.

  -> 4. Headers - These are optional properties that we can specify on a request to send additional metadata to the server. data about the data that we are sending.

    -> Size of the data, authentication information so that the server knows our permissions to perform a certain operation.

    -> The only mandatory header that every single request must have is the host header. It specifies which server the request is being sent to, sometimes including the port.
    



--> Responses. In http, responses are even simpler than requests, we have three main parts.

  -> 1. An optional list of headers. 
  
    -> Content-Type: application/json - Can also be found in requests, tells us the type of data being sent in the body of the request or response.

  -> 2. Body - Contains the data that is being fetch from the server or sent from the server.

  -> 3. Status Code - This is where the response differs from the request, it tells us if the request was successful or not (with an error code). 401 you are not logged in and 403 you are logged in but you don't have access to the content.

*/

/* 

--> The http module is a core module.

  -> It allows us to make requests, respond to incoming requests and work with different types of content.

  -> When sending data in the json format, we need to use JSON.stringify.

*/

import http from "node:http";

// Creating the server, we call the method on the http object.

// The create server method expects a callback, which is called the request listener. It basically tells the server what to do when it gets a request.

// It takes two parameters, the incoming message (request) and the response that we are going to send back to the client.

// Using the request parameter, we can look into the headers and the data that were passed in from the clients.

// Using the response, we can create a response by writing some data and headers to be sent back to the client.

// Both the request and the response are streams, the request is a readable stream, which we can listen to for data coming in through that stream by using the .on() function.

// The response is a writable stream. we can use the writeHead(200) function, where the first parameter is the status code and the second is an object for the headers of the response.

// This is where we write the content-type.

// As for setting the data to send to the browser, we use the end function. It is called end() because it signals that the response (headers and any other data) is complete and ready to sent back.

// The end function needs to be called on each response that is sent from the server.

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.end(
    JSON.stringify({
      id: 1,
      name: "Jonas",
    })
  );
});

// Tells the server to start listening for requests. By default, the listen function uses localhost in a setup like this (127.0.0.1), so we just need to pass the port.

// The listen function also accepts a callback as a second parameter, which runs once the server starts listening.

// Like this we can go to the browser and see the response from the server on localhost:3000

const PORT = 3000;
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
