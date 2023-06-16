import type { Meta, StoryObj } from '@storybook/svelte';
import { within, userEvent } from '@storybook/testing-library';

import Page from './Page.svelte';

const meta: Meta<Page> = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Page>;

export const LoggedOut: Story = {};

// More on interaction testing: https://storybook.js.org/docs/svelte/writing-tests/interaction-testing
const user = userEvent.setup();
export const LoggedIn: Story = {
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
