/* 

--> Much of the node core api is built around an event-driven architecture in which certain types of objects called "emitters", emit named events that cause listeners to be called (callback functions).

  -> Node has some built in modules that helps us work with events, such as those in the observer pattern, which is the events module.

  -> We do this by using the EventEmitter class. 
  
    -> All objects that emit events are instances of this class.

    -> Also, the process is an instance of the EventEmitter class.

    -> console.log(celebrity);

EventEmitter {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  [Symbol(shapeMode)]: false,
  [Symbol(kCapture)]: false
}

  -> These objects expose an eventEmitter.on() function that allows one of more callbacks to be attached to named events emitted by the object.

  -> The events can be many, like a button click or a button hover.

*/

const EventEmitter = require("events");

// Creating an instance for a subject that we want to emit events from. The analogy is that the celebrity will be emitting events about their life
const celebrity = new EventEmitter();

// Now we can have different observers/subscribers that subscribe to the events from the celebrity.

// The first argument is the event, and the second is the callback.

// Subscribe to celebrity for Observer 1.
celebrity.on("race win", () => console.log("congratulations"));

// Subscribe to celebrity for Observer 2.
celebrity.on("race win", () => console.log("I could have done better"));

// To emit the event, this is for events created by us.
celebrity.emit("race win");
