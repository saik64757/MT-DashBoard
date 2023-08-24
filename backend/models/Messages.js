const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "comment is required"],
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  Order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postId: mongoose.Types.ObjectId,
  postUserId: mongoose.Types.ObjectId,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
