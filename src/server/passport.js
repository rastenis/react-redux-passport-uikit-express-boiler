import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import db from "./db.js";
import keysConf from "../../config/passportKeys.json";
import User from "./controllers/user.js";
import to from "await-to-js";

passport.serializeUser((user, done) => done(null, user.data._id));

passport.deserializeUser(async (id, done) => {
  let [err, user] = await to(db.User.findById(id).exec());
  if (err) {
    console.error(err);
  }
  user = new User(user);
  return done(err, user);
});

/*
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      let [error, user] = await to(
        db.User.findOne({
          email: email.toLowerCase()
        }).exec()
      );

      if (error) {
        return done(error);
      }

      if (!user) {
        return done(`Email ${email} not found.`);
      }

      user = new User(user);
      let [err, matched] = await to(user.verifyPassword(password));

      if (err) {
        return done(err);
      }

      if (matched) {
        return done(null, user);
      }

      return done("Invalid credentials.");
    }
  )
);

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

export const isAuthorized = (req, res, next) => {
  const provider = req.path.split("/").slice(-1)[0];
  const token = req.user.data.tokens.find(token => token.kind === provider);
  if (token) {
    return next();
  }

  res.redirect(`/auth/${provider}`);
};

export const _promisifiedPassportAuthentication = (req, res) => {
  return new Promise((ressolve, reject) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return reject(err);
      }
      return ressolve(user);
    })(req, res);
  });
};

export const _promisifiedPassportLogin = (req, user) => {
  return new Promise((ressolve, reject) => {
    req.logIn(user, (err, user, info) => {
      if (err) {
        return reject(err);
      }
      return ressolve(user);
    });
  });
};
