import * as pdfjsLib from "pdfjs-dist";
import PDFJSWorker from "pdfjs-dist/build/pdf.worker.entry";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";
import {
  DocumentInitParameters,
  PDFDataRangeTransport,
} from "pdfjs-dist/types/src/display/api";
// eslint-disable-next-line prettier/prettier
export type SRC =
  | string
  | URL
  | Uint8Array
  | PDFDataRangeTransport
  | DocumentInitParameters;

import { testPdf as pdfUrl } from "@/assets";
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const eventBus = new pdfjsViewer.EventBus();

const CMAP_URL = "../assets/cmaps";
const CMAP_PACKED = true;

const DEFAULT_URL = pdfUrl;
const PAGE_TO_VIEW = 1;
const SCALE = 1.0;

const ENABLE_XFA = true;

const loadingTask = pdfjsLib.getDocument({
  url: DEFAULT_URL,
  cMapUrl: CMAP_URL,
  cMapPacked: CMAP_PACKED,
  enableXfa: ENABLE_XFA,
});

export async function view(container: HTMLDivElement) {
  const pdfDocument = await loadingTask.promise;
  // Document loaded, retrieving the page.
  const pdfPage = await pdfDocument.getPage(PAGE_TO_VIEW);
  // Creating the page view with default parameters.
  const pdfPageView = new pdfjsViewer.PDFPageView({
    container,
    id: PAGE_TO_VIEW,
    scale: SCALE,
    defaultViewport: pdfPage.getViewport({ scale: SCALE }),
    eventBus,
    // We can enable text/annotation/xfa/struct-layers, as needed.
    textLayerFactory: !pdfDocument.isPureXfa
      ? new pdfjsViewer.DefaultTextLayerFactory()
      : null,
    annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
    xfaLayerFactory: pdfDocument.isPureXfa
      ? new pdfjsViewer.DefaultXfaLayerFactory()
      : null,
    structTreeLayerFactory: new pdfjsViewer.DefaultStructTreeLayerFactory(),
  });
  // Associate the actual page with the view, and draw it.

  pdfPageView.setPdfPage(pdfPage);
  return pdfPageView.draw();
}
