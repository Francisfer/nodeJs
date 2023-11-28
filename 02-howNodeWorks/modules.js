/*

HOW REQUIRING MODULES REALLY WORKS  

In a nodejs module system, each javascript file is treated as a separate module. We've already used modules a bit until this point, by using the require function and exporting data from modules.
Those were the fundamentals of common js modules, which is the module system that node uses, because it works specially well on the server.

There is also the native ECMA script (or ES module system) that was developed to work in the browser, using the import and export syntax. 

It is IMPORTANT to understand that these are two different module systems that we will see in different situations. By the time that this course was recorded, the implementation of native es modules in nodejs wasn't ready, but we need to see how we can do it now.

So, relatively to the common js, why does every module get access to the require function to import modules? The require function in not a standard javascript function, so where does it come from?

Each time that we require a module by calling the require function with the module name as the argument, five steps happen behind the scenes.

1. The path to the required module is resolved and the file is loaded.
   In this step, the question is how does node knows which file to load when we require a module? Remember that we can load three different kinds of modules: node's core modules(http, etc), our own modules and third party modules.

   Node knows which file to load with a process called resolving the file path. When the require function receives the module's name as it's input/argument, it will first try to load a core module with that name, find the path to that module and then load it.
   
   If the path starts with a dot (.) or two dots, it means that it is a developer module because we are indicating the relative path to our file.
   Node will try to load that file and, if there is no file with that name, it will look for a folder with index.js.

   If the required module is neither a core module nor a developer module, node will assume that it is a module from npm (third party module). Remember that we don't need to write a path when requiring a module from npm, just the module name. 

   This third party modules are stored in the node modules folder, so node goes there, tries to find the module and load it. If not found anywhere, an error is thrown and the execution of the app is stopped.

2. Wrapping process. 
   After the module is loaded, the module's code is wrapped into a special function, which will gives us access to a couple of special objects. This step is where the magic happens because this is where we know where the require function actually comes from. Nodejs runtime takes the code of our module an puts it inside of an IIFE. This function has the arguments to pass the exports, require module, __filename and __dirname objects.
   This is why, in every module, we have access to the require function (and all others). 

3. The code in the module is executed.
   To be more precise, the code in the iife wrapper is executed by the nodejs runtime. 

4. The module exports are returned.
   At this point, the require function has been called with a module name as the argument, the path to the module's file has been resolved and the file loaded, all the code has been wrapped into the iife which has been executed.
   
   Now it is time for the require function to return something, which are the exports of the require modules. These exports are stored in the module.exports object. If we want to export just one single variable, like one class or one function, we usually use module.exports and set it equal to the variable that you want to export.
   On the other hand, if we want to export multiple named variables, we should create these as properties of the export object (exports.add = (a, b) => a + b);
   This is basically how we export and import data from one module into the other. Also, this is why we usually assign the result of a require function to a new variable, so that we can save the returned exports.

5. The entire module gets cached.
   Modules are cached after the first time that they are loaded. The code in these modules is only executed in the first call, if we would require the same module again, the result is just retrieved from cache.
*/

/*

REQUIRING MODULES IN PRACTICE

1. We start by proving that node does wrap the code in our modules into a iife (wrapper function). For that we log to the console the arguments, which is an array in javascript that contains all the values that were passed into a function.
So, when we log the arguments into the console (without having any function in our code), if we see some values there, then it means that we are really in a function.

We can see in the log the five arguments of the wrapper function. The first ("0") is the exports, which is currently empty because we are not exporting anything. The second one is the require function ("1"), the third ("2") is called module (where we have module.exports).
The forth ("3") is the file name (the module that we are currently in) and the fifth ("4") is the directory name ( '4': '/Users/franciscoferreira/Desktop/webDev/nodeJs/nodeJs/02-howNodeWorks').

This proves that all the code in the module is wrapped and that we have access to all these variables (arguments).

2. We can actually see the wrapper function if we require the module's module. 

///////// IMPORTS AND EXPORTS /////////

3. The important thing to see is how we can import and export data from one module to another. For that we are going to create a module to create a calculator.
Start in test-module-1 (calculator class), where we create the calculator. Here we can import that class (single value) and give it the name that we want. Since this is our own module we have to use the ./ in the path. 

  3.1 - Now we can use that class to do some calculations. We start by creating a new calculator, which is a new instance of the Calculator class.

4. Now let's see how and when we can use the exports shorthand. For that we create another test-module-2. There we have created three anonymous functions that we assign as properties of the exports variables.
We can assign the exports object into a variable and use the properties like this: calc2.multiply(3, 2).

  4.1 - OR we can use destructuring to assign the properties directly into variables (this is handy when we just want to import selectively from a big object). 

5. To finish, let's talk about caching. For this we create the test-module-3. There we create a console.log (top level code inside of that module) and a single function using module.exports.
Now we require this module, notice that we can do this in two ways, saving it into a variable and then call the function or require the module and call the function immediately without storing it. We require the module 3 times.

The important thing to have in mind is that module.exports returns the function that we've assign to it and we are calling it three times. The log is 
Hello from the module!
Log this text.
Log this text.
Log this text.

First we have the top level code and the result of calling the function (first require or the first function call).
The three logs that come from the function are fine to understand because we have called the function three times, but we only have the result of the top level code once.
That happens because of caching. When we require the module the first time, it just gets loaded once, that is why the top level cl was only logged once. 
It is also important to know that the other logs were also stored in cache, so when we call the function the result is retrieved from there instead of loading the module again.
That is why we need to restart the app when we change something in the code.


*/

// IIFE WRAPPER
// 1.
// console.log(arguments);

// 2.
// console.log(require("module")); // We see all the core modules
// console.log(require("module").wrapper); // '(function (exports, require, module, __filename, __dirname) { ','\n});'

// MODULE.EXPORTS
// 3.
const C = require("./test-module-1");

// 3.1

const calc1 = new C(); // Remember that we always have to create a new class (a new instance of the Calculator class) in order to make calculations, we cannot do the math directly like: C.add()

console.log(calc1.add(2, 2));

// EXPORTS

// 4.
const calc2 = require("./test-module-2"); // calc2 is now the exports object.

console.log(calc2.multiply(3, 2));

// 4.1
const { add, multiply, divide } = require("./test-module-2");

console.log(multiply(5, 5));

// CACHING

// 5.
const third = require("./test-module-3");
third();
third();
third();

// require("./test-module-3")();
// require("./test-module-3")();
// require("./test-module-3")();
