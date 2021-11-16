const path = require("path");

try {
  const fs = require("fs");
  const stdinBuffer = fs.readFileSync(0);
  const parameters = JSON.parse(stdinBuffer.toString());
  console.log(parameters);
  const amplifyEnv = parameters.data.amplify.environment.envName;
  const exec = require("child_process").execSync;
  exec("npm i", { cwd: path.join(process.cwd(), "amplify", "hooks") });

  const axios = require("axios");
  axios
    .post(
      "https://hooks.slack.com/services/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",
      { text: `amplify push succeeded on ${amplifyEnv} environment  :tada:` },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log("slack message sent");
    })
    .catch((err) => {
      console.log("could not send slack message");
    });
} catch (e) {
  console.log("Error in post-push sample script");
}
