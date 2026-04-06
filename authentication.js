const BASE_URL = 'https://api.notocat.com/v1';

const test = async (z, bundle) => {
  // The API has no /me endpoint. POST /sends with an empty body returns 400
  // (missing fields) for valid tokens but 401 for invalid ones. This is the
  // fastest endpoint to validate auth (~8s vs ~22s for GET /contacts).
  const response = await z.request({
    method: 'POST',
    url: `${BASE_URL}/sends`,
    body: {},
    skipThrowForStatus: true,
  });

  if (response.status === 401) {
    throw new z.errors.Error('API key is invalid or expired.', 'AuthenticationError', 401);
  }

  return { authenticated: true };
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
