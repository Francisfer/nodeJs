# RESTful apis.

--> When designing apis, there is a pattern that guides us to follow the best practices.

--> What to name our endpoints, how to break down our functionality into smaller pieces are some of the guide lines provided by REST.

--> Some of them we have already been following, like endpoints being plural nouns. friends or messages.

--> They are plural nouns because they are collections, they represent collections or lists of the data that we are keeping track of.

--> We have also implement the ability to query these collections by the id of the item in that collection.

--> RESTful apis are those that follow a certain style or pattern when building http apis.

--> It stands for REpresentational State Transfer.

-> The representation and the state, both refer to how the server makes the data available.

-> Transfer refers to how the data is sent back to the user.

# CRUD

--> When it comes to apis, crud refers to the four basic operations that we can perform on data.

--> When we talk about http apis or RESTful apis, the crud operations correspond to the http verbs.

-> We can perform these crud operations to an entire collection of data of to a specific item in that collection (by the id).

-> This means that we make a post request to the entire collection (customers for ex) to create a new customer and not to the customer specific item.

-> If we want to update the entire customer object, we can use a put request. Because it updates the object and replaces the data.

-> If we just want to update certain parts of the customer object, we use patch. However, the most common is to use put.

# Running scripts from other folders.

--> Older syntax:
"server": "cd server && npm run watch",
"client": "cd client && npm run start",

--> Newer syntax:
"server": "npm run watch --prefix server",
"client": "npm run start --prefix client",
