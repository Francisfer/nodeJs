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
const { error } = require("console");
const fs = require("fs");
const http = require("http");
const superagent = require("superagent");
const { CLIENT_RENEG_LIMIT } = require("tls");

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

/////////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////

// CONSUMING PROMISES WITH ASYNC/AWAIT

/*

Let's learn about the javascript feature async/await. 
Promises made our code a lot better already, but we can still do better. 

Instead of consuming promises with the then() method, which still makes us use all these callback functions, we can use the async/await feature.

Usually, when we write code, we consume promises all the time but we don't produce them so much, so async/await makes this a lot easier to do.

1. In order to use this feature, we need to create an async function. We write an arrow function, but we could still write a function declaration or expression to.
const a = async function () { 
}
This async function keeps running in the background while performing the code that is in it, while the rest of the code keeps running in the event loop. They do not block the event loop.

The async function will also return a promise, more on that later.

For now, the important thing to know is that, inside of an async function, we can have one or more await expressions.
This is how they work: 

2. We use await and the promise after. Remember that we are using the functions that we wrote to promisify readFile.
We can save the result (fulfilled value) of awaiting the promise into a variable. Like that, it is the same of having the previous piece of code: 

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => { cl data };

To understand what is happening, the await keyword will stop the code from running until the promise is fulfilled. 
If the promise is resolved, the value of the await expression is the resolved value of the promise, which is finally assigned to the data variable.

That's it, before we had the promise and after the handler (then() method), now we just await the resolved value of the promise and store it into a variable.

3. The next step is getting the image of the dog from the api. We just do the same.

4. Our final promise is to write that string into a file. This does not return (resolve) any meaningful value so we don't need to store it in a variable. It is important to remember that we can write the log of success like this because, if there is an error before the code will not execute until the end.

5. Now, we need to handle the errors. Before we've used the catch method, but now we can't actually chain it anywhere. What we need to do is to use the try/catch.
Just keep in mind that try/catch has nothing to do with async/await, it is a standard javascript feature. 

If there happens an error in the try block, it will immediately exit the block and move to the catch block, which gives us access to the error that happened in the try block.
Notice that we still have the same problem than before, since we've created the promises, logging the error message from the api is not possible, but we are not going to build promises like this in the future.

REMEMBER that we can only use await inside of an async function, event the async/await comes together.
This is syntactic sugar for promises, it just a skin that makes our lives easier and the code to look more synchronous, behind the scenes, the then() method and the callback are still being applied.
*/

// 1.
const getDogPic = async () => {
  // 5.
  try {
    // 2.
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // 3.
    const result = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(result.body.message);

    // 4.
    await writeFilePromise("./dog-img.txt", result.body.message);
    console.log("Random dog image saved to file");
  } catch (error) {
    console.log(error);
  }
};

// getDogPic();

/////////////////////////////////////////////////////////////////////////////////////////////////

// RETURNING VALUES FROM ASYNC FUNCTIONS

/* 

We have already learned to how to use async/await, but there is more to learn about how async functions actually works. 

1. For this we need to create some cl after and before calling the async function. This first example is easy to understand, both logs in the top level code will be executed immediately, before the logs from the async function.
This happens because the async functions run in the background, so that the code from the main thread (event loop) keeps running.
We need to get some pictures from an api, but we never want to stop the execution of the main thread because of that.
So, as a result, when javascript sees the line of code that calls the async function, it offloads it to the background and go straight to the next line.

2. In this example, let's imagine that we want to return something from this async function (which is very common in real life code).
In order to see the returned string we need to store the result of calling the function into a variable and log it.
The result of variable x, at this point, is Promise { <pending> } instead of the string that we were waiting for.
X is a pending promise instead of the string because it is still running, so still pending. Javascript cannot know that x will be the ready string at some point, so it moves to the next line. 
By the time that it knows that the x should be the string, that code has long finished execution. 
const x = getDogPicThisExample();
console.log(x);

2.1 - SO, what should we do if we actually wanted to get that returned value at that point (the string and log it to the console)?
We would have to treat the async function as a promise, use the then() method on it or use async await. Of course we would have to include the last log in that code.

2.2 - If there was an error, we would still enter the then() code block (although the string that we return is read as undefined), because even with an error, the promise is resolved successfully. 
If we wanted to mark it as rejected, we would have to throw the error (also notice that we need to handle the errors in the then() method).

3. The problem with this is that we mix async/await with promises (then() and the callbacks), so let's try to be consistent and use async/await for implementing this logic.
We don't want to create a whole new named async function for this (remember that await only works inside of an async function), so we deal with this with an iife.


*/
const getDogPicThisExample = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const result = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(result.body.message);

    await writeFilePromise("./dog-img.txt", result.body.message);
    console.log("Random dog image saved to file");

    // 2. RETURNING SOMETHING
    return "Step 2: Ready!";
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 1.

console.log("Step one: Will get dog pics!");
getDogPicThisExample();
console.log("Done getting dog pics.");

// 2.
console.log("Step 1: Will get dog pics!");
const x = getDogPicThisExample();
console.log(x);
console.log("Step 3: Done getting dog pics.");

// 2.1

console.log("Step 1: Will get dog pics!");
getDogPicThisExample()
  .then((result) => {
    console.log(result);
    console.log("Step 3: Done getting dog pics.");
  })
  .catch((error) => console.log(error));

// 3.

(async () => {
  try {
    console.log("Step 1: Will get dog pics!");
    const x = await getDogPicThisExample();
    console.log(x);
    console.log("Step 3: Done getting dog pics.");
  } catch (error) {
    console.log(error);
  }
})();

/////////////////////////////////////////////////////////////////////////////////////////////////
/*
// WAITING FOR MULTIPLE PROMISES SIMULTANEOUSLY.

The final lesson from this module is about how to run several promises at the same time, remember that we also have promise.race and another (REVIEW).

So. let's say that we want three random pictures instead of just one, we could do something like this: 
const result = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
const result = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
const result = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

This is simply awaiting the three api calls, one after another, but why would we make the second api call wait for the first one and the third one wait for the second? 
This adds unnecessary waiting time when we could just run all of these promises at the same time.

1. What we will do is not to wait the promise at this point, but instead save the promises into variables. Note that we want to save the promise and not the resolved value of the promise. Like this we have three promises.

2. In order to get the resolved values we create a new variable and await Promise.all(), in there we pass an array of promises.
Promise.all() is resolved with an array with all the resolved values. 

3. We were reading result.body.message before, that is where the img is, but now we have an array, so we need to loop over it to get those values.

4. After that we join by a new line those strings as we write it to the file.
*/

const getDogMultiplePic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    // 1.
    const result1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const result2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const result3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    // 2.
    const all = await Promise.all([result1Pro, result2Pro, result3Pro]);

    // 3.
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    // 4.
    await writeFilePromise("./dog-img.txt", imgs.join("\n"));
    console.log("Random dog image saved to file");

    return "Step 2: Ready!";
  } catch (error) {
    console.log(error);
    throw error;
  }
};
getDogMultiplePic();
