const express = require("express");

const app = express();

// Server
app.get("/", (request, response) => {
  response
    .status(200)
    .json({ message: "Hello from the server.", app: "Natours" });
});
app.post("/", (request, response) => {
  response.status(200).json({ message: "You can post to this endpoint" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
