import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';
import { serviceSendEmail } from './service';
import { sendEmailSchema } from './schema';

const email = express.Router();

email.post(
  '/',
  celebrate({ [Segments.BODY]: sendEmailSchema }),
  tracedAsyncHandler(async function controllerSendEmail(req, res) {
    const data = await traced(serviceSendEmail)(req.body);
    return toSuccess({ res, data, message: 'Email sent successfully!' });
  }),
);

export default email;
