import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import passportConfig, {
  _promisifiedPassportAuthentication,
  _promisifiedPassportLogin,
  _promisifiedPassportLogout
} from "./passport.js";
import path from "path";
import to from "await-to-js";
import bodyParser from "body-parser";
import session from "express-session";
import mongoose from "mongoose";
import faker from "faker";
import mongoStore from "connect-mongo";
const MongoStore = mongoStore(session);

import config from "../../config/config.json";

import unAuth from "./routes/unAuth";

const port = config.port || process.env.PORT || 3001;
const app = express();

// proxy providing tls (override)
if (config.url.includes("https") && !config.selfHosted) {
  app.set("trust proxy", 1);
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  session({
    name: "boilerSessionId",
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure:
        config.selfHosted == "1" || config.url.includes("https") ? true : false,
      // 4 hours cookie expiration when secure, infinite when unsecure.
      maxAge:
        config.selfHosted == "1" || config.url.includes("https")
          ? Date.now() + 60 * 60 * 1000 * 4
          : null,
      domain: config.url.replace(/http:\/\/|https:\/\//g, "")
    },
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(
        config.mongooseConnectionString
      )
    })
  })
);

app.use(passport.initialize(), passport.session());

// routes
app.use("/", unAuth);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: "profile email"
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);
app.get("/auth/twitter", passport.authenticate("twitter"));
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

app.get("/api/data", (req, res) => {
  // processing messages
  let m = Object.assign({}, req.session.message);
  delete req.session.message;

  if (!req.user) {
    return res.send({ auth: false, message: m });
  }

  // returning async data
  return res.send({
    auth: true,
    state: {
      profile: req.user.profile,
      // mock 'static' data
      people: Array.apply(null, Array(4)).map(() => {
        return {
          name: faker.name.findName(),
          email: faker.internet.email(),
          contact: faker.helpers.createCard()
        };
      })
    },
    message: req.session.message
  });
});

// user logout route
app.post("/api/logout", async (req, res) => {
  if (!req.user) {
    return;
  }

  let [err] = await to(_promisifiedPassportLogout(req));

  if (err) {
    console.error("Error : Failed to destroy the session during logout.", err);
  }
  return res.sendStatus(200);
});

if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

app.listen(port, console.log(`Server listening on port ${port}`));
