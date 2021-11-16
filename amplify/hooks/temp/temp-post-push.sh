slackWebHookURL='https://hooks.slack.com/services/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'


if [ -z "$(which jq)" ]; then
    echo "Please install jq to run the sample script."
    exit 1
fi
parameters=`cat`
amplifyEnv=$(echo $parameters | jq -r '.data | .amplify | .environment')
if echo $parameters | jq --exit-status '.error' >/dev/null; then 
    errorMessage=$(echo $parameters | jq --exit-status '.error | .message')
    curl -s -X POST -H 'Content-type: application/json' --data '{"text":"amplify push failed on '${amplifyEnv}' environment with error '${errorMessage}' :rotating_light:"}' $slackWebHookURL > /dev/null
else
    curl -s -X POST -H 'Content-type: application/json' --data '{"text":"amplify push succeeded on '${amplifyEnv}' environment  :tada:"}' $slackWebHookURL > /dev/null
fi
echo slack message sent