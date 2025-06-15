import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"; // Required import

const UserSchema = new Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Mobile: {
    type: Number,
    required: true,
    minlength: [10, "Mobile number should be 10 digits"],
  },
  Password: {
    type: String,
    required: true,
    minlength: [8, "Password should be more than 8 characters"],
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  next();
});

const Users = mongoose.model("Users", UserSchema);
export default Users;
