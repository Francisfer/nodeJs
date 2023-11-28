/*

We have learned before that nodeJs is all about asynchronous code, which was traditionally implemented using callback functions.

However, in modern javascript, we now have better tools to deal with asynchronous code. These tools are promises and async/await.

THE PROBLEM WITH CALLBACKS - callback hell.

There are some problems that can arise when we use too many callback functions. To see that, we are going to use a small example to illustrate this effect.

We are going to use the dog.txt file to read the dog's bread, then make an http request to get a random image of a dog with this bread and, finally save that random image to another text file.

This is a three step process and all of this will involve callback functions. We will use quite a popular api, the dog.ceo api.

Remember the __dirname console.log(__dirname);

1. First we read the file asynchronously to get access to the data. 

2. Inside of that callback, we want to do the http request to the api server. It is the first time that we make a request instead of handling the requests. There are ways of doing this with native nodejs modules but it is easier to use an NPM package for that.

For now we are going to use super agent, but later we will try another one. For this we do npm init and install nodemon also. npm i superagent as a direct dependency.

In order to use the superagent function to make a request, we call the get method on it. In there, we need the url. With the template literal, we can make the http request with the breed coming from data.

3. To get the data coming from the api, we need to use the end method, this is where we are going to pass the callback function (err and res as arguments).
This end is the end() for the request, when we handle the data that comes from the api.
The data that we get is in the response variable, in there we have the the body (which contains the message and the status) and the image link in inside of the message.

At this point, we understand that we needed the data from the readFile callback to be able to make the http request. This is the same as saying that we have a callback inside of a callback.

4. But now we will add another one, we first save the the string (link for the image) into a new text file (we don't use __dirname). The writeFile method takes in the directory to save the file, the data that we want to save and the callback (only with the error because we don't get data from writing a file).
At this point we get a new image per save (request) and we handle both the error from the server and for writing the file, this is already working fine. However, with this technique of callbacks inside of callbacks we can end up with many levels deep. 
Also, the code is both hard to read and hard to maintain over time.

For this, we will learn how to build promises and to consume them with async/await.

*/
const fs = require("fs");
const http = require("http");
const superagent = require("superagent");

/* UNCOMMENT
// 1.
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  // 2.
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      // 3
      if (err) return console.log(err.message); // For error finding the breed.
      // console.log(res.body.message);

      // 4
      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log(err.message); // For error writing the file to disk.
        console.log("Random dog image saved to file");
      });
    });
});
*/

/////////////////////////////////////////////////////////////////////////////////////////////////

/*

FROM CALLBACK HELL TO PROMISES

We will start learning promises by using one for the http request instead of a callback. 
Notice that this works because the superagent library supports promises out of the box.
For node functions, coming from internal node packages (like read file), we will have to build the promise ourselves.

For now we will learn how to consume promises, only later how to build them.

1. The get method of the superagent actually returns a promise. A promise has the concept of a future value (a value that we are expecting to receive sometime in the future).

The random image is the value that we expect sometime in the future. 
So, the get method will immediately return a promise as soon as we start the request.

It does not have a value yet, because the server is still getting the data in the background, but the promise is immediately available.
At that point, we can say that the promise is pending (it is a pending promise).

Having a promise available makes it so that all we need to do is to consume it. To consume is to say that we wait for it to come back with the data. 

To consume the promise, we use the then() method on it. Here we pass a callback function that will be called as soon as the promise is resolved (the data is available now as an argument, which we call the result). 

Keep in mind that a promise can be resolved as fulfilled(result that we want to use) or rejected(when there was an error).
For this, remember when we handled the error of making a request with a wrong dog breed, with promises, the promise itself would have been fulfilled but rejected.
Now all we do is to write the same code as before and get rid of the end method.

However, the then() method only handles fulfilled promises, if there is an error we can't handle it like this, we need the catch method. There is where we write the code for the errors, while in the then() we write the logic for the successful case.

*/
/* UNCOMMENT
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  // 1.
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((result) => {
      fs.writeFile("dog-img.txt", result.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Random dog image saved to file");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
*/

/*
 
PROMISIFYING THE READFILE AND WRITEFILE FUNCTIONS.

This means that we will make both methods return promises, instead of passing callbacks into them.

IMPORTANT - Here he teaches how to build promises by hand, we will do that but what matters is that there is a more recent way of doing this (at the end of this lecture)

1. What we want is a readFile function that returns a promise, only receiving a file name and no callback. 
For this we need to create a function (readFilePromise) that receives a file name and return a promise (we do this with the new promise constructor).

The promise constructor takes in a executor function, which gets called immediately when the promise is created. The executor function takes in two arguments - resolve and reject.

2. For now we are not going to pay attention to these arguments. We will focus on the executor function itself because this is where we do all the asynchronous work.

This is where we are gonna call the readFile method with the the file name and the usual callback. Remember that this is promisifying (it is the readFileFunction that returns a promise).

3. Now it is where the resolve and the reject functions come into play (the arguments of the executor function are both functions). Calling the resolved function marks the promise as fulfilled and returns the resolved value from the promise, so we call resolve with data.
This data is going to be the breed of the dog in our case, but generally speaking, whatever value we pass in the resolve function is what will be available (as the argument) in the then method.

4. We can also, and should, mark the promise as rejected in case there is an error. We do that by calling the reject function. Whatever we pass here will later be available in the catch method.

REVIEW - We created a newFilePromise function and in there we pass a file name. Then we return a promise.
The promise takes in one executor function, which has the resolve and reject functions as arguments and, also, it is where we do all the async work (fs.readFile).
Then, if the data arrives successfully, we call the resolve function with the resolved value (which is the data from reading the dog.txt, so the breed) and, if there is an error, we call the reject function with the error (or a log of not found)

5. Now we do the same for the writeFile method. Notice that both the values of the resolve and reject are just strings, first because we need to manually set the kind of error/reject value (this in both functions), and also because here the fulfilled value does not exist (writeFile).

6. After that we just need to chain the methods. REMEMBER that to chain the methods successfully we always need to return the promises (even the functions that already return a promise). Also remember that the writeFile does not have any data, only the error.

REVIEW - The readFilePromise function that we've created returns a new promise, allowing us to chain the then() method. 
After that, we make the callback of that then() method return again a promise, because the get() method of the superagent also returns a promise. Doing this allows us to chain the next then() method/handler.

*/
/* UNCOMMENT 
// 1.
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    // 2
    fs.readFile(file, (err, data) => {
      // 4
      if (err) reject("Couldn't find that file");

      // 3
      resolve(data);
    });
  });
};

// 5
const writeFilePromise = (fileDir, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileDir, data, (err) => {
      if (err) reject("Could not write the file");
      resolve("File successfully written");
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((response) => {
    return superagent.get(
      `https://dog.ceo/api/breed/${response}/images/random`
    );
  })
  .then((response) => {
    return writeFilePromise("./dog-img.txt", response.body.message);
  })
  .then(() => {
    // This is the last promise that we need to handle and we don't have a resolved value because the last promise was to write a file. we just log a success message.
    console.log("Random dog image saved to file");
  })
  .catch((err) => {
    // Here we can't read the error from the server because we created our own errors.
    console.log(err);
  });

  */
