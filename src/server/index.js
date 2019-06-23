import express from "express";
import cors from "cors";
import helmet from "helmet";
import User from "./controllers/user";
import passport from "passport";
import passportConfig, {
  _promisifiedPassportAuthentication,
  _promisifiedPassportLogin
} from "./passport.js";
import path from "path";
import to from "await-to-js";
import bodyParser from "body-parser";
import session from "express-session";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
const MongoStore = mongoStore(session);

import config from "../../config/config.json";

const port = config.port || process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  session({
    secret: process.env.SECRET || config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: null,
      secure: false
    },
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(
        config.mongooseConnectionString
      )
    })
  })
);

app.use(passport.initialize(), passport.session());

if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

app.get("/api/test", (req, res) => {
  return res.send({ success: true });
});

// reject everything below here if the user is signed in already
app.use((req, res, next) => {
  if (req.user) {
    return res.status(500).send("You are already signed in!");
  }
  return next();
});

app.post("/api/auth", async (req, res) => {
  console.log(`LOGIN | requester: ${req.body.email}`);

  let [err, user] = await to(_promisifiedPassportAuthentication(req, res));

  if (err) {
    console.error(err);
    return res.status(500).send("Authentication error!");
  }
  if (!user) {
    // all failed logins default to the same error message
    return res.status(401).send("Wrong credentials!");
  }

  [err] = await to(_promisifiedPassportLogin(req, user));

  if (err) {
    console.error(err);
    return res.status(500).send("Authentication error!");
  }

  return res.send({
    msg: "You have successfully logged in!",
    state: { profile: { ...user.data.profile, id: user.data._id } }
  });
});

app.post("/api/register", async (req, res) => {
  console.log(`REGISTRATION | requester: ${req.body.email}`);

  if (req.user) {
    return res.status(500).send("You are signed in!");
  }

  // mirrored validation checks
  if (!/\S+@\S+\.\S+/.test(req.body.email)) {
    return res.status(500).send("Enter a valid email address.");
  } else if (req.body.password.length < 5 || req.body.password.length > 100) {
    // arbitrary
    return res
      .status(500)
      .send("Password must be between 5 and a 100 characters.");
  }

  let user = new User(req.body);

  let [err] = await to(user.saveUser());

  if (err) {
    if (err.errorType == "uniqueViolated") {
      return res.status(500).send("User with given email already exists!");
    } else {
      console.log(err);
      return res.status(500).send("Server error. Try again later.");
    }
  }

  [err] = await to(req.logIn(user));

  if (err) {
    console.error(err);
    return res.status(500).send("Authentication error!");
  }
  return res.send({
    msg: "You have successfully registered!",
    state: { profile: { ...user.data.profile, id: user.data._id } }
  });
});

app.listen(port, console.log(`Server listening on port ${port}`));
