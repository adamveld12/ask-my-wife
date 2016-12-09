const Alexa = require('alexa-sdk');
const twilio = require('twilio');

const APP_ID = process.env.APP_ID;
const twilio_account_sid = process.env.T_SID;
const twilio_auth_token = process.env.T_TOKEN;
const twilio_no = process.env.T_NO;
const dest_no = process.env.T_DEST_NO;

const client = twilio(twilio_account_sid, twilio_auth_token);

const QUESTION_LIST = [
  'where are you',
  'what\'s for dinner',
  'when are you coming home',
  'call me'
];

const prompts = {
  PROMPT: 'you asked your wife',
  SUCCESS: 'your wife should receive your message shortly',
  SKILL_NAME: 'Ask My Wife',
  HELP_MESSAGE: 'You can say, ask my wife where are you, or any other simple question. You can also say exit... What can I help you with?',
  HELP_REPROMPT: 'What can I help you with?',
  FAIL: 'I could not send a message, try again later.',
  STOP_MESSAGE: 'Goodbye!',
  TEXT_BODY: (q) => 'Your husband wants to know/ask you:'${q}'. Text him back at his number'
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('AskMyWifeIntent');
    },
    'AskMyWifeIntent': function () {
      const questionSlot = this.event.request.intent.slots.Question;
      const question = questionSlot.value;

      console.log("asking: ", question, 'and sending to', twilio_no);
      client.sendMessage({
          to: dest_no,
          from: twilio_no,
          body: prompts.TEXT_BODY(question)
      }, (err, responseData) => {
          if (!err) {
            this.emit(':tellWithCard', 
                      `${prompts.SUCCESS} - you asked her: ${question}`, 
                      prompts.SKILL_NAME,
                      `${prompts.PROMPT} ${question}`);
          } else {
            console.log("error sending text:", err);
            this.emit(':tell', prompts.FAIL);
          }

      });
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', prompts.HELP_MESSAGE, prompts.HELP_REPROMPT);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', prompts.STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', prompts.STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', prompts.STOP_MESSAGE);
    },
};

exports.handle = (event, context, callback) => {
    console.log("starting ask my wife");

    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
