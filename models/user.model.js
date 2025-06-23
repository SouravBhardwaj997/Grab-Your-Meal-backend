import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    contact: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    userRole: {
      type: String,
      require: true,
      enum: ["customer", "admin"],
      default: "customer",
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  console.log("Before Hashing:", this.password); // Should show plain text password
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  console.log("After Hashing:", this.password); // Should show hashed password

  next();
});

userSchema.methods.comparePasswords = async function (userPassword) {
  console.log(this.password);
  return await bcryptjs.compare(userPassword, this.password);
};

const User = model("user", userSchema);

export default User;
