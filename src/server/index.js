import express from "express";
import cors from "cors";
import helmet from "helmet";
import bcrypt from "bcrypt";
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

  let [err] = await req.logIn(user);

  if (err) {
    console.error(err);
  }

  return res.json({
    meta: {
      error: false
    },
    user: user
  });
});

app.listen(port, console.log("Server listening on port ", port));
