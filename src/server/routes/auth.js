import { Router } from "express";
import User from "../controllers/user";
import {
  _promisifiedPassportAuthentication,
  _promisifiedPassportLogin,
  _promisifiedPassportLogout
} from "../passport.js";
import to from "await-to-js";

let router = Router();

// reject if the user is not signed in
const check = (req, res, next) => {
  if (!req.user) {
    return res.status(403).send("Please log in.");
  }
  return next();
};

// route to unlink auth accounts
router.post("/api/unlink", check, async (req, res) => {
  let user = new User(req.user.data);
  console.log(req.user.data);

  user.data.tokens = user.data.tokens.filter(t => {
    return t.kind != req.body.toUnlink;
  });

  delete user.data[req.body.toUnlink];

  console.log("modified", req.user.data);

  let [err, savedUser] = await to(user.saveUser());

  if (err) {
    return res.status(500).send("Internal server error.");
  }

  console.log("saved", savedUser.data, {
    ...req.user.data,
    password: req.user.data.password ? true : false
  });

  req.user = savedUser;

  return res.send({
    userData: req.user.data
  });
});

// user logout route
router.post("/api/logout", async (req, res) => {
  let [err] = await to(_promisifiedPassportLogout(req));

  if (err) {
    console.error("Error : Failed to destroy the session during logout.", err);
  }
  return res.sendStatus(200);
});

export default router;
