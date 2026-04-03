const BASE_URL = 'https://api.notocat.com/v1';

const test = async (z, bundle) => {
  const response = await z.request({
    url: `${BASE_URL}/contacts`,
    params: { limit: 1 },
  });
  return response.data;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      type: 'string',
      required: true,
      helpText: 'Find your API key at [app.notocat.com/user/api](https://app.notocat.com/user/api).',
    },
  ],
  test,
  connectionLabel: 'Notocat',
};
