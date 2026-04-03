const BASE_URL = 'https://api.notocat.com/v1';

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `${BASE_URL}/sends/${bundle.inputData.send_id}/test`,
    body: {
      To: bundle.inputData.to,
    },
  });
  return response.data;
};

module.exports = {
  key: 'send_test_email',
  noun: 'Test Email',
  display: {
    label: 'Send Test Email',
    description: 'Sends a test email for a specific send.',
  },
  operation: {
    inputFields: [
      {
        key: 'send_id',
        label: 'Send ID',
        type: 'string',
        required: true,
        helpText: 'The ID of the send to test.',
      },
      {
        key: 'to',
        label: 'Recipient Email',
        type: 'string',
        required: true,
        helpText: 'The email address to send the test to.',
      },
    ],
    perform,
    sample: {
      To: 'test@example.com',
      SubmittedAt: '2025-01-01T00:00:00.000Z',
      MessageID: 'msg-123-456',
      ErrorCode: 0,
      Message: 'OK',
    },
    outputFields: [
      { key: 'To', label: 'Recipient', type: 'string' },
      { key: 'SubmittedAt', label: 'Submitted At', type: 'datetime' },
      { key: 'MessageID', label: 'Message ID', type: 'string' },
      { key: 'ErrorCode', label: 'Error Code', type: 'integer' },
      { key: 'Message', label: 'Message', type: 'string' },
    ],
  },
};
