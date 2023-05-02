import createError from 'http-errors';

export const mockEmailRequestBody = {
  template: 'call_to_action',
  data: {
    header: 'Sample header',
    text: `Sample text`,
    c2a_link: 'link',
    c2a_button: 'Action Button',
  },
  options: {
    to: ['akalankaperera128@gmail.com'],
    subject: 'Subject',
  },
};

export const mockSendEmailError = createError(424, 'Failed to send email - Mock Error');
