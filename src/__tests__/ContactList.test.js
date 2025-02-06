import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactList from "../components/ContactList";

// Sample data for testing
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
];

describe("ContactList Component", () => {
  test("renders with attended and absent sections", () => {
    render(
      <ContactList
        attended={sampleAttended}
        absent={sampleAbsent}
        showEmail={true}
      />
    );

    // Headers should appear
    expect(screen.getByText(/Attended/i)).toBeInTheDocument();
    expect(screen.getByText(/Absent/i)).toBeInTheDocument();

    // Contact names should appear
    expect(screen.getByText("Dianne Russell")).toBeInTheDocument();
    expect(screen.getByText("Ronald Richards")).toBeInTheDocument();
    expect(screen.getByText("Jenny Wilson")).toBeInTheDocument();

    // Emails should appear
    expect(screen.getByText("dianne@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("ronald@hotmail.com")).toBeInTheDocument();
    expect(screen.getByText("jenny@gmail.com")).toBeInTheDocument();
  });

  test("hides emails when showEmail is false", () => {
    render(
      <ContactList
        attended={sampleAttended}
        absent={sampleAbsent}
        showEmail={false}
      />
    );

    // Names should appear
    expect(screen.getByText("Dianne Russell")).toBeInTheDocument();
    expect(screen.getByText("Ronald Richards")).toBeInTheDocument();
    expect(screen.getByText("Jenny Wilson")).toBeInTheDocument();

    // Emails should NOT appear
    expect(screen.queryByText("dianne@gmail.com")).not.toBeInTheDocument();
    expect(screen.queryByText("ronald@hotmail.com")).not.toBeInTheDocument();
    expect(screen.queryByText("jenny@gmail.com")).not.toBeInTheDocument();
  });

  test("collapses and expands sections correctly", () => {
    render(
      <ContactList
        attended={sampleAttended}
        absent={sampleAbsent}
        showEmail={true}
      />
    );

    const attendedHeader = screen.getByText(/Attended/i);
    const absentHeader = screen.getByText(/Absent/i);

    // Collapse attended section
    fireEvent.click(attendedHeader);
    expect(screen.queryByText("Dianne Russell")).not.toBeInTheDocument();
    expect(screen.queryByText("Ronald Richards")).not.toBeInTheDocument();

    // Expand attended section
    fireEvent.click(attendedHeader);
    expect(screen.getByText("Dianne Russell")).toBeInTheDocument();
    expect(screen.getByText("Ronald Richards")).toBeInTheDocument();

    // Collapse absent section
    fireEvent.click(absentHeader);
    expect(screen.queryByText("Jenny Wilson")).not.toBeInTheDocument();

    // Expand absent section
    fireEvent.click(absentHeader);
    expect(screen.getByText("Jenny Wilson")).toBeInTheDocument();
  });

  test("filters contacts correctly based on search input", () => {
    render(
      <ContactList
        attended={sampleAttended}
        absent={sampleAbsent}
        showEmail={true}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search/i);

    // Type "Dianne" in search input
    fireEvent.change(searchInput, { target: { value: "Dianne" } });

    // Only "Dianne Russell" should be visible
    expect(screen.getByText("Dianne Russell")).toBeInTheDocument();
    expect(screen.queryByText("Ronald Richards")).not.toBeInTheDocument();
    expect(screen.queryByText("Jenny Wilson")).not.toBeInTheDocument();
  });

  test("displays empty state message when no results are found", () => {
    render(
      <ContactList
        attended={sampleAttended}
        absent={sampleAbsent}
        showEmail={true}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search/i);

    // Type a non-matching name
    fireEvent.change(searchInput, { target: { value: "NonExistent" } });

    // Expect "No results found" message
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
