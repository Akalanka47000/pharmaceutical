import fs from 'fs';
import createError from 'http-errors';
import { traced } from '@sliit-foss/functions';
import { sendMail } from '../../../../services';

export const serviceSendEmail = async (template) => {
    const { template, data, options: { to, cc, bcc, subject, attachments } } = payload;
    let html
    try {
        fs.readFileSync(`${_dirname}/templates/${template}.html`, 'utf8')
    } catch (error) {
        throw createError(400, 'Template not found')
    }
    return traced(sendMail)({ to, cc, bcc, templateHTML: html, replacements: data, subject, attachments })
}