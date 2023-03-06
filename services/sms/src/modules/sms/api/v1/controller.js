import express from 'express';
import { celebrate, Segments } from 'celebrate'
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';
import { sendSMS } from '../../../../services';
import { sendSMSSchema } from './schema';

const sms = express.Router();

sms.post('/', celebrate({ [Segments.BODY]: sendSMSSchema }), tracedAsyncHandler(async function controllerSendSMS(req, res) {
    const data = await traced(sendSMS)(req.body);
    return toSuccess({ res, data, message: 'SMS sent successfully!' })
}));

export default sms;