const mission = "learn";

if (mission === "learn") {
  console.log("Time to write some Node code!");
} else {
  console.log(`Is ${mission} really more fun?`);
}

/* 

--> The process object is the program that is currently running.

  -> argv: [ '/usr/local/bin/node' ],
  -> The path for the node executable at the first position.

*/

/* 

--> The global object.

  -> While we have window in the browser, we have global in node.

  -> By running js on the browser we get access to properties an methods that are available on the window browser.

  -> When running javascript on node runtime, we get access to the global object, which contains:
  
    -> The process object (where we have access to the arguments that were passed in to our project).

    -> We have information about modules that we've loaded (module).

    -> Because node scripts run on our computer and tend to live in files, we also have __filename.


*/
