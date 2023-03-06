import createError from 'http-errors'
import config from '../config';

export const client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

export const sendSMS = ({ to, body }) =>
    client.messages
        .create({
            from: config.SMS_FROM,
            to,
            body,
        })
        .catch((err) => {
            switch (err?.code) {
                case 21614:
                case 21211:
                    throw createError(400, "Invalid 'to' number");
                default:
                    throw err
            }
        });
