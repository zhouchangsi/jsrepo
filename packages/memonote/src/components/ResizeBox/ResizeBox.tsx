import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import styles from "./ResizeBox.module.scss";
import { closeDirection, DirectionMap, Point } from "./calcBox";

/**
 * - can resize when mouse down near to the border
 * - can active style when mouse hover near to the border
 */
export default defineComponent({
  setup() {
    const box = ref<HTMLDivElement | null>(null);
    const boxActiveBorderClassName = ref<string>("");
    const boxRect = () => box.value.getBoundingClientRect();

    const mouseEventToPoint = (e: MouseEvent): Point => ({
      x: e.clientX,
      y: e.clientY,
    });

    function setActiveBoundStyle(e: MouseEvent): void {
      const direction = closeDirection(mouseEventToPoint(e), boxRect(), 6);
      if (direction) {
        boxActiveBorderClassName.value = styles[direction];
      } else {
        boxActiveBorderClassName.value = "";
      }
    }
    onMounted(() => {
      window.addEventListener("mousemove", setActiveBoundStyle);
    });
    onUnmounted(() => {
      window.removeEventListener("mousemove", setActiveBoundStyle);
    });

    function onMouseDown(e: MouseEvent) {
      const oldClientX = e.clientX;
      const oldClientY = e.clientY;
      const oldWidth = boxRect().width;
      const oldHeight = boxRect().height;

      const direction = closeDirection(mouseEventToPoint(e), boxRect(), 6);
      if (direction) {
        bindEvents();
      }

      function bindEvents() {
        if (window) {
          window.addEventListener("mouseup", onMouseUp);
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseleave", onMouseUp);
        }
      }
      function onMouseMove(e: MouseEvent) {
        let newWidth = oldWidth;
        let newHeight = oldHeight;
        const offsetX = e.clientX - oldClientX;
        const offsetY = e.clientY - oldClientY;

        const setNewRect: DirectionMap = {
          N: () => (newHeight -= offsetY),
          S: () => (newHeight += offsetY),
          E: () => (newWidth += offsetX),
          W: () => (newWidth -= offsetX),
          NW: () => {
            setNewRect.N();
            setNewRect.W();
          },
          NE: () => {
            setNewRect.N();
            setNewRect.E();
          },
          SE: () => {
            setNewRect.S();
            setNewRect.E();
          },
          SW: () => {
            setNewRect.S();
            setNewRect.W();
          },
        };

        setNewRect[direction as keyof DirectionMap]();
        box.value.style.width = newWidth + "px";
        box.value.style.height = newHeight + "px";
      }
      function onMouseUp() {
        unbindEvents();
      }
      function unbindEvents() {
        if (window) {
          window.removeEventListener("mouseup", onMouseUp);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseleave", onMouseUp);
        }
      }
    }

    return () => {
      return (
        <div
          class={`${styles.root} ${boxActiveBorderClassName.value}`}
          ref={box}
          onMousedown={onMouseDown}
        ></div>
      );
    };
  },
});
