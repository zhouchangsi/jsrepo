import { defineComponent } from "vue";
import styles from "./PureCSS.module.scss";
export default defineComponent({
  setup() {
    return () => {
      return (
        <div class={styles.root}>
          <span class={styles.box + " " + styles.first}></span>
          <span class={styles.box + " " + styles.second}></span>
          <span class={styles.box + " " + styles.third}></span>
        </div>
      );
    };
  },
});
