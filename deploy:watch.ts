import path from "path";
import execa from "execa";
import chokidar from "chokidar";

const watcher = chokidar.watch(path.join(__dirname, "contracts"), {
  ignored: /^\./,
  persistent: true,
});

const deploy = async () => {
  console.clear();
  console.log("deploying...");
  await execa.command(`yarn truffle migrate`, {
    stdio: "inherit",
    reject: false,
  });
};

watcher.on("ready", () => {
  deploy().then(() => {
    watcher.on("all", deploy);
  });
});
