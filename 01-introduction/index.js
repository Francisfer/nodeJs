/*
INITIAL COMMANDS
  - Node on terminal opens a repl (read, eval, print, loop)

  - .exit ; cmd + d or ctrl c.

  - tab allows us to se all the global variables and the modules.

  - To run a script instead of a repl we need to specify the file, in this case index.js - node index.js

INSTALLS


MODULES
Node allows us to do a lot more than javascript, for example reading files from the file system.

In order to do this we need a node module, node is build around the concept of modules where all kinds of functionality is stored inside of a module.

For reading files, that functionality is part of the FS module (file system).

To open these modules or to actually use them, we need to require them into our code and save the result of requiring the function into a variable.  

By requiring or importing this module (remember that this way is common js, but we already have es modules) we will have access to functions to read and write data right to the file system.
The result is an object in which there are lots of functions that we can use, now stored in the fs variable.

////////////////////////////////////////////////
Read data from files and write data into files synchronously.

READ 
- fs.readFileSync(path, char encoding) reads files synchronously
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

WRITE
- Notice the text out variable, we are just building a template string where we use the textIn and a date.
Then we use the fs module to write this into a new file.
The first argument is the path of the file where we want it to be created (see how it works if we already have a file that we want to write on), the second argument is what we want to write into that file, so the textOut variable.
We don't need to save the result in a variable because what the function returns is nothing meaningful, however there is the habit of just logging that the file was written.

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
console.log("file written");

*/
const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
console.log("file written");
