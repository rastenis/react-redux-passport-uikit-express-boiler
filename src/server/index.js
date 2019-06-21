import express from "express";
import cors from "cors";
import helmet from "helmet";
import to from "await-to-js";
import bodyParser from "body-parser";

import db from "./db";

import config from "../../config/config.json";

const port = config.port || process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

app.post("/auth", async (req, res) => {
  console.log(`LOGIN | requester: ${req.body.email}`, 0);

  let [err, user] = await to(passport.authenticate("local"));

  if (err) {
    console.error(err);

    return res.status(500).send("Authentication error!");
  }
  if (!user) {
    // all failed logins default to the same error message
    console.log("wrrooong");
    return res.status(401).send("Wrong credentials!");
  }

  [err] = await to(req.logIn(user));

  if (err) {
    console.error(err);
    return res.status(500).send("Authentication error!");
  }

  return res.send("You have successfully logged in!");
});

app.listen(port, console.log("Server listening on port ", port));
