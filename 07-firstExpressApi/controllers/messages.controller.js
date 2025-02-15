import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // ✅ Get current file path
const __dirname = path.dirname(__filename); // ✅ Get current directory path

export function getMessages(req, res) {
  // res.send("friends route");
  // We don't need to specify the Content-Type because express does it automatically by the extension of the file name.
  res.sendFile(path.join(__dirname, "..", "public", "skimountain.jpg"));
}

export function postMessage(req, res) {
  res.send("updating messages");
}

/* 

--> It is fine to send back raw data back to the user, that is what we've been doing so far.

--> However, sometimes, our servers need to send entire files that already live on our server machines back to the client.

--> Express makes it easier to do it.

--> We put the files that we want to make available from our server in the public folder.

--> Then, in the response, we use res.sendFile("path").

--> This path needs to be the absolute path of the file. The absolute path is the path from our system, which later is going to be the absolute path from the machine where we host our backend.

-> For this, we need the built in path module.

-> What this does is to assure compatibility on how different operating systems handle paths.

-> Mac and linux use /, while windows use \.

--> The __dirname is a node built in variable to get the name of the folder where we are currently.

-> In this case, we are in the messages.controller.js, meaning that __dirname points to this file.

-> To go to the public folder, we need to move up one level to get to the public folder and select the file.

*/
