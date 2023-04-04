import * as pdfjsLib from "pdfjs-dist";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";
import sandboxBundleSrc from "pdfjs-dist/build/pdf.sandbox";
import workerSrc from "pdfjs-dist/build/pdf.worker.entry";



pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

// Some PDFs need external cmaps.
//
import { testPdf } from "@/assets";
const CMAP_URL = "../assets/cmaps";
const CMAP_PACKED = true;

const DEFAULT_URL = testPdf;
// To test the AcroForm and/or scripting functionality, try e.g. this file:
// "../../test/pdfs/160F-2019.pdf"

const ENABLE_XFA = true;
const SEARCH_FOR = ""; // try "Mozilla";

const SANDBOX_BUNDLE_SRC = sandboxBundleSrc;

const eventBus = new pdfjsViewer.EventBus();

// (Optionally) enable hyperlinks within PDF files.
const pdfLinkService = new pdfjsViewer.PDFLinkService({
  eventBus,
  externalLinkTarget: 2,
});

// (Optionally) enable find controller.
const pdfFindController = new pdfjsViewer.PDFFindController({
  eventBus,
  linkService: pdfLinkService,
});

// (Optionally) enable scripting support.
const pdfScriptingManager = new pdfjsViewer.PDFScriptingManager({
  eventBus,
  sandboxBundleSrc: SANDBOX_BUNDLE_SRC,
});

let container: HTMLDialogElement;

export async function view(container: HTMLDivElement) {
  const pdfViewer = new pdfjsViewer.PDFViewer({
    container,
    eventBus,
    textLayerMode: 2,
    removePageBorders: true,
    linkService: pdfLinkService,
    l10n: null,
    findController: pdfFindController,
    scriptingManager: pdfScriptingManager,
  });

  eventBus.on("textlayerrendered", () => {});
  eventBus.on("pagesinit", function () {
    // We can use pdfViewer now, e.g. let's change default scale.
    pdfViewer.currentScaleValue = "page-width";

    // We can try searching for things.
    if (SEARCH_FOR) {
      eventBus.dispatch("find", { type: "", query: SEARCH_FOR });
    }
  });

  const loadingTask = pdfjsLib.getDocument({
    url: DEFAULT_URL,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    enableXfa: ENABLE_XFA,
  });
  const pdfDocument = await loadingTask.promise;
  // Document loaded, specifying document for the viewer and
  // the (optional) linkService.
  pdfScriptingManager.setViewer(pdfViewer);
  pdfLinkService.setDocument(pdfDocument);
  pdfLinkService.setViewer(pdfViewer);
  pdfViewer.setDocument(pdfDocument);
  
  // for debug
  (window as any).PdfViewer = pdfViewer;
}
