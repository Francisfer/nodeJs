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

/*

Let's say that we need to read a large text file from the file system in our application, and then send it to the client.

There are multiple ways of doing this, we are going to explore a few of them, starting with the most basic one and moving all the way to the best way.

  1. The first solution that we are going to use is the easiest and most straightforward, which is to read the file into a variable and once that's done send it to the client. 
  So, we read the test-file and once that is ready the callback is called (where we have access to the error and the data(variable) don't forget).
  First we handle the error, otherwise we send the data to the client. We use the end() method on the response object.

This solution works fine, but the problem is that node has to load the entire file into memory (remember the activity monitor), because only after that is ready the data can be sent.
This is a problem when the file is big, and also when there are a ton of requests hitting the server, this because the node process will very quickly run out of resources, after this everything will crash. 

In a production ready app, we cannot use a piece of code like this.

    2. In this solution we will use streams. Here, the idea is that we don't really need to read this data from the file into a variable, we don't need this variable. Instead of reading the data into a variable and having to store that variable into memory, we will just create a readable stream.
    
    Then, as we receive each chunk of data, we send it to the client as a response, which is a writable stream.

    First we create a variable (readable) then, from the file system, we use createReadStream(). In this method we put the path of the file. This creates a stream from the data that is in the text file, which we can consume piece by piece (in this case consuming is send it to the client).

    In order to do this, remember that each time that there is a new piece of data that we can consume, a readable stream emits the data event. So we need to listen for that. In the callback function we have access to that piece of data that we call chunk.
    
    To handle the chunk of data, we will write it to a writable stream, which is the response. We do this with the write() method. Again, remember that the response is a writable stream, so we can use the write() to send the chunks of data into that stream.
     
    Like this, we are streaming the content/data from the file directly to the client (before we stored everything at once into a variable).

    The final part is to handle the event when all the data is read, when the stream is finished reading the data. In that case, the end event will be emitted and as soon as that happens we call end() on the response res.end().
    We've already used this method on the response, but we sent the data there, signaling the end of the response. However, here it makes more sense because the response is a stream and the end() signals that no more data will be written to this writable stream.
    We always have to use the data and the end events one after another like we did, otherwise, the response will never actually be sent to the client without the res.end().
    On a readable stream, we can also listen for the error event, in this callback function we have access to the error object. We log it to the console and send the result as the end of the response. We can also set the status code to a server error (500 for ex), usually this is set automatically to 200 ok, but since it is a server error we send the code 500 (Internal Server Error).

Again, this works perfectly, however there is still a problem with this approach. The problem is that our readable stream (the one that we're using to read the file from the disk) is much faster than sending the result with the response writable stream over the network.
This will overwhelm the response stream because it cannot handle all this incoming data so fast. This problem is called backpressure, it happens when the response cannot send the data nearly as fast as it is receiving it. So we need solution 3.

    3. The secret here is to actually use the pipe operator. This operator is available on all readable streams and it allows us to pipe the output of a readable stream right into the input of a writable stream. This fixes the problem of backpressure because it will automatically handle the speed of the data coming in and of the data coming out.
    We call the pipe() method on the readable stream and then put in a writable stream (the response). That is it. This approach with the pipe() method is the easiest way of consuming and writing streams, unless we need a more customized solution, for that we must use tools like events and methods shown in the previous solutions.

*/

// The first thing is to require the file system module and also the http module. Notice the way we can chain the createServer method on require.

const fs = require("fs");
const server = require("http").createServer();

// Now, just like before, let's listen for the request event and specify the callback.

server.on("request", (req, res) => {
  // 1.
  // fs.readFile("./test-file.txt", (error, data) => {
  //   if (error) console.log(error);
  //   res.end(data);
  // });
  /////////////////////////
  // 2.
  // const readable = fs.createReadStream("./test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (error) => {
  //   console.log(error);
  //   res.statusCode = 500;
  //   res.end("File not found");
  //  });

  /////////////////////////
  // 3.

  const readable = fs.createReadStream("./test-file.txt");

  // readableSource.pipe(writable destination)
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening ...");
});
