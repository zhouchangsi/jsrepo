import { describe, expect, it } from "vitest";
import { xs } from "../src/tensorflow";

describe("tensorflow.ts", () => {
  it("Test data", async () => {
    console.log(await xs.array());

    expect("i").toBe("i");
  });
});
