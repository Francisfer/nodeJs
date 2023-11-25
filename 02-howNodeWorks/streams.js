// STREAMS IN PRACTICE

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

  // readableSource.pipe(writeable destination)
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening ...");
});
