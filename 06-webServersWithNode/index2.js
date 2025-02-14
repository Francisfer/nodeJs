/* 

--> This current server always responds with the same thing.

*/

import http from "node:http";

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.end(
    JSON.stringify({
      id: 1,
      name: "Jonas",
    })
  );
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
