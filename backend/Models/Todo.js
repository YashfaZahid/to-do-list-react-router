import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);