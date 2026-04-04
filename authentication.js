const BASE_URL = 'https://api.notocat.com/v1';

const test = async (z, bundle) => {
  // The API has no /me endpoint. GET /contacts without a newsletter_id returns
  // 400 "You do not have access" for valid tokens, but 401 for invalid ones.
  // We use skipThrowForStatus and check manually.
  const response = await z.request({
    url: `${BASE_URL}/contacts`,
    params: { limit: 1 },
    skipThrowForStatus: true,
  });

  if (response.status === 401) {
    throw new z.errors.Error('API key is invalid or expired.', 'AuthenticationError', 401);
  }

  // A 400 means the token is valid but no newsletter_id was given — that's fine
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
