// The key for our request is a function that allows us to send the request to a url with some data.

// Since we are simulating an https request, we need a function that encrypts our data.

function encrypt(data) {
  return "encrypted data";
}

function send(url, data) {
  const encryptedData = encrypt(data);
  // Send it to the url of the server.
  console.log(`Sending ${encryptedData} to ${url}`);
}

module.exports = { send };
