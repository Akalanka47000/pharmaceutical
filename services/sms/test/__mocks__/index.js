import createError from 'http-errors';

export const mockSMSRequestBody = {
  to: '940763423765',
  body: 'Sample sms body',
};

export const mockSendSMSError = createError(424, 'Failed to send sms - Mock Error', {
  code: 21211,
});
