import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { isEmail } = validator;

//define schema of the user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "minimum length is 6 characters"],
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
});

//fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("new user was created", doc);
  next();
});

//fire a function before doc saved to the db
userSchema.pre("save", async function (next) {
  console.log("user about to be created & saved", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect emial");
};

//create the model of user
const User = mongoose.model("User", userSchema);

export default User;
