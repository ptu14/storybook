import { within, userEvent } from '@storybook/testing-library';
import { createPage } from './Page';

export default {
  title: 'Example/Page',
  render: () => createPage(),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/html/configure/story-layout
    layout: 'fullscreen',
  },
};

export const LoggedOut = {};

// More on interaction testing: https://storybook.js.org/docs/html/writing-tests/interaction-testing
const user = userEvent.setup();
export const LoggedIn = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvasElement.append(
      Object.assign(document.createElement('input'), { type: 'text', placeholder: 'First' })
    );
    canvasElement.append(
      Object.assign(document.createElement('input'), { type: 'text', placeholder: 'Second' })
    );
    const loginButton = await canvas.getByRole('button', {
      name: /Log in/i,
    });
    const input = await canvas.getByPlaceholderText('First');
    await user.click(input);
    await user.type(input, 'Pasting: ');
    await user.paste('foobar');
    await user.tab();
    await user.paste('second foobar');
    await user.click(loginButton);
    await user.click(input);
    await user.paste('final');
  },
};
