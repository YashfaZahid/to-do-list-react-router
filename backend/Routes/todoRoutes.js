import express from "express";
import Todo from "../Models/Todo.js";
import auth from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.uid });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      user: req.user.uid,
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.uid },
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.uid,
    });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;