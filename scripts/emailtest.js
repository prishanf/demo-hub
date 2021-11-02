#! /usr/bin/env node
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD || 'vlhackkxjfaqtfum';
const EMIL_FROM = process.env.GMAIL_FROM || 'prishanf@gmail.com';
const EMAIL_TO = process.env.EMAIL_TO || 'prishanf@yahoo.com';
const SUBJECT ='Welcome to your new scratch org';
const send = require('gmail-send')({
    user: EMIL_FROM,
    pass: GMAIL_PASSWORD,
    to:  EMAIL_TO,
    subject: SUBJECT,
  });

const DISPLAY_URL_JSON_OBJ  = JSON.parse(process.env.DISPLAY_URL_JSON); //JSON.parse('{"result": {"url":"/abcd"}}');
const DISPLAY_USER_JSON_OBJ = JSON.parse(process.env.DISPLAY_USER_JSON); //JSON.parse('{"result": {"orgId":"ABC","username":"Prishan","instanceUrl":"www.google.com","loginUrl":"/login"}}'); 

const TEXT = `
Here's your personal scratch org info.
You can open your org at ${DISPLAY_USER_JSON_OBJ.result.instanceUrl}.
Here are some other details of your org.
Org ID: ${DISPLAY_USER_JSON_OBJ.result.orgId}
Username: ${DISPLAY_USER_JSON_OBJ.result.username}
Instance URL: ${DISPLAY_USER_JSON_OBJ.result.instanceUrl}
Login URL: ${DISPLAY_USER_JSON_OBJ.result.loginUrl}
`;

  send({
    text: TEXT,  
  }, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log('email sent Successfully',result);
  });



