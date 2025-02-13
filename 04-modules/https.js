// This is the top module.

// We write a function that allows us to make a request against some server, to send some data.

// This function will take the url and the data to be sent.

// Say that we want to break the details of the request and the details of the response.

// We create two separate files or modules.

const { send } = require("./request");
const { read } = require("./response");

function request(url, data) {
  send(url, data);
  return read();
}

console.log(request("https://google.com", "Hello"));
