// check for keys.json
const fs = require("fs");
const projectRoot = process.cwd();
const functionPath = projectRoot + "/amplify/backend/function";
fs.readdirSync(projectRoot + "/amplify/backend/function").forEach(
  (funcDirName) => {
    if (fs.existsSync(functionPath + "/" + funcDirName + "/keys.json")) {
      console.log(
        "\nplease remove keys.json from " +
          funcDirName +
          " function and try to push again.\n"
      );
      throw Error("Found keys.json in " + funcDirName);
    }
  }
);

console.log("all pre-push hooks checks passed successfully!");
