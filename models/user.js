import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    business_id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema); // import the models from moongoose in case they exist
// or creates the user model with the user schema
export default User;
