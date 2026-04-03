const BASE_URL = 'https://api.notocat.com/v1';

const perform = async (z, bundle) => {
  const body = {};
  if (bundle.inputData.senderId) {
    body.senderId = bundle.inputData.senderId;
  }

  const response = await z.request({
    method: 'POST',
    url: `${BASE_URL}/sends/${bundle.inputData.send_id}/send`,
    body,
  });
  return response.data;
};

module.exports = {
  key: 'send_issue',
  noun: 'Issue',
  display: {
    label: 'Send Issue',
    description: 'Sends an existing send (issue) to subscribers.',
  },
  operation: {
    inputFields: [
      {
        key: 'send_id',
        label: 'Send ID',
        type: 'string',
        required: true,
        helpText: 'The ID of the send to deliver.',
      },
      {
        key: 'senderId',
        label: 'Sender ID',
        type: 'string',
        required: false,
        helpText: 'The sender ID to use. Defaults to the first sender of your default domain.',
      },
    ],
    perform,
    sample: {
      subscribers: 150,
      status: 'sending',
    },
    outputFields: [
      { key: 'subscribers', label: 'Subscribers Sent To', type: 'integer' },
      { key: 'status', label: 'Status', type: 'string' },
    ],
  },
};
