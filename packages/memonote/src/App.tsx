import { defineComponent } from "vue";
import styles from "./App.module.scss";
import PdfViewer from "./views/PdfViewer/PdfViewer";

export default defineComponent({
  name: "App",
  setup() {
    document.addEventListener("selectionchange", (e) => {
      const res = document.getSelection().toString();
      console.log(res);
    });
    return () => {
      return (
        <div class={styles.root}>
          <PdfViewer />
        </div>
      );
    };
  },
});
