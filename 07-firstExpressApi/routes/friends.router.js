import express from "express";

import * as friendsController from "../controllers/friends.controller.js";

export const friendsRouter = express.Router();

// friendsRouter.get("/friends", getFriends);
// friendsRouter.get("/friends/:friendId", getFriend);
// friendsRouter.post("/friends", postFriend);

friendsRouter.get("/", friendsController.getFriends);
friendsRouter.get("/:friendId", friendsController.getFriend);
friendsRouter.post("/", friendsController.postFriend);
