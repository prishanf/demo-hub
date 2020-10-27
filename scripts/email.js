#! /usr/bin/env node

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log(process.env.DISPLAY_URL_JSON);
console.log(process.env.DISPLAY_USER_JSON);
const DISPLAY_URL_JSON  = `$process.env.DISPLAY_URL_JSON`;
const DISPLAY_USER_JSON  = `$process.env.ISPLAY_USER_JSON`;
console.log(DISPLAY_URL_JSON);
console.log(DISPLAY_USER_JSON);
console.log(JSON.parse(process.env.DISPLAY_URL_JSON));
console.log(JSON.parse(process.env.DISPLAY_USER_JSON));

const DISPLAY_URL_JSON_OBJ = JSON.parse(process.env.DISPLAY_URL_JSON);
const DISPLAY_USER_JSON_OBJ = JSON.parse(process.env.DISPLAY_USER_JSON);
const EMAIL_TO = 'prishanf@yahoo.com';
console.log(DISPLAY_URL_JSON_OBJ);
console.log(DISPLAY_USER_JSON_OBJ);

const TEXT = `
Here's your personal scratch org info.
You can open your org at ${DISPLAY_USER_JSON_OBJ.result.url}.
Here are some other details of your org.
Org ID: ${DISPLAY_USER_JSON_OBJ.result.orgId}
Username: ${DISPLAY_USER_JSON_OBJ.result.username}
Instance URL: ${DISPLAY_USER_JSON_OBJ.result.instanceUrl}
Login URL: ${DISPLAY_USER_JSON_OBJ.result.loginUrl}
`;
console.log('email scrtip');
console.log(DISPLAY_URL_JSON_OBJ);
console.log(DISPLAY_USER_JSON_OBJ);

const msg = {
    to: EMAIL_TO,
    from: EMAIL_TO,
    subject: 'Welcome to your new scratch org',
    text: TEXT,
};

sgMail
    .send(msg)
    .then(() => console.log('Mail sent successfully'))
    .catch(error => console.error(error.toString()));
