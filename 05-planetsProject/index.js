// This parser converts csv files into arrays and objects.

// It implements the node.js stream API. Streaming means that we work on the data as it arrives, without having to wait for large files to be fully available in memory.

// The parse function from csv-parse returns an event emitter that deals with streams of data coming in from that file.

// However, at this point at least, the parse function does not deal with files directly, it only knows about streams.

// For this, we need to use the built in file system module, using the create readable stream function on the result of calling parse.

// The readable stream emits various different named events, depending on what is currently happening to that file. the close event and the data event when a chunk of data was read from the file. And the end event.

// When we log the results, we get an array of buffers, these buffers are just objects that node uses to represent a collection of bytes.

// This happens because createReadStream is just reading the raw data in our file as bits and bytes.

// This means that we still need to parse the results and understand the values of the kepler's observations.

// What we want is to parse each chunk of data that comes in our stream as a row of comma (,) separated value file.

// This outputs an object where the name of the column is the key and the corresponding value is assigned to that key.

// Because the parse function is designed to be used with streams, we can pipe the output of our file to the parse function.

// The pipe function is meant to connect a readable stream source to a writable stream destination.

// The kepler file is our source and the parse function is the destination for our pipe.

// There are a few different ways of parsing csv data, depending on how the file is written. In this case, the comments start with an #, but it could be other symbol.

// For the file to be parsed correctly, we can pass in an object of options to the parse function.

import { parse } from "csv-parse";
import fs from "fs";

const habitablePlanets = [];

function isHabitablePlanet(planetObj) {
  return (
    planetObj.koi_disposition === "CONFIRMED" &&
    planetObj.koi_insol > 0.36 &&
    planetObj.koi_insol < 1.11 &&
    planetObj.koi_prad < 1.6
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      columns: true,
      comment: "#",
    })
  )
  .on("data", (data) => {
    // Pushing each chunk of data into the array.
    if (isHabitablePlanet(data)) habitablePlanets.push(data);
  })
  .on("error", (err) => console.error(err))
  .on("end", () => {
    // console.log(habitablePlanets);
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });
