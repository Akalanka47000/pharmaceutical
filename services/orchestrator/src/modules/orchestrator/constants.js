import config from "../../config";

export const serviceHosts = {
    auth: config.AUTH_SERVICE_BASE_URL,
    users: config.USER_SERVICE_BASE_URL,
    emails: config.EMAIL_SERVICE_BASE_URL,
    sms: config.SMS_SERVICE_BASE_URL
}