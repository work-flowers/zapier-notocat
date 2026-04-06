const { clean } = require('../utils');

const BASE_URL = 'https://api.notocat.com/v1';

const perform = async (z, bundle) => {
  const contacts = [clean({
    email: bundle.inputData.email,
    name: bundle.inputData.name,
    first_name: bundle.inputData.first_name,
    last_name: bundle.inputData.last_name,
    subscribed: bundle.inputData.subscribed,
  })];

  const response = await z.request({
    method: 'POST',
    url: `${BASE_URL}/contacts`,
    body: clean({
      newsletter_id: bundle.inputData.newsletter_id,
      contacts,
    }),
  });
  return response.data;
};

module.exports = {
  key: 'create_or_update_contact',
  noun: 'Contact',
  display: {
    label: 'Create or Update Contact',
    description: 'Creates a new contact or updates an existing one by email.',
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
        key: 'email',
        label: 'Email',
        type: 'string',
        required: true,
        helpText: 'The email address of the contact.',
      },
      {
        key: 'name',
        label: 'Full Name',
        type: 'string',
        required: false,
      },
      {
        key: 'first_name',
        label: 'First Name',
        type: 'string',
        required: false,
      },
      {
        key: 'last_name',
        label: 'Last Name',
        type: 'string',
        required: false,
      },
      {
        key: 'subscribed',
        label: 'Subscribed',
        type: 'boolean',
        required: false,
        helpText: 'Subscription status. Defaults to true.',
      },
    ],
    perform,
    sample: {
      synced: 1,
    },
    outputFields: [
      { key: 'synced', label: 'Contacts Synced', type: 'integer' },
    ],
  },
};
