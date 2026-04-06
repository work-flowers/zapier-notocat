const { clean } = require('../utils');

const BASE_URL = 'https://api.notocat.com/v1';

const perform = async (z, bundle) => {
  const response = await z.request({
    url: `${BASE_URL}/contacts`,
    params: clean({
      newsletter_id: bundle.inputData.newsletter_id,
      limit: 100,
    }),
  });

  const contacts = response.data.data || [];
  return contacts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

module.exports = {
  key: 'new_contact',
  noun: 'Contact',
  display: {
    label: 'New Contact',
    description: 'Triggers when a new contact is added to a newsletter.',
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
    ],
    perform,
    sample: {
      id: 'cnt_abc123',
      workspace_id: 'wks_abc123',
      name: 'Jane Doe',
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@example.com',
      subscribed: true,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
    outputFields: [
      { key: 'id', label: 'Contact ID', type: 'string' },
      { key: 'workspace_id', label: 'Workspace ID', type: 'string' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'first_name', label: 'First Name', type: 'string' },
      { key: 'last_name', label: 'Last Name', type: 'string' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'subscribed', label: 'Subscribed', type: 'boolean' },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' },
    ],
  },
};
