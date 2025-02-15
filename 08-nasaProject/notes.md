# Project architecture

--> Anytime we build a fullstack application with several frontend and backend components, it often pays to think about the structure of our project.

-> This allows us to do a bit of work ahead of time so we are not constantly moving code around.

-> It does not mean that we are not going to improve the code as we go, but we do want to have a general idea of how our code will be structured.

-> This is the kind of work that the senior developer often does when the project is just beginning.

-> The fact that this application is fullstack, means that we are going to have a server component for the api and a client component for the frontend.

-> We will be working with the api and integrating it with the frontend.

-> One thing that helps is to build architectural diagrams, they help us to visualize the different parts or our project and how they interact.

-> There are several tools for this:

1. Figma.

2. Lucid chart.

3. Draw.io

# Folder architecture

1. The server folder.

--> We are going to use express and the mvc pattern.

-> The main idea is that we have models, views and controllers. The user uses the controller, which updates the model and receive back the updated view in response.

-> For this, the server folder will have a models folder and a routes folder. As for the controllers, we could create a new folder for those.

-> However, for larger applications, it tends to be good to keep related code together. Only separating code that deals with different functionality.

-> For this, since the controllers are directly related with the routes, they are going to live inside the routes folder.

-> This is done because the controller defines how we respond to a specific route.

--> We will have the server.js for our server, to make use of our routes, controllers and models.

----> In these large scale projects or applications, where we have multiple different pieces like a frontend and a backend, it is common that we create multiple node packages for those different parts of the application.

--> This means that the client and the server will have their own package.json file and, we will have a package.json at the root of our project folder.
