export const constructOrderReportEmailPayload = (email, url) => ({
  template: 'call_to_action',
  data: {
    header: 'Order List Report',
    text: `The report you have requested has been generated. Please click on the button below to download it`,
    c2a_link: url,
    c2a_button: 'Download',
  },
  options: {
    to: [email],
    subject: 'Order List Report',
  },
});
