import { describe, it, expect } from "vitest";
import { useDarkStore } from "@/stores/theme";
import { setActivePinia, createPinia } from "pinia";

describe("useDarkStore", () => {
  let darkStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    darkStore = useDarkStore();
  });

  it("toggleDark", () => {
    expect(darkStore.dark).toBe(false);
    darkStore.toggleDark();
    expect(darkStore.dark).toBe(true);
  });
});
