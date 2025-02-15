import { friends } from "../models/friends.model.js";

export function getFriends(req, res) {
  res.json(friends);
}

export function getFriend(req, res) {
  const friendId = Number(req.params.friendId);

  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist.",
    });
  }
}

export function postFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing friend name.",
    });
  }

  const newFriend = {
    id: friends.length,
    name: req.body.name,
  };
  friends.push(newFriend);

  // piping the data back
  res.json(newFriend);
}
