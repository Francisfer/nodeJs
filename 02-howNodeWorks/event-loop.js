/*
Let's start by learning about the node architecture. Node runtime has two fundamental dependencies in order to work correctly, the v8 engine and the libuv.

V8 transforms the javascript that we write into machine code, but that alone is not enough to create a server side framework like node.

That's why we have libuv, which is an open source library with a strong focus on asynchronous IO (input output). This layer is what gives node access to the underlying computer operating system, file system, networking and more. 

Besides that, libuv also implements two extremely important features of nodejs, the event loop and also the thread pool. In simple terms, the event loop is responsible for handling easy tasks (executing callbacks and network IO), while the thread pool is for more heavy work (file access or compression).

One important thing to understand is that libuv is written in c++ and not javascript. The v8 also uses c++ besides javascript. This means that node itself is written in c++ and not just in javascript.

Besides these two dependencies, node also depend on http-parser, c-ares (dns requests), OpenSSL for cryptography and zlib for compression.

///////////////////////////////////////////////////////////////////////////////////////////

PROCESSES, THREADS AND THE THREAD POOL 

When we use node on a computer, it means that there is a node process running on that computer. The process is just a program in execution, we already know that node is basically a c++ program which will therefore start a process when its running.

This is important because, in node, we have access to a process variable which we are going to use later in this course.

In that process, node runs in a so called single thread, a thread is just a sequence of instructions, what's important to know is that node runs in just one thread (which makes it easier to block node applications).
This means that it is of extreme importance to not block that thread, no matter if we just have one user or 10 million, the process will run in just one thread when we start the node application.

When the application is started, all the top level code get executed (code that is not inside of any callback function). Also, all the modules that the app needs are required and all the callbacks are registered. 

After all this, the event loop starts running. We will talk more about the event loop, but keep in mind that the event loop is where most of the work is done in the app. It is the heart of the entire node architecture.

The catch of all this is that some tasks are too heavy to be executed in the event loop, making possible the blocking of the single thread.
This is where the thread pool comes in, it gives us four additional threads that are completely separated from the main single thread. We can configure the thread pool to have 128 threads, but usually these four are enough.

The existence of the thread pool makes it possible for the event loop to automatically offload heavy tasks. This is done automatically, but the heavy tasks are all operations dealing with files (file system API's), cryptography (caching passwords), compression and DNS lookups. These are the processes that would easily block the main thread.

THE EVENT LOOP 

The first thing to know is that the event loop is where all the application's code that is inside of callback functions is executed. Some code might get offloaded to the thread pool, but it is the event loop that takes care of all this.

As we already know, node is build around callback functions, functions that are called as soon as some work is finished some time in the future. This works because node uses an event-driven architecture. 
Things like receiving an http request, a timer getting expired or a file finishing reading, all of these will emit events as soon as they are done with their work.
The event loop will then pick up these events and call the callback functions that are associated with these events.  

In summary, the event loop does something like orchestration, it receives events, calls their callback functions and offloads the most expensive tasks to the thread pool.

But how does this works behind the scenes? In what order are these callbacks executed?
Remember that when we start our application, the event loop starts running right away. The event loop has multiple phases, and each phase has a callback queue (callbacks coming from the events that the event loop receives).

The most important four phases of the event loop are:

    1. The first phase takes care of callbacks of expired timers. If there are callbacks from timers that have expired, these are the first ones to be processed by the event loop. 
    It is important to notice that if one of the timers expire later, so during the time when one of the other phases is being processed, the timer callback will only be called when the event loop comes back to this first phase. 
    IMPORTANT - It works like this in all four phases, callbacks in each queue are processed one by one until there is no ones left in the queue and only there the event loop enters in the next phase. 

    2. The second phase is IO polling and execution of IO callbacks. Polling means looking for new IO events that are ready to be processed and putting them into the callback queue. In the context of a node app, IO means mainly things like networking and file access (reading, writing). 
    It is in this phase that 99% of our code gets executed, simply because the bulk of what we need to do is related to networking and file accessing.

    3. The next phase is for setImmediate callbacks. setImmediate is a special kind of timer that we can use if we want to process callbacks immediately after the IO polling phase. This can be important in some more advanced use cases.

    4. The last phase is for close callbacks, these are not that important for us. In this phase, all close events are processed, for ex when a web server or a web socket shut down.

Beside these most important phases, we have other two: The process.NEXTTICK() queue and the other micro tasks queue (mainly for resolved promises). The callbacks of these two phases will be executed after the current phase finishes. As for the next tick, it is a method that we can use when we really need to execute a certain callback right after the current event loop phase. 

With this, we just finished one tick (cycle) in this loop. Now its the time to decide if the loop should continue or if the program should exit. 
To make this decision, node checks if there are any timers or IO tasks that are still running in the background, if there aren't any, it will exit the application.
If there are any pending timers or IO tasks, it will keep running the event loop and go straight to the next tick. When we are listening for incoming http requests like we did, we are just running an IO task, that is why the event loop keeps running to listen for http requests coming in instead of exiting the app.

*/

/*
THE EVENT LOOP IN PRACTICE.

It is very difficult to simulate the event loop properly because we can't really put many callbacks in all the callback queues that we talked about before, all at the same time.

That situation happens, for ex, when a lot of requests are coming into the app, but locally that is very hard to replicate.

What we are going to do is to write a bunch of lines of code and then try to figure out in which order they should be executed in the event loop.

*/

const fs = require("fs");

// Let's start by writing a setTimeout function, we just log a string in the console after 0 seconds.

// UNCOMMENT
// setTimeout(() => {
//   console.log("Timer 1 finished");
// }, 0);

// Also, let's also use setImmediate(), this one doesn't have any time because it is not necessary.

// UNCOMMENT
// setImmediate(() => {
//   console.log("Immediate 1 finished");
// });

// Another thing that we're gonna do is to read the test-file and then pass a callback function. Notice that we have to require the module, this is done always in the beginning.

// UNCOMMENT
// fs.readFile("./test-file.txt", (err, data) => {
//   console.log("I/O finished");
// });

// Finally just a cl here from the top level code (not inside of any callback).

// console.log("Hello from the top level code.");

// Output:
// Hello from the top level code.
// Timer 1 finished
// Immediate 1 finished
// I/O finished

// We know that, when we initialize the app, the first thing that happens is to execute the top level code and also require the modules that are necessary.
//So we can guess that the cl from the top level is executed first. Also in this step, the callbacks are registered, but NOT executed.
// Only after this the callbacks run in the event loop.

// By analyzing the output, we can see that the first log was the one on the top level, after it was the timer, then the immediate and at last the IO. Have into account that the order of the three callbacks (the timers and the io), does NOT have anything to do with the event loop.
// They are not running inside of an IO cycle (not running inside of the event loop) because they are not inside of any callback, the reason why the IO is the last its just because the file is too big.

// In order for the code to run inside of the event loop, we will have to run it inside of a callback function. For this we just use the readFile callback. We also add another timer to finish after 3 seconds.
// Also notice that after the code ran, the program exited and went back to the prompt. That happened because there was no pending timer or IO tasks. That's why we now add a timer with 3 seconds, so that is pending and "force" another tick.

// This is the new log:

// Hello from the top level code.
// Timer 1 finished
// Immediate 1 finished
// I/O finished
// Above NOT running in the event loop ------- Below RUNNING in the event loop
// Next tick
// Immediate 2 finished
// Timer 2 finished
// Timer 3 finished

// We must go by steps to really understand why they are in this order.
/*
1. As we know, when we start the app, all the top level code is executed, the modules are required and the callbacks are registered. This explains the // Hello from the top level code.

2. The event loop now starts, but, again, the timer 1, the immediate and the I/O are NOT running inside of an IO cycle (not running inside of the event loop).

3. It is important to keep in mind that, when we start the app, the callbacks that are registered are the ones that are at the top level code, so timer 1, immediate 1 and the fs.readFile. 
The callbacks that are now inside of the fs.readFile callback are only "discovered" when the event loop starts and executes the callbacks that were registered before. 
That is why we add the log to separate what is inside of the event loop from what is not.

4. Now, for the event loop itself, the timer 2(zero seconds) was supposed to be finish before the immediate2. The reason why the immediate 2 appears before the setTimeout 2 is that the event loop waits for something to happen in the I/O polling and callbacks phase.
So, when the queue of IO callbacks is empty, which is our case (no IO callbacks), the event loop will wait until there is an expired timer.
The timer 2 expires immediately, but, because the event loop paused in the IO polling phase, the first log is the immediate (gets executed first).

5. The next tick gets executed first because it is part of the microtasks queue, which gets executed after each PHASE, Not after each tick. So, after the event loop waited in the IO phase until there was an expired timer, as soon as that timer expires the event moves to the next phase, executing the tick, and only then the immediate 2.

nextTick is a misleading name, because a tick is an entire loop and next tick happens before the next loop PHASE and Not the entire tick.

On the other side, setImmediate makes us think that it's callback would be executed immediately, but it gets executed once per tick, while nextTick gets executed immediately.
This may cause confusion, that's why it is common to stick with one of them, which is usually setImmediately.

This is for more advanced use cases, but you never know. Also, in this lesson he shows how to change the number of threads in the thread pool, and how encrypting a password in a synchronous way block the entire execution. He does this after the next tick and all of the code, even the timers, only get executed after the blocking code (because again, the callbacks are registered in that tick).
*/

/* // UNCOMMENT
fs.readFile("./test-file.txt", (err, data) => {
  console.log("I/O finished");

  console.log(
    "Above NOT running in the event loop ------- Below RUNNING in the event loop"
  );

  setTimeout(() => {
    console.log("Timer 2 finished");
  }, 0);
  setTimeout(() => {
    console.log("Timer 3 finished");
  }, 3000);
  setImmediate(() => {
    console.log("Immediate 2 finished");
  });

  process.nextTick(() => console.log("Next tick"));
});

console.log("Hello from the top level code.");
*/

///////////////////////////////////////////////////////////////////////////////////////////

/* 

EVENTS AND EVENT-DRIVEN ARCHITECTURE

Another important piece of the nodejs architecture are the events and the event-driven architecture.

Most of the core node modules, like the ones that we've already used (http, file system and timers), are built around an event driven architecture. We can use this architecture to our advantage in our code. 

The concept is quite simple. In node, there are certain objects called EventEmitters that emit events as soon as something important happens in the app (request hitting the server, timer expiring or a file finishing to read).
These events can then be picked up by event listeners that we set up, which will fire off callback functions that are attached to each event listener.
So, in one hand we have event emitters and on the other event listeners that will react to emitted events by calling callback functions.

As an example, when we want to create a server, we use the createServer method and save it to a variable called server. On the code of the previous section of the course, we would do this:
const server = http.createServer((req, res) => {}

But now, the server.on() method is how we create a listener, in this case for the request event.
const server = http.createServer();
server.on("request", (req, res) => {}

Say that we have our server running and a new request is made. The server acts as an emitter, and will automatically emit an event called request each time a request hits the server.
Since we have a listener set up for this event, the callback function of that listener will automatically be called. In the example the callback just logs request received and sends the same with res.end() to the client. 

This works because, behind the scenes, the server is actually an instance of the nodejs EventEmitter class, so it inherits all this event emitting and listening logic from that EventEmitter class. 

It is important to mention that this EventEmitter logic is called the observer pattern in javascript programming in general. It is quite a popular pattern with many use cases, the idea is that there is an observer, in this case the event listener, which keeps waiting/observing the subject that will emit the event that the listener is waiting for.

The opposite of this pattern is simply functions calling other functions, which is something that we are more used to. But the observer pattern was designed to react rather then to call. 

This is because there is a huge benefit of using this architecture, which is the fact that everything is more de-coupled. For example, we don't have functions from the file system module calling functions from the http module, that would be a huge mess.

Instead, these modules are nicely decoupled and self-contained, each emitting events that other functions, even if they come from other modules, can respond to.
Also, using an event-driven architecture makes it way more straightforward to react multiple times to the same event. All we have to do is to set up multiple listeners.
  

EVENTS EMITTERS AND LISTENERS IN PRACTICE

We start by creating a new file events.js go there.
  
*/
