const express = require("express");

const userDb = require("../data/helpers/userDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userDb.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the users."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the user!"
    });
  }
});

// add an endpoint that returns all the posts for a user
// this is a sub-route or sub-resource
router.get("/:id/userposts", async (req, res) => {
  try {
    const userposts = await userDb.getUserPosts(req.params.id);

    res.status(200).json(userposts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error getting the posts for the user."
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userDb.insert(req.body);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: "User cannot be added!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the user!"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await userDb.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The user has been removed." });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the user!"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await userDb.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the user!"
    });
  }
});

module.exports = router;
