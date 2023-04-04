import { defineComponent } from "vue";
import styles from "./ReflectionBox.module.scss";
export default defineComponent({
  setup() {
    return () => {
      return (
        <div class={styles.root}>
          <img
            class={styles.img}
            src="https://w.wallhaven.cc/full/y8/wallhaven-y8lqo7.jpg"
          />
        </div>
      );
    };
  },
});
