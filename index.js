const authentication = require('./authentication');

const newContact = require('./triggers/new_contact');
const newUnsubscribe = require('./triggers/new_unsubscribe');

const findContact = require('./searches/find_contact');
const createOrUpdateContacts = require('./creates/create_or_update_contacts');
const deleteContacts = require('./creates/delete_contacts');
const updateContact = require('./creates/update_contact');
const createSend = require('./creates/create_send');
const sendTestEmail = require('./creates/send_test_email');
const sendIssue = require('./creates/send_issue');
const createAndSendIssue = require('./creates/create_and_send_issue');

const addBearerHeader = (request, z, bundle) => {
  if (bundle.authData.api_key) {
    request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;
  }
  return request;
};

const handleErrors = (response, z) => {
  if (response.status === 401) {
    throw new z.errors.Error('API key is invalid or expired.', 'AuthenticationError', response.status);
  }
  return response;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [addBearerHeader],
  afterResponse: [handleErrors],

  triggers: {
    [newContact.key]: newContact,
    [newUnsubscribe.key]: newUnsubscribe,
  },

  searches: {
    [findContact.key]: findContact,
  },

  creates: {
    [createOrUpdateContacts.key]: createOrUpdateContacts,
    [deleteContacts.key]: deleteContacts,
    [updateContact.key]: updateContact,
    [createSend.key]: createSend,
    [sendTestEmail.key]: sendTestEmail,
    [sendIssue.key]: sendIssue,
    [createAndSendIssue.key]: createAndSendIssue,
  },
};
