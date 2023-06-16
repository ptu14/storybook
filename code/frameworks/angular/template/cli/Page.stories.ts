import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { within, userEvent } from '@storybook/testing-library';
import { CommonModule } from '@angular/common';

import Button from './button.component';
import Header from './header.component';
import Page from './page.component';

const meta: Meta<Page> = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [Button, Header],
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<Page>;

export const LoggedOut: Story = {
  render: (args: Page) => ({
    props: args,
  }),
};

// More on interaction testing: https://storybook.js.org/docs/angular/writing-tests/interaction-testing
const user = userEvent.setup();
export const LoggedIn: Story = {
  render: (args: Page) => ({
    props: args,
  }),
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
