const express = require("express");

const postDb = require("../data/helpers/postDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postDb.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await postDb.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the post!"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await postDb.insert(req.body);
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: "Post cannot be added!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error adding the post!"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await postDb.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been removed." });
    } else {
      res.status(404).json({ message: "Post cannot be found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the post!"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await postDb.update(req.params.id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Cannot update the post." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating the post!"
    });
  }
});

module.exports = router;
