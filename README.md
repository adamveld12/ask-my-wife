# My Wife

"Alexa, ask my wife 'where are you?'"


An Alexa skill that texts your SO a question. I made this because I like to 
bug my wife all the time and this makes it easier to do that.


## How to use

This requires quite a few custom things on your part:

1. A twilio account
2. An AWS account to host the lambda function

You'll need an env.json file at the root of the project that looks like this:

```json
{
  "APP_ID": "Your alexa app id",
  "T_SID": "Twilio SID",
  "T_TOKEN": "Twilio auth token",
  "T_FROM_NO": "The Twilio # you bought that will be the origin",
  "T_DEST_NO": "The destination # for your question"
}
```

## FAQ

1. Why is it "Ask my wife" and not "Ask my partner"?

Because I have a wife, and I didn't think about making this neutral when I originally wrote it. If you would like to submit a pull request with the desired language (or better yet, allow it to be customizable via env vars or something) please be my guest. You will probably have a better idea of how that language should be than I, so go for it!
