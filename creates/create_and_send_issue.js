const BASE_URL = 'https://api.notocat.com/v1';

const perform = async (z, bundle) => {
  const body = {
    workspace_id: bundle.inputData.workspace_id,
    page_id: bundle.inputData.page_id,
    subject: bundle.inputData.subject,
    preheader: bundle.inputData.preheader,
    segment_id: bundle.inputData.segment_id,
    font: bundle.inputData.font,
    css: bundle.inputData.css,
    linkColor: bundle.inputData.linkColor,
    dividerColor: bundle.inputData.dividerColor,
    dividerSize: bundle.inputData.dividerSize,
    showCover: bundle.inputData.showCover,
    trackOpens: bundle.inputData.trackOpens,
    trackLinks: bundle.inputData.trackLinks,
    senderId: bundle.inputData.senderId,
  };

  const response = await z.request({
    method: 'POST',
    url: `${BASE_URL}/sends/send-direct`,
    body,
  });
  return response.data;
};

module.exports = {
  key: 'create_and_send_issue',
  noun: 'Issue',
  display: {
    label: 'Create and Send Issue',
    description: 'Creates an issue from a Notion page and immediately sends it to subscribers.',
  },
  operation: {
    inputFields: [
      {
        key: 'workspace_id',
        label: 'Workspace ID',
        type: 'string',
        required: true,
        helpText: 'The newsletter (workspace) ID.',
      },
      {
        key: 'page_id',
        label: 'Notion Page ID',
        type: 'string',
        required: true,
        helpText: 'The ID of the Notion page to transform into an issue.',
      },
      {
        key: 'subject',
        label: 'Subject',
        type: 'string',
        required: false,
        helpText: 'The email subject line. If not provided, it will be extracted from the Notion page.',
      },
      {
        key: 'preheader',
        label: 'Preheader',
        type: 'string',
        required: false,
        helpText: 'The preheader text shown in email previews.',
      },
      {
        key: 'segment_id',
        label: 'Segment ID',
        type: 'string',
        required: false,
        helpText: 'Send to a specific segment. If not provided, sends to all contacts.',
      },
      {
        key: 'senderId',
        label: 'Sender ID',
        type: 'string',
        required: false,
        helpText: 'The sender ID to use. Find sender IDs in your email settings on Notocat.',
      },
      {
        key: 'font',
        label: 'Font',
        type: 'string',
        required: false,
      },
      {
        key: 'css',
        label: 'Custom CSS',
        type: 'text',
        required: false,
      },
      {
        key: 'linkColor',
        label: 'Link Color',
        type: 'string',
        required: false,
        helpText: 'Hex color for links, e.g. #0000ED.',
      },
      {
        key: 'dividerColor',
        label: 'Divider Color',
        type: 'string',
        required: false,
        helpText: 'Hex color for dividers, e.g. #434343.',
      },
      {
        key: 'dividerSize',
        label: 'Divider Size',
        type: 'integer',
        required: false,
        helpText: 'Size of dividers in pixels. Defaults to 1.',
      },
      {
        key: 'showCover',
        label: 'Show Cover Image',
        type: 'boolean',
        required: false,
        helpText: 'Whether to show the cover image. Defaults to true.',
      },
      {
        key: 'trackOpens',
        label: 'Track Opens',
        type: 'boolean',
        required: false,
        helpText: 'Whether to track email opens. Defaults to true.',
      },
      {
        key: 'trackLinks',
        label: 'Track Links',
        type: 'boolean',
        required: false,
        helpText: 'Whether to track link clicks. Defaults to true.',
      },
    ],
    perform,
    sample: {
      subscribers: 150,
      status: 'sending',
    },
    outputFields: [
      { key: 'subscribers', label: 'Subscribers Sent To', type: 'integer' },
      { key: 'status', label: 'Status', type: 'string' },
    ],
  },
};
