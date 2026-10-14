import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

describe("App", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the landing page with locally served images", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    const { container } = render(<App />);

    expect(screen.getByRole("heading", { name: "Ultimate Smart Living" })).toBeTruthy();
    expect(container.querySelector(".hero-building")?.getAttribute("src")).toBe(
      "/assets/building.png",
    );
    expect(container.querySelector(".about-photo img")?.getAttribute("src")).toBe(
      "/assets/tower.jpg",
    );
    expect(container.querySelector(".project-visual img")?.getAttribute("src")).toBe(
      "/assets/project-1.jpg",
    );
  });
});
