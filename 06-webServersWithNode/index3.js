/* 

*/

import http from "node:http";

const server = http.createServer((request, response) => {
  if (request.url === "/friends") {
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify({
        id: 1,
        name: "Jonas",
      })
    );
  } else if (request.url === "/messages") {
    // Instead of writing the head like above, we can do it separately:
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<body>");
    response.write("<ul>");
    response.write("<li>Hello there.</li>");
    response.write("<li>Hello there twice.</li>");
    response.write("</ul>");
    response.write("</body>");
    response.end(); // we are no longer writing to the stream
  } else {
    response.statusCode = 404;
    response.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
