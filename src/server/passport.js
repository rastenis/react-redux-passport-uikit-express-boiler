import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import db from "./db";
import keysConf from "../../config/key.json";
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
      let [err, user] = await to(
        db.User.findOne({
          email: email.toLowerCase()
        }).exec()
      );

      if (err) {
        return done(err);
      }

      if (!user) {
        return done(
          {
            msg: `Email ${email} not found.`
          },
          false
        );
      }

      user = new User(user);
      let [err, matched] = await to(user.comparePassword(password));

      if (err) {
        return done(err);
      }

      if (isMatch) {
        return done(null, user);
      }

      return done(
        {
          msg: "Invalid credentials."
        },
        false
      );
    }
  )
);

/*
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/*
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split("/").slice(-1)[0];
  const token = req.user.data.tokens.find(token => token.kind === provider);
  if (token) {
    return next();
  }

  res.redirect(`/auth/${provider}`);
};
