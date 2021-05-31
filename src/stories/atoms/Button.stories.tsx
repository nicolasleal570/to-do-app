/* eslint-disable import/no-extraneous-dependencies */
import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Button from '../../components/atoms/Button';

export default {
  title: 'Atoms/CircularLoader',
  component: Button,
};

const Template: Story<ComponentProps<any>> = (args) => <Button {...args} />;

export const DefaultStory = Template.bind({});
