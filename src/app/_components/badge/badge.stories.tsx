import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "./Badge";


const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Badge>;


export const Tests: Story = {
  render: (args) => <Badge {...args}>Click here</Badge>,
};

export const BrandColors: Story = {
  render: () => (
    <>
      <Badge>Default</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </>
  ),
};

export const StateColors: Story = {
  render: () => (
    <>
      <Badge variant="success">Success</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </>
  ),
};

export const BadgeSizes: Story = {
  render: () => (
    <>
      <Badge variant="neutral" size="tiny">
        Tiny
      </Badge>
      <Badge variant="neutral" size="small">
        Small
      </Badge>
      <Badge variant="neutral" size="normal">
        Normal
      </Badge>
      <Badge variant="neutral" size="large">
        Large
      </Badge>
    </>
  ),
};
