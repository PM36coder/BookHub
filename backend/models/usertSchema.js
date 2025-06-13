const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  isAdmin : {type : Boolean, default : false}
}, { timestamps: true });

//! protecting the password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error, "hashing error");
    next(error);
  }
});



//! Model banate samay
const User = model("User", userSchema);

module.exports = User;
