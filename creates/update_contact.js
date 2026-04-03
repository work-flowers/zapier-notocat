const BASE_URL = 'https://api.notocat.com/v1';

const perform = async (z, bundle) => {
  const body = {
    email: bundle.inputData.email,
    name: bundle.inputData.name,
    first_name: bundle.inputData.first_name,
    last_name: bundle.inputData.last_name,
    subscribed: bundle.inputData.subscribed,
  };

  const response = await z.request({
    method: 'PUT',
    url: `${BASE_URL}/contacts/${bundle.inputData.id}`,
    body,
  });
  return response.data;
};

module.exports = {
  key: 'update_contact',
  noun: 'Contact',
  display: {
    label: 'Update Contact',
    description: 'Updates an existing contact by ID.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Contact ID',
        type: 'string',
        required: true,
        helpText: 'The ID of the contact to update.',
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
        helpText: 'Subscription status.',
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
