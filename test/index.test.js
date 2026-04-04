const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('app', () => {
  it('should load the app definition without errors', () => {
    expect(App.version).toBeDefined();
    expect(App.platformVersion).toBeDefined();
    expect(App.authentication).toBeDefined();
    expect(App.triggers.new_contact).toBeDefined();
    expect(App.triggers.new_unsubscribe).toBeDefined();
    expect(App.searches.find_contact).toBeDefined();
    expect(App.creates.create_or_update_contact).toBeDefined();
    expect(App.creates.delete_contacts).toBeDefined();
    expect(App.creates.update_contact).toBeDefined();
    expect(App.creates.create_send).toBeDefined();
    expect(App.creates.send_test_email).toBeDefined();
    expect(App.creates.send_issue).toBeDefined();
    expect(App.creates.create_and_send_issue).toBeDefined();
  });

  it('should have correct keys for all actions', () => {
    const createKeys = Object.keys(App.creates);
    expect(createKeys).toHaveLength(7);
    expect(createKeys).toContain('create_or_update_contact');
    expect(createKeys).toContain('delete_contacts');
    expect(createKeys).toContain('update_contact');
    expect(createKeys).toContain('create_send');
    expect(createKeys).toContain('send_test_email');
    expect(createKeys).toContain('send_issue');
    expect(createKeys).toContain('create_and_send_issue');
  });

  it('should have correct keys for searches', () => {
    const searchKeys = Object.keys(App.searches);
    expect(searchKeys).toHaveLength(1);
    expect(searchKeys).toContain('find_contact');
  });

  it('should have correct keys for triggers', () => {
    const triggerKeys = Object.keys(App.triggers);
    expect(triggerKeys).toHaveLength(2);
    expect(triggerKeys).toContain('new_contact');
    expect(triggerKeys).toContain('new_unsubscribe');
  });

  it('should include bearer auth middleware', () => {
    expect(App.beforeRequest).toHaveLength(1);
  });
});
