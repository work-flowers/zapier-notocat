const BASE_URL = 'https://api.notocat.com/v1';

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'DELETE',
    url: `${BASE_URL}/contacts`,
    params: {
      newsletter_id: bundle.inputData.newsletter_id,
      subscribed: bundle.inputData.subscribed,
    },
  });
  return response.data;
};

module.exports = {
  key: 'delete_contacts',
  noun: 'Contacts',
  display: {
    label: 'Delete Contacts',
    description: 'Deletes unsubscribed contacts from a newsletter. Optionally deletes all contacts.',
  },
  operation: {
    inputFields: [
      {
        key: 'newsletter_id',
        label: 'Newsletter ID',
        type: 'string',
        required: true,
        helpText: 'The newsletter (workspace) ID.',
      },
      {
        key: 'subscribed',
        label: 'Include Subscribed',
        type: 'boolean',
        required: false,
        helpText: 'By default, only unsubscribed contacts are deleted. Set to true to delete all contacts.',
      },
    ],
    perform,
    sample: {
      contacts_removed: 5,
    },
    outputFields: [
      { key: 'contacts_removed', label: 'Contacts Removed', type: 'integer' },
    ],
  },
};
