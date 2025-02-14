/* 

--> What defines how our webserver responds to requests is our api.

  -> The api tells us what kind of functions the server should support and how those functions should be used.

  -> These functions are to get data, post data etc.

  -> We can implement our api on the server with node. The language that we use when reacting to requests and sending responses is http. Which is used for browser and server communication.
  
  -> Search mdn for http request methods. get, head, post, put, delete, connect, options, trace, patch.


--> API is a software intermediary that allows two applications to talk with each other. Like a browser and a web server.

  -> On the web, generally, it is the browser that makes the requests and the server that responds to those requests.


--> Requests / verbs have four main parts.

  -> 1. Method - post, get... The method defines the operation that the browser wants to perform on the server.

  -> 2. Path - Each method is matched up with a path, to a collection or a specific item of a collection /messages.
  
  -> 3. Body - We can send data to the server by using the body of the request. This can be done with a variety of formats like text, but the most common is json. 
  
    -> We usually have a body on post and put requests, but not on get or delete because for those operations, the server has all the information that it needs from the method and the path.

  -> 4. Headers - These are optional properties that we can specify on a request to send additional metadata to the server. data about the data that we are sending.

    -> Size of the data, authentication information so that the server knows our permissions to perform a certain operation.

    -> The only mandatory header that every single request must have is the host header. It specifies which server the request is being sent to, sometimes including the port.
    



--> Responses. In http, responses are even simpler than requests, we have three main parts.

  -> 1. An optional list of headers. 
  
    -> Content-Type: application/json - Can also be found in requests, tells us the type of data being sent in the body of the request or response.

  -> 2. Body - Contains the data that is being fetch from the server or sent from the server.

  -> 3. Status Code - This is where the response differs from the request, it tells us if the request was successful or not (with an error code). 401 you are not logged in and 403 you are logged in but you don't have access to the content.



*/
