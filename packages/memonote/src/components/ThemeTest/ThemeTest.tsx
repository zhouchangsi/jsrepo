import { defineComponent, defineEmits, defineProps } from "vue";
import styles from "./ThemeTest.module.scss";
import { useDarkStore, useThemeStore } from "@/stores/theme";

const ThemeRadio = defineComponent({
  props: { name: { type: String, default: "theme" } },
  setup(props) {
    const themeStore = useThemeStore();
    return () => (
      <span>
        <input
          type="radio"
          name="themeRadio"
          value={props.name}
          onInput={() => {
            themeStore.setTheme(props.name);
          }}
        />
        <label>{props.name}</label>
      </span>
    );
  },
});

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.root}>
        <div class={styles.themeCheckBoxContainer}>
          <i>Theme: </i>
          <ThemeRadio name="light" />
          <ThemeRadio name="dark" />
        </div>
        <h3>this is h3</h3>
        <span class={styles.primary}>Primary</span>
      </div>
    );
  },
});
