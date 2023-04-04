import { defineComponent } from "vue";
import styles from "./FlexDice.module.scss";
export default defineComponent({
  name: "FlexDice",
  setup() {
    return () => (
      <div class={styles.root}>
        <div class={styles.dice1}>
          <span></span>
        </div>
        <div class={styles.dice2}>
          <span></span>
          <span></span>
        </div>
        <div class={styles.dice3}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class={styles.dice4}>
          <div>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class={styles.dice5}>
          <div>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class={styles.dice6}>
          <div>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class={styles.dice7}>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class={styles.dice8}>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class={styles.dice9}>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  },
});
