const path = require("path");
const dotenv = require("dotenv");
const projectRoot = process.cwd();
const envPath = projectRoot + "/amplify/hooks/.env";
dotenv.config({ path: envPath });
const slackWebHookUrl = process.env.slack_webhook;

if (slackWebHookUrl)
  try {
    const fs = require("fs");
    const stdinBuffer = fs.readFileSync(0);
    const parameters = JSON.parse(stdinBuffer.toString());
    const amplifyEnv = parameters.data.amplify.environment.envName;
    const exec = require("child_process").execSync;
    exec("npm i", { cwd: path.join(process.cwd(), "amplify", "hooks") });

    const axios = require("axios");
    axios
      .post(
        slackWebHookUrl,
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
else console.log("could not find the Slack WebHook Url");
