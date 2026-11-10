import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";
import Header from "./Header";
import { AuthProvider } from "../context/AuthProvider";
import { WatchlistProvider } from "../context/WatchlistProvider";

const renderHeader = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <WatchlistProvider>
          <Header />
        </WatchlistProvider>
      </AuthProvider>
    </MemoryRouter>,
  );

describe("Header burger menu", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("is closed at the start", () => {
    renderHeader();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("opens the mobile menu when burger is clicked", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("dialog", { name: "Mobile menu" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
    expect(screen.getByAltText("Geolab")).toBeInTheDocument();
  });

  it("shows the user name when someone is logged in", () => {
    localStorage.setItem("token", "test-token");
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "nina", firstName: "Nina" }),
    );
    renderHeader();

    expect(screen.getByText("Hi, Nina")).toBeInTheDocument();
  });
});
