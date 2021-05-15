const path = require("path");
const execa = require("execa");
const chokidar = require("chokidar");
const watcher = chokidar.watch(path.join(__dirname, "contracts"), {
  ignored: /^\./,
  persistent: true,
});

const deploy = async () => {
  console.clear();
  console.log("migrating...");
  await execa.command(`yarn truffle migrate`, {
    stdio: "inherit",
    reject: false,
  });
};

watcher.on("ready", () => {
  deploy().then(() => {
    watcher.on("change", deploy);
  });
});
