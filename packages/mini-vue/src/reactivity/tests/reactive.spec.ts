import { describe, it, expect } from "vitest";
import { reactive } from "../reactive";

describe("reactive", () => {
  it("hhhh", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(1);
    expect(observed.foo).toBe(1);
  });
});
