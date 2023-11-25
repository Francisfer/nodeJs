// EVENTS EMITTERS AND LISTENERS IN PRACTICE

/*

To use the built in node events we need to require the events module, keep in mind that we are doing this manually, the real live technique is almost automatic. 

1. From that we are going to require an EventEmitter class. EventEmitter is the standard name for the result of requiring the events module.

Keep in mind that this a built in module (just like http or the fs).

2. To create a new emitter we simply create an instance of the class that we just imported. Keep in mind that "events" is a class that we save into EventEmitter, hence the start with uppercase.
Remember from the last lesson that EventEmitters can emit named events that we can listen and react accordingly.
It is similar to add an event listener on a dom element, but here we must emit the event manually.

3. So, our emitter will eventually emit a named event. That's what we are simulating here with the idea that we are building an online store. We can set myEmitter instance to emit any event name that we want.
In our case we want to emit an event called newSale. Using again the eventListener, this simulates the button clicking (it is like we are actually clicking the button).
This is the reason for being the last line of code.

4. This means that now we have to set up the listeners that will observe this event. Again, we use myEmitter object/class/instance and on that we use the on() method. So, on newSale, do this.
One of the nice things about these event emitters is that we can set up multiple listeners for the same events. So we set another one.
Like this the log is: 
There was a new sale!
Costumer name: Francisco

This is the observer pattern, where the emit() is the method that emits the events and the on() method is the one that observes it (the observer).

5. Another good feature is the possibility of passing arguments to the listener from the emitter. Notice that the logs appear in the exact same order that they are declared in the code.
This happens because emit Synchronously calls each of the listeners registered for the event, in the order they were registered, passing the supplied arguments to each.
Returns true if the event had listeners, false otherwise.

*/
/*  UNCOMMENT
// 1.
const EventEmitter = require("events");

// 2.
const myEmitter = new EventEmitter();

// 4.
myEmitter.on("newSale", () => console.log("There was a new sale!"));
myEmitter.on("newSale", () => console.log("Costumer name: Francisco"));

// 5.
myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

// 3.
// myEmitter.emit("newSale");

// 5.
myEmitter.emit("newSale", 9);
*/

/*

1. This already works perfectly, but in the real world, if we were to use this pattern, the best practice is to create a new class that will inherit from the node EventEmitter (extend).
Remember the ES6 syntax, the EventEmitter is the super class (the one that we've imported when requiring "events") and the Sales class is the new one created as an instance (with the objective of inheriting everything from the super class (EventEmitter)).
In ES6, each class gets a constructor, which is a function that runs as soon as we create a new object from the Sales class, in there we call super() to get access to all the methods of the parent class (EventEmitter).

2. Now all we have to do is to set myEmitter to a new object of the Sales class instead of doing it directly on EventEmitter.

This is exactly how the different node modules (http...) implement events internally, all of them inherit from the EventEmitter class. console.log(EventEmitter);

*/

/* UNCOMMENT
const EventEmitter = require("events");

// 1.
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// 2.
const myEmitter = new Sales();

// The rest is the same

myEmitter.on("newSale", () => console.log("There was a new sale!"));
myEmitter.on("newSale", () => console.log("Costumer name: Francisco"));
myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);
*/
///////////////////////////////////////////////////////////////////////////////////////////

/*

To see that the http module is completely based on events, let's create another example.

What we are going to do is to build a small server and listen to the event that it emits.

1. We are doing thing a bit differently now, we require the module, call createServer() on http and assign it to a variable and then call the on method on the request event.

The log is Waiting for requests...
Request received
Another request received
Request received
Another request received

Remember that this is logged twice because the browser automatically makes two requests, one for the root and another for the favicon.
console.log(req.url);


*/

const EventEmitter = require("events");
const http = require("http");

// 1.
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  // console.log(req.url);
  res.end("Request received");
});
server.on("request", (req, res) => {
  console.log("Another request received");
});

// When the server stops.
server.on("close", (req, res) => {
  console.log("Server closed");
});

// Starting the server, remember that the callback is optional. However useful to see if things are working.

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});

///////////////////////////////////////////////////////////////////////////////////////////

// INTRODUCTION TO STREAMS

/*

Streams are another fundamental concept in nodejs.

With streams, we can process (read and write) data piece by piece (in chunks) without completing the whole read or write operation, therefore keeping all the data in memory.

For example, when we read a file using streams, we read part of the data, do something with it, then free our memory and repeat this until the entire file has been processed.

Think of youtube or netflix, both are called streaming companies because they stream video using the same principle. Instead of waiting until the entire video file loads, the process is done piece by piece (chunks), so that you can start watching before the entire file has been downloaded.

This principle is universal to computer science, not only nodejs. This makes streams the perfect candidate for handling large volumes of data like video. 
Also, streaming makes the data processing more efficient in terms of memory because there is no need to keep all the data in memory and also in terms of time. This because we can start processing data as it arrives instead of waiting until everything arrives.

How streams are implemented in nodejs:
In node, there are four fundamental types of streams: readable streams, writable streams, duplex streams and transform streams. The readable and writable are the most important ones.

  1. READABLE STREAMS - This are the streams from which we can read. We can consume data. Streams are everywhere in the core node modules (similar to events). For example, the data that comes in when an http server get's a request is a readable stream.

  So, all the data that is sent with the request comes in piece by piece and not in one large packet. Another example from the file system is that we can read a file piece by piece by using a read stream from the fs module, which can be useful for large text files.

  Another important thing to know is that streams are actually instances of the EventEmitter class. This means that all streams can emit and listen to named events. In the case of readable streams, they can emit and we can listen to many different events, the two most important ones are the DATA and the END event.

  The data event in emitted when there is a new piece of data to consume and the end event is emitted as soon as there is no more data to consume. Then, we can react to these events accordingly.

  Besides events, we also have important functions that we can use on streams. In the case of readable streams, the most important ones are the pipe() and the read() functions. The pipe() allows us to plug streams together, passing data from one stream to another without having to worry much about events at all. 

  2. WRITABLE STREAMS - These are the ones to which we can write data, they are the opposite of readable streams. A good example is the http response that we can send back to the client, which is actually a writable stream (a stream that we can write data into). 
  When we want to send data, we have to write it somewhere, that somewhere is a writable stream. For example, if we wanted to send a big video file to the client, we would stream that result, just like netflix or youtube do. 

  About events, the most important ones are the drain and the finish events.

  The most important functions are the write() and end() functions.

  3. DUPLEX STREAMS - They are streams that are both readable and writable at the same time, they are less common, but a good example would be a web socket from the net module. A web socket is just a communication channel between client and server that works in both directions, and stays open once the connection has been established.

  4. TRANSFORM STREAMS - These are duplex streams (readable and writable) which, at the same time, can modify or transform the data as it is read or written. A good example of this is the zlib core module to compress data, which uses a transform stream.


Those are the four types of streams and the last important thing to mention is the fact that these events and functions (of the first two streams) are for consuming streams that are already implemented (like the ones in the examples - http req, fs read, http res, fs write streams). 

For example, node implemented these http requests and responses as streams, and we can then consume/use them by using the events and functions that are available for each type of stream.

We could implement our own streams and then consume them using these same events and functions but, in order to build most apps, its more important to know how to consume streams and not really how to implement them.

*/

// STREAMS IN PRACTICE - In streams.js
