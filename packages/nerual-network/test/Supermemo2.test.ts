import { describe, expect, it } from "vitest";
import { sm2 } from "../src/Supermemo2";

describe("Sumpermemo2.ts", () => {
  it("quality < 3, EF not changed", () => {
    const { ease_factor } = sm2(1.3, 1, 2, 3);
    expect(ease_factor).toBe(1.3);
  });
});
