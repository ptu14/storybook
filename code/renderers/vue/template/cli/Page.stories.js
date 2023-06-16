import { within, userEvent } from '@storybook/testing-library';
import MyPage from './Page.vue';

export default {
  title: 'Example/Page',
  component: MyPage,
  render: () => ({
    components: { MyPage },
    template: '<my-page />',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
};
export const LoggedOut = {};

// More on interaction testing: https://storybook.js.org/docs/vue/writing-tests/interaction-testing
const user = userEvent.setup();
export const LoggedIn = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvasElement.append(
      // eslint-disable-next-line no-undef
      Object.assign(document.createElement('input'), { type: 'text', placeholder: 'First' })
    );
    canvasElement.append(
      // eslint-disable-next-line no-undef
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
