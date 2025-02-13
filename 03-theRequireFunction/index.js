/* 

--> What can we do with the built in modules like the file system or the crypto?

  -> We start with the http module to browse the web.

  -> We assign each module to a variable so that we can get access to the functionality inside of each module.

  -> We use the http module to make a request against google servers.

  -> The first function that we use is the request function, the first argument can be a string, an url or a request options object, and, the second is a callback that has access to the response.

    -> The response is the result of making the request. The way we get data back from our response is by listening for the data event, for which we need a callback.

    -> The callback of the data event gets access to a chunk of data, just a piece, not necessarily the whole response.


  -> Another event that a response can emit upon a request is the "end" event, which is sent when there is no more data coming from the request.

    -> The callback of this event does not get access to any data.


  --> For all of this to work, we need to store the result of the request into a variable and call req.end() at the end. There are better ways of doing this.



*/

// We can do it like this or we can destructure exactly what we want from that module.
// const http = require("http");

// destructuring what we need.
const { get, https } = require("https");
// const https = require("https");

// const req = https.request("https://www.google.com/", (response) => {
//   response.on("data", (chunk) => {
//     console.log(`Data chunk is:`, chunk);
//   });
//   response.on("end", () => {
//     console.log("No more data from the request.");
//   });
// });

// The get function is a convenience function that we can use instead of request when we are only getting data from a server and not sending anything back.

// That is why, when using the request function we must use .end() because we might be sending data to the server.

// With get we can omit it.

const req = get("https://www.google.com/", (response) => {
  response.on("data", (chunk) => {
    console.log(`Data chunk is:`, chunk);
  });
  response.on("end", () => {
    console.log("No more data from the request.");
  });
});

// We always need to do this because the end() method will cause the request to be sent. That is why, if we run the code without the end() method, we can wait forever because the request was not sent.

// Does not work with the https protocol, for that, we also need to import the https module.
// req.end();
