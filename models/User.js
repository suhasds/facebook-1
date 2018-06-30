const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: {
    type: String,
    enum: ["m", "f"]
  },
  country: String,
  relationshipStatus: {
    type: String,
    enum: [
      "single",
      "in a relationship",
      "married",
      "divorced",
      "it's complicated"
    ]
  },
  profilePhotoUrl: String,
  coverPhotoUrl: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},{
    timestamps: true
});

const User = mongoose.model("User",userSchema);