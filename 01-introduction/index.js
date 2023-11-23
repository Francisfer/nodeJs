/*
VSCODE EXTENSIONS 

DotENV - useful to highlight environmental variables in a dotenv file.

ESlint - useful to find bugs in our code.

Pug beautify - useful when building templates.

TabNine - auto completer.

TODO highlight

INITIAL COMMANDS
  - Node on terminal opens a repl (read, eval, print, loop)

  - .exit ; cmd + d or ctrl c.

  - tab allows us to se all the global variables and the modules.

  - To run a script instead of a repl we need to specify the file, in this case index.js - node index.js

MODULES

1. const fs = require("fs");
2. const http = require("http");
3. const url = require("url");

EXPORTS AND IMPORTS
Every js file is a module that can import or export functionality. In this example we exported the replaceTemplate function to another module and then imported it here.

There are different ways for exporting functionality from a module, we are going to talk about this later, for now, in node, we can achieve this with module.exports

In each module we have access to an object called module, on which we can set the exports property. Then we set it to what we want to export.

In this case it is just one function so he used an anonymous export, so we can give a name when we import it, but there must be a way to make named exports.

INTRODUCTION TO NPM AND THE PACKAGE.JSON FILE //////////////////////////////
Whenever we start a new project, the first thing that we usually do is to start it with npm init. 

NPM INIT - Creates the package.json.
         - The package name should always be url friendly.

DEPENDENCIES/INSTALLS/PACKAGES
REGULAR: npm i nameOfThePackage (--save previously but no longer necessary)

slugify - helps with the names on the url's. A slug is the last part of a url that contains a unique string that identifies the resource that the website is displaying (THE id). This is to mask that id for another name.
console.log(slugify("Fresh Avocados", { lower: true }));
By using slugify directly in our code we make it dependent of that module.

DEV DEPENDENCIES: npm i nameOfThePackage --save-dev

nodemon (helps to develop node applications by automatically restarting the server (node application) whenever we make changes to the code - nodemon index.js).


1. The two types of packages that we can install are simple/regular dependencies and development dependencies.  

    1.1 - Simple or regular dependencies are packages that contain some code that we will include in our own code. In other words, code upon we built our own application (express).
    The first regular dependency that we are going to install is slugify (tool that we can use to make more readable url's out of names).

    1.2 - Development dependencies are usually just tools for development (code bundler like webpack, a debugger tool or a testing library).
    These dependencies are not needed for production, the code does not really depend on them but we use them to develop our applications.
    The first that we install in nodemon.

2. We can install packages locally or globally, nodemon for ex is like live server, we can install it globally because we need it for all node projects.
However, most of the dependencies, especially the regular ones, are advised to be installed locally only.
Another difference is that, if we install a dependency locally, we can't just run it right of the box from the command line, we need a npm script. After the command is specified in the script, we can run it in the command line with npm run "nameOfTheScript".
start - the default for development, that's why we don't need the run keyword, npm start in enough.

3. We've already imported the core modules, our own modules and now the third party modules.
The order is exactly that one. The process is the same, we require the module and save the result into a variable. Requiring is simply going to the node modules and fetch what we are asking for.
The core modules didn't need a script because we have node installed globally, so every module that is part of the core don't need to be in the script.
Everything else needs because we are installing the dependencies locally, so we need the node modules to have this data when we require.

4. Dependencies version: "slugify": "^1.6.6"
The first number is the major version (huge new release which can have breaking changes - our code can break).
The second is the minor version (introduces some new features into the package but does not include any breaking changes - meaning that changes made here will always be backward compatible - our code does not break) and the third is the patch version(only to fix bugs).

    4.1 - Because of this, it is important to talk about updating packages. The ^ symbol specifies which updates we accept for each package. It's default means that we accept minor and patch releases. If we just want patch releases the symbol is ~ (a bit safer), if we want them all is * (not a good idea).

    UPDATE packages. The first thing we do is to see if there is any package that is outdated with npm outdated. We do not have any outdated, but he installs a previous version of slugify to show how we can update.
    To install a specific version we write npm i slugify@1.0.0
    To update we do npm update slugify (which depends on the updates that we accept ~ or ^).

    DELETE packages - npm uninstall express



Node allows us to do a lot more than javascript, for example reading files from the file system.

In order to do this we need a node module, node is build around the concept of modules where all kinds of functionality is stored inside of a module.

For reading files, that functionality is part of the FS module (file system).

To open these modules or to actually use them, we need to require them into our code and save the result of requiring the function into a variable.  

By requiring or importing this module (remember that this way is common js, but we already have es modules) we will have access to functions to read and write data right to the file system.
The result is an object in which there are lots of functions that we can use, now stored in the fs variable.

////////////////////////////////////////////////
1. Read data from files and write data into files synchronously.

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

////////////////////////////////////////////////
2. The asynchronous nature of node js.

In order to make the code non-blocking, we defer our actions to the future, so we don't clutter the single thread execution.

This is the reason why node is designed around callbacks. In other languages each user gets a new thread.

It is important to understand that using callbacks does not make our code asynchronous. Passing functions into other functions is quite common in javascript, but that doesn't make them asynchronous automatically.

It only works this way for some functions in the node api, like the readFile.

With the read file in async mode, after the file path, we specify the character encoding, and the third parameter is a callback. If we omit the character encoding we get a buffer.

After the readFile reads the file asynchronously, the callback is called with two arguments: err, data. Note that this is a very common pattern in node, the first parameter as the error and the second as the data.

fs.readFile("./txt/start.txt", "utf-8", (error, data) => {
  console.log(data);
});

Callback hell with the example of how to write files, first argument is the path, the second is what we want to write and the third is the callback. Note that we don't read any data when writing, so the only argument that we have in the callback is the error.

fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
      console.log(data3);

      fs.writeFile(
        "./txt/final.txt",
        `${data2}\n${data3}`,
        "utf-8",
        (error) => {
          console.log("File has been written");
        }
      );
    });
  });
});

Remember that arrow functions do not have their own this keyword, they use the this keyword from the parent function, also called the lexical this keyword.


*/

// Core modules

const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
const url = require("url");

// Third party modules
const slugify = require("slugify");
// Our own modules. Notice that we don't need the .js

const replaceTemplate = require("./modules/replaceTemplate");

//////////////////////////////////////////////// FILES
/* UNCOMMENT

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
console.log("file written");
*/
// Async
/*UNCOMMENT
fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
  if (error) return console.log("Error");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
    console.log(data2);

    fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
      console.log(data3);

      fs.writeFile(
        "./txt/final.txt",
        `${data2}\n${data3}`,
        "utf-8",
        (error) => {
          console.log("File has been written");
        }
      );
    });
  });
});
*/

//////////////////////////////////////////////// SERVER
/*
Creating a simple web server.
I order to do this, we need another package/module. The http module is the one that gives us networking capabilities, such as building an http server.

To build a server, we have to do two things: first we create the server and save the result into a variable, then we start the server so that we can listen to incoming requests, and we do so by calling the listen method.

Just like with other modules, we use a method from the http object called createServer(). This method accepts a callback function which will be fired off each time a new request hits the server.
This callback has access to two important and fundamental variables(arguments, in fact they are objects). The request and the response arguments.
The req object holds all kind of information like the request url...
The res object gives a lot of tools for dealing with the response.

For now we just want to send a response to the client, which is done using the res object with the end method.

In order to start the server we first need to store the result of its creation into a variable.

Then we can the listen method on it. The first parameter of listen is the port, the second is the host (localhost by default - but we can specify it manually).
The local host usually have the same address (standard) that we've specified and it simply means the current computer, so the computer that the program is running. 
The third and optional parameter is a callback function that will be run as soon as the server starts listening.
Usually we just log a message in order that everything is working.

Now we go to that url after we run the node application. Notice that the application still working because of the event loop (more on this after). 

After we navigate to 127.0.0.1:8000, so after we make a request to the server, we took a peak to the req object to see what we have access.

// Creating
const server = http.createServer((req, res) => {
  res.end("Hello from the server");
});

// Starting the server - listen for requests
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

//////////////////////////////////////////////// ROUTING
At this point, the code that we have do not react to the url that we are requesting.
If we write 127.0.0.1:8000/product we get the same response. /product is the route.

If we look at the example, we can see the overview and if we click on one of them the route changes to product.

This is basically routing, routing means implementing DIFFERENT actions for DIFFERENT url's.

This means that now we need to implement some logic in order to make this happen.

Routing can become really complicated in a big application, that's why we need express. For now we will do everything from scratch.

The first step is to be able to analyze the url, for this we need another node built in module called url. We are not going to use it just yet, but remember that this module is going to be helpful with url's that have the id parameter and others.

If we take a look to the req.url we will see that we have access to it in the req (/). The other request that appears is the request made by the browser automatically for the website fav icon.
If we write 127.0.0.1:8000/product, the next request is going to have the url: /product.
This means that the req.url contains what comes next to the slash after the port.

In order to implement the routing, all we need is a big if/else statement. Notice the saving of the path (req.url) into a variable.
Notice the first condition because of the fact that the overview is the same as the root.
Now, based on the path name we take the decisions / send back different responses.

At this point, if we go to a path that we did handle everything works fine, but if we go for one that we didn't the server keeps trying to send a response in a loop, so we need a fallback (last condition - res.end("Page not found!");)

Usually, when we see this error of page not found, it is usually with the code 404. 404 is an http status code. Since we are sending a response, we can also add this code into it.

There are multiple ways of doing this, but he uses the res.writeHead(404) because this method can do more than just status code.

Something more that the writeHead method can do is to also send headers. Http header is a peace of information about the response that we are sending back (more on this further in the course). This information is destined to the browser.
One of the standard headers is to inform the browser of the content type. "Content-type": "text/html",

Just like this, the browser is now expecting some html, so, what we can do is to make a h1 element out of the response:
res.end("<h1>Page not found!</h1>");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

IMPORTANT - The status code and the headers always need to be set before we send the response. We cannot send headers after the response content itself.

FINAL RESULT BEFORE WORKING WITH THE TEMPLATES:
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Creating
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data); // Now we just send it.
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

// Starting the server - listen for requests
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

//////////////////////////////////////////////// BUILD A SIMPLE WEB API
As we know an api is a service from which we can request some data. In this case it is data about the products that we are offering.

We have a dev-data folder and in it a json (an array with five objects). Each of the keys has to be a string.
Basically, this data is what the api will send to the client when requested.

We will now have a new route and for now we just send another response:
else if (pathName === "/api") {
    res.end("This is the api");
  }

After this, what we want is to read the data from the json file and parse it into javascript.

1. The first approach is to go to the respective route and use the readFile method to read the file. This is not the only way of locating the file in the file system (with the path - fs.readFile("./dev-data/data.json");)
But we have a better way, all node js scripts have access to a variable called dirName and this variable always translates to the directory in which the script that we are executing is located.
fs.readFile(`${__dirname}/dev-data/data.json`);

2. After this, we write the character encoding and finally the callback where what to do with the data.
The first thing is to parse the json format to javascript. const productData = JSON.parse(data);
We are not going to send this as a response now, but we will later need this parsed so we can work with the templates.

So, if we want to SEND the data as a response we need to tell the browser that data goes under the format of json (we need to say application/json).
const productData = JSON.parse(data);
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);

Although this works it is not perfect, every time that someone goes to the path of the api, the file needs to be read over and over again.

The solution is to read this file outside synchronously (Only for top level code - things that are only executed once and in the beginning).
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data); 

//////////////////////////////////////////////// HTML TEMPLATES

Let's now do the first part of building the dynamic node farm website, which is building the templates that will actually hold the data.

These two templates will be build based on the static pages that we have in the templates folder. We start with the product.html

Notice that we have the styles in the head so we don't have to make multiple requests to get all the code.

Now we need to replace all the pieces of code that we want to add dynamically with a placeholder (then, with our code, we replace the placeholder with the real piece of data). {%PRICE%}

The only one that is different is the organic badge. If the product is not organic, a class will be added so it's display is set to none. So we need to do some logic within the class, but for now we just add the placeholder.
After this we change the name of the file to template-product.

As for the overview, things will be a bit different. Notice that we have a div which is a card container, so each figure element is a card.
But we don't know how many cards can be generated by the api, if we just have one product we don't want the other cards to show.

The solution is to create another template where there is only one card there, then we will include one of these templates for each card that we want.
After this we can delete all the cards from the overview-template and create a placeholder there.
Later in our code we will create as many cards as we need, put them into one string and replace the placeholder with that string.
Now we replace the data with the placeholder, notice that also we need to work with the organic class and we need to build the href of the link.

FILLING THE TEMPLATES 

We are starting with the overview page and, the first step is to load/read the template overview. 
This is the same as saying that, each time there is a request for the root or the overview route, the first thing that we are going to do is to read the template overview.
Again, we can do this right at the beginning when we start the application because the templates will always be the same.

For the root and overview route we are sending data, remember that every time we do that we need to send a header to the browser with the type of file that we are sending.
Then we just send the template.
if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(tempOverview);

Now we already have our styled page with the placeholder, which we need to replace with the data from dataObj(json).
We now need to loop over this dataObj (which is an array) and replace the placeholders in the template.

We are looping with map because we want to return something that we store in the cardsHtml variable.

In the callback, we are not going to write the code directly to replace the placeholders at each iteration, instead we create a function.

This function will take the template card and the current element (product). In there, we are going to replace all of the placeholders. 

We do this in a "chain" by setting the output to a let variable, so first we can replace the product name, than mutate the variable for the rest. Also, this is how we avoid the bad practice of directly manipulate the arguments that we pass into a function. 
First we create a new variable and from there on we manipulate it, not the argument.
Notice that, to replace, it is better to use a regex with the global flag instead of the template literal to assure that all instances are replaced.

We also deal with the organic and not organic here. If the product is not organic, so false (remember that the value is a boolean), we want to replace the placeholder with the class of not-organic (sets the display to none). Remember that we are still in the temp overview.

WHAT IS DONE SO FAR
We loop over the dataObj that contains the array of object that came from the json file. At each iteration we replace the placeholders in the template card with the current product (remember that these cards are to be in the overview, but we created another template so we just inject the ones that are in the api).
After the replaceTemplate function is called by the map method (called as many times as there are curr el), the loop will return with the five final html's. 
The return is in the same format as the input, so an array with the five elements (strings). We don't want an array, so we just need to chain the join method after the map.

Now we just need to replace the placeholder in the overview with this new string and respond with the output. 


HOW TO PARSE VARIABLES FROM URL'S

This is where we are going to use the url module that we've imported at the beginning.
We start by logging two things to the console, the req.url and the result of using the module (url) calling parse on the url. console.log(url.parse(req.url, true)); We need to pass true in the parse method so that we can parse the query into an object.
The query is the string ?id=0 and that is what we are parsing, that part from the url. 

The url from the request is everything after the port (/product?id=0), and it changes when we click on the links, but we don't have any route like that (with the id basically).

The result of parse is an object that contains information, among which is the query object that tells us the id. Remember that there is a more recent way to do this.

Now we use destructuring so that we can extract the query and the pathname.

With this is now time to build the product page using the template, this time we do not need to loop because there is only one product, all we need to do is to replace the data using the function that we've created with base on the product id.

// Which product we want to display:
    const product = dataObj[query.id];

    // The output based on the previous data coming from product

    const output = replaceTemplate(tempProduct, product);
    res.end(output);


*/
// Top level code, we could not do this inside of the callback that creates the server.
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Slugify all the productName
const slugs = dataObj.map((el) => {
  return slugify(el.productName, { lower: true });
}); // Now we could add each slug to the json and replace the id for the slug in the code.

// Creating the server
const server = http.createServer((req, res) => {
  // console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  // const pathName = req.url;

  // OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    // to say the type of file we are sending
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    // Looping to replace the data
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    // Replacing
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    // sending the file
    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    // Which product we want to display:
    const product = dataObj[query.id];

    // The output based on the previous data coming from product

    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });

    res.end(data); // Now we just send it.

    // NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

// Starting the server - listen for requests
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
