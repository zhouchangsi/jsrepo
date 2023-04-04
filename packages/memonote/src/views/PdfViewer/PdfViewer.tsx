import { PDFCore } from "@/utils/PDFCore";
import { defineComponent, h, onMounted, Ref, ref } from "vue";
import styles from "./PdfViewer.module.scss";

// style
import "pdfjs-dist/web/pdf_viewer.css";
import "./override_pdf_viewer.css";

import { testPdf } from "@/assets";
export default defineComponent({
  name: "PdfViewer",
  setup() {
    const pdfViewerRef: Ref<HTMLDivElement> = ref(null);
    const canvasRef: Ref<HTMLCanvasElement> = ref(null);
    onMounted(() => {
      const pdfCore = new PDFCore(testPdf, canvasRef.value);
      pdfCore.renderPage(1);
    });
    return () => {
      return (
        <div class={styles.pdfWrapper} ref={pdfViewerRef}>
          {/* <div id="pdfviewer"></div> */}
          <canvas ref={canvasRef}></canvas>
        </div>
      );
    };
  },
});
