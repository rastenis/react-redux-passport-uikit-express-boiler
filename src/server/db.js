import mongoose from "mongoose";
import config from "../../config/config.json";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  tokens: []
});

const User = mongoose.model("User", userSchema, "users");

mongoose.connect(config.mongooseConnectionString, { useNewUrlParser: true });

var db = {
  User: User
};

module.exports = db;
