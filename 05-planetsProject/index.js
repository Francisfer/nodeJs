import { parse } from "csv-parse/browser/esm";

// This parser converts csv files into arrays and objects.

// It implements the node.js stream API. Streaming means that we work on the data as it arrives, without having to wait for large files to be fully available in memory.

// The parse function from csv-parse returns an event emitter that deals with streams of data coming in from that file.

// However, at this point at least, the parse function does not deal with files directly, it only knows about streams.

// For this, we need to use the built in file system module, using the create readable stream function on the result of calling parse.

// The readable stream emits various different named events, depending on what is currently happening to that file. the close event and the data event when a chunk of data was read from the file. And the end event.

import fs from "fs";

const results = [];

fs.createReadStream("kepler_data.csv")
  .on("data", (data) => {
    // Pushing each chunk of data into the array.
    results.push(data);
  })
  .on("error", (err) => console.error(err))
  .on("end", () => {
    console.log(results);
    console.log("done processing the file");
  });
