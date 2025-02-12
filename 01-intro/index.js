/* -------------------------------- What is node used for -------------------------------- */

/* 

--> In the majority of cases, we use node to create servers, to build web and mobile applications that connect to databases and that provide user data.

  -> Our servers also provide security features for login for example.

  -> The backend is where security features, input validation and most of our business logic is implemented. 



--> Besides the v8 engine, which allows us to run javascript code outside the browser, we have access to the nodeJs APIs.

  -> Some APIs are modules, like the fs to handle file operations or the http to handle networking.

  -> Others are global APIs, like settimeout, process, crypto, events or path.


--> One important thing to understand is that, for much of the functionality that we are calling with javascript, we are actually using the node C++ bindings.

  -> The actual implementation of some of the core functionality, like working with files or the http protocol, lives in libuv. libuv and the v8 are the two most important components of nodeJs.

  -> Libuv is an optimized library of code written in C that deals with input/output tasks, which node can delegate so that it will work on every operating system. 
  
  -> This means that nearly all of the code that we write in node involves some form of async i/o.

  -> 

*/

/* -------------------------------- node globals -------------------------------- */

/* 

--> The global object (node globals).

  -> While we have window in the browser, we have global in node.

  -> By running js on the browser we get access to properties an methods that are available on the window browser.

  -> When running javascript on node runtime, we get access to the global object, which contains:
  
    -> The process object (where we have access to the arguments that were passed in to our project).

      -> argv: [ '/usr/local/bin/node' ],
      -> The path for the node executable at the first position.


    -> We have information about modules that we've loaded (module).

    -> Because node scripts run on our computer and tend to live in files, when we are running node scripts, we can get the __filename of that script.

    -> There is also __dirname for the directory in which the script lives.

    -> One of the most important methods available on the global object is the require().


*/
