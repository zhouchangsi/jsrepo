import { closeDirection } from "@/components/ResizeBox/calcBox";
import { expect } from "vitest";

describe("calc Box", () => {
  it("closeDirection", () => {
    const point = {
      x: 1.8,
      y: 1.2,
    };
    const area = {
      top: 1,
      bottom: 2,
      left: 1,
      right: 2,
    };
    const result = closeDirection(point, area, 0.5);
    expect(result).toBe("NE");
  });
});
