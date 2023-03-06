import fs from 'fs';
import createError from 'http-errors';
import { traced } from '@sliit-foss/functions';
import { sendMail } from '../../../../services';

export const serviceSendEmail = async ({ template, data, options: { to, cc, bcc, subject, attachments } }) => {
    let html
    try {
        html = fs.readFileSync(`${__dirname}/templates/${template}.html`, 'utf8')
    } catch (error) {
        throw createError(400, 'Template not found', { template })
    }
    const result = await traced(sendMail)({ to, cc, bcc, templateHTML: html, replacements: data, subject, attachments })
    if (result) return
    throw createError(424, 'Failed to send email')
}