import express from "express";
import cors from "cors";
import helmet from "helmet";

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

app.listen(port, console.log("Server listening on port ", port));
