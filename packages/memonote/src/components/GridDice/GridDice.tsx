import { defineComponent } from "vue";
import styles from "./GridDice.module.scss";
import classNames from "classnames";

const left_top = classNames(styles.dot, styles.left, styles.top);
const middle = classNames(styles.dot, styles.middle);
const right_bottom = classNames(styles.dot, styles.right, styles.bottom);
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.root}>
        <span class={left_top}></span>
        <span class={middle}></span>
        <span class={right_bottom}></span>
      </div>
    );
  },
});
