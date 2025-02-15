import express from "express";

import * as messagesController from "../controllers/messages.controller.js";

export const messagesRouter = express.Router();

messagesRouter.get("/", messagesController.getMessages);

messagesRouter.post("/", messagesController.postMessage);
