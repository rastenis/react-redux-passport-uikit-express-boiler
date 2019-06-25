import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

import db from "./db.js";
import keysConf from "../../config/passportKeys.json";
import config from "../../config/config.json";
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

// TWITTER
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keysConf.TWITTER_KEY,
      consumerSecret: keysConf.TWITTER_SECRET,
      callbackURL: `${config.url || ""}/auth/twitter/callback`,
      passReqToCallback: true
    },
    async (req, accessToken, tokenSecret, profile, done) => {
      // checking for linked accounts
      let [error, existingUser] = await to(
        db.User.findOne({
          twitter: profile.id
        }).exec()
      );

      if (error) {
        return done(error);
      }

      if (existingUser) {
        if (req.user) {
          return done("This Twitter account is already linked.");
        }
        return done(null, new User(existingUser));
      }

      if (req.user) {
        // linking twitter with existing logged in account
        let user = new User(req.user.data);
        user.data.twitter = profile.id;
        user.data.tokens.push({
          kind: "twitter",
          accessToken,
          tokenSecret
        });
        // profile info
        user.data.profile.name = user.data.profile.name || profile.displayName;
        user.data.profile.location =
          user.data.profile.location || profile._json.location;
        user.data.profile.picture =
          user.data.profile.picture || profile._json.profile_image_url_https;

        // save user
        let [linkError, linkedUser] = await to(user.saveUser());

        if (linkError) {
          return done(linkError);
        }

        let [err] = await to(_promisifiedPassportLogin(req, linkedUser));

        if (err) {
          return done(err);
        }

        // twitter linked successfully
        return done(null, user);
      }

      // create new user
      const user = new User();
      // Twitter will not provide an email address, so we save the Twitter handle, which is unique,
      // and produce a fake 'email':
      user.data.email = `${profile.username}@twitter.com`;
      user._meta.noPassword = true;
      user.data.twitter = profile.id;
      user.data.tokens.push({
        kind: "twitter",
        accessToken,
        tokenSecret
      });
      user.data.profile.name = profile.displayName;
      user.data.profile.location = profile._json.location;
      user.data.profile.picture = profile._json.profile_image_url_https;

      let [creationError, createdUser] = await to(user.saveUser());

      if (creationError) {
        return done(creationError);
      }

      // created a new account via Twitter
      return done(null, createdUser);
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
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return reject(err);
      }
      return resolve(user);
    })(req, res);
  });
};

export const _promisifiedPassportLogin = (req, user) => {
  return new Promise((resolve, reject) => {
    req.logIn(user, (err, user, info) => {
      if (err) {
        return reject(err);
      }
      return resolve(user);
    });
  });
};

export const _promisifiedPassportLogout = req => {
  return new Promise((resolve, reject) => {
    req.logout();
    req.session.destroy(err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};
