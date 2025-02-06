import React from "react";
import ContactList from "../components/ContactList";
import { userEvent, within } from "@storybook/testing-library";

export default {
  title: "Components/ContactList",
  component: ContactList,
  parameters: {
    docs: {
      description: {
        component:
          "A searchable contact list with attended and absent categories.",
      },
    },
  },
  argTypes: {
    showEmail: {
      control: "boolean",
      description: "Toggle email visibility",
      defaultValue: true,
    },
  },
};

const sampleAttended = [
  {
    id: 1,
    name: "Dianne Russell",
    email: "dianne@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Ronald Richards",
    email: "ronald@hotmail.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const sampleAbsent = [
  {
    id: 3,
    name: "Jenny Wilson",
    email: "jenny@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 4,
    name: "Richards Wilson",
    email: "jenny@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

export const Default = () => (
  <ContactList attended={sampleAttended} absent={sampleAbsent} />
);
Default.storyName = "Standard List";

export const withEmails = () => (
  <ContactList
    attended={sampleAttended}
    absent={sampleAbsent}
    showEmail={true}
  />
);
withEmails.storyName = "List with Email";

export const EmptyList = () => <ContactList attended={[]} absent={[]} />;
EmptyList.storyName = "Empty Contact List";
EmptyList.parameters = {
  docs: {
    description: {
      story:
        "This variant shows how the component behaves when there are no contacts.",
    },
  },
};

// Simulating a user typing in the search bar
export const WithSearch = Default.bind({});
WithSearch.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const searchInput = canvas.getByPlaceholderText("Search");
  await userEvent.clear(searchInput);
  await userEvent.type(searchInput, "Richards", { delay: 200 });
  await userEvent.keyboard("{Enter}");
};
WithSearch.storyName = "Search Functionality";
