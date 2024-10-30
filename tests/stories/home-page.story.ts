import { Meta, StoryObj } from '@storybook/react';
import Home from '@/app/page';

const meta = {
  title: 'App/Home',
  component: Home,
  tags: ['autodocs'],
} as Meta;

export default meta;

export type HomeStory = StoryObj<typeof meta>;

export const DefaultHome: HomeStory = {
  args: {},
};
