import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import config from '../config'

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: config.MAIL_HOST,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
    },
    pool: true,
})

export const sendMail = ({ to, cc = [], bcc = [], templateHTML, replacements, subject, attachments = [] }) => {
    const template = handlebars.compile(templateHTML)
    const htmlToSend = template(replacements)
    const mailOptions = {
        from: config.MAIL_USER,
        to,
        cc,
        bcc,
        subject: subject,
        html: htmlToSend,
        attachments,
    }
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (error) => {
            if (error) reject(error)
            resolve(true)
        })
    })
}