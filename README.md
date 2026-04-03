# Zapier Notocat Integration

A private Zapier integration for [Notocat](https://notocat.com), a newsletter platform that sends emails from Notion pages.

## Authentication

Uses API key (Bearer token) authentication. Get your key at [app.notocat.com/user/api](https://app.notocat.com/user/api).

## Actions

### Search

| Action | Description |
|--------|-------------|
| Find Contact | Search for a contact by email address |

### Creates

| Action | Description |
|--------|-------------|
| Create or Update Contact | Create a new contact or update an existing one by email |
| Update Contact | Update an existing contact by ID |
| Delete Contacts | Delete unsubscribed (or all) contacts from a newsletter |
| Create Send | Create a draft send from a Notion page |
| Send Test Email | Send a test email for a specific send |
| Send Issue | Send an existing send to subscribers |
| Create and Send Issue | Create and immediately send an issue in one step |

## Development

```bash
npm install
npm test
npx zapier-platform-cli validate
npx zapier-platform-cli push
```
