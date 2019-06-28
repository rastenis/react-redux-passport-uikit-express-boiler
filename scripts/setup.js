const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
const configPath = "../config/config.json";
const fs = require("fs-extra");

// base values
let config = require("../config/configExample.json");

console.log(
  chalk.bgBlue.white.bold(
    "react-redux-passport-uikit-express-boiler" + new Array(9).join(" ")
  )
);
console.log(chalk.bgBlue.black(new Array(50).join(" ")));
console.log(
  chalk.bgBlue.white.bold("Starting setup..." + new Array(33).join(" "))
);

config.selfHosted =
  prompt(
    "Independant TLS? (will require ports 80 and 443) (y/N): "
  ).toLowerCase() == "y";

if (config.selfHosted) {
  console.log(chalk.bgBlue.white("Showing additional TLS options:"));
  config.tls.email = prompt("Enter Letsencrypt email (your email): ");
  config.tls.tos =
    prompt("Do you agree with the LetsEncrypt TOS? (Y/n): ").toLowerCase() ==
    "y";

  if (!config.tls.tos) {
    config.selfHosted = false;
    console.log(chalk.bgBlue.white("Reverting TLS setup..."));
  } else {
    let current = 0;
    while (true) {
      config.tls.domains[current] = prompt(
        "Please enter domain " + (current + 1) + " (ENTER to cancel): "
      );
      if (config.tls.domains[current] == "") {
        config.tls.domains.splice(current, 1);
        break;
      } else {
        current++;
      }
    }
  }
} else {
  config.port = prompt("Enter port (7777): ", config.port);
}

console.log(chalk.bgBlue.white.bold("Setup done." + new Array(39).join(" ")));
console.log(chalk.bgBlue.black(new Array(50).join(" ")));
console.log(chalk.bgBlue.white.bold("Exiting..." + new Array(39).join(" ")));

config.secret = Math.random()
  .toString(36)
  .substring(20);

// writing and exitting
fs.writeJsonSync("./config/config.json", config);
process.exit(0);
