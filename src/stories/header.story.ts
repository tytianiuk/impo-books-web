import { Meta, StoryObj } from '@storybook/react';

import Header from '@/components/header/header';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} as Meta;

export default meta;

export type HeaderStory = StoryObj<typeof meta>;

export const DefaultHeader: HeaderStory = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const TabletHeader: HeaderStory = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const MobileHeader: HeaderStory = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
