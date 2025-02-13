// Here we need a function that reads the response and returns the data that we get back. Which needs to be decrypted.

function decrypt(data) {
  return "decrypted data";
}

function read() {
  return decrypt("data");
}

module.exports = { read };
