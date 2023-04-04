import { describe, it, expect } from "vitest";
import { reactive } from "../reactive";
import { effect } from "../effect";
describe("effect", () => {
  it("basic effect", () => {
    const user = reactive({
      age: 10,
    });

    let nextAge = effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);
    use.age++;
    expect(nextAge).toBe(12);
  });
});
