/* 
--> Much of the node core api is built around an event-driven architecture in which certain types of objects called "emitters", emit named events that cause listeners to be called (callback functions).

  -> We do this by using the EventEmitter class. All objects that emit events are instances of this class.

  -> These objects expose an eventEmitter.on() function that allows one of more callbacks to be attached to named events emitted by the object.

*/

import EventEmitter from "events";

// Creating an instance for a subject that we want to emit events from. The analogy is that the celebrity will be emitting events about their life
const celebrity = new EventEmitter();

// Now we can have different observers/subscribers that subscribe to the events from the celebrity.

//
