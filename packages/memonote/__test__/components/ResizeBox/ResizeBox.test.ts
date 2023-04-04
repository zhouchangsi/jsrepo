import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ResizeBox from "@/components/ResizeBox/ResizeBox";

describe("Resize Box", () => {
  it.todo("it can resize when the mouse is near the border", () => {
    const wrapper = mount(ResizeBox);
    wrapper.trigger("mousedown").then(() => {
      wrapper.trigger("mousemove").then(() => {
        wrapper.trigger("mouseup");
      });
    });
  });
  it.todo(
    "it should change the style of the border when the mouse is near the border",
    () => {}
  );
});
