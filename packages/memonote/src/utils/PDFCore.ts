import * as pdfjsLib from "pdfjs-dist";
import WorkerSrc from "pdfjs-dist/build/pdf.worker.entry";
import {
  PDFDocumentProxy,
  PDFPageProxy,
} from "pdfjs-dist/types/src/display/api";
import { SRC } from "./usePage";

/**
 * side effect
 */

export class PDFCore {
  src: SRC;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;

  pdfDocumentProxy: PDFDocumentProxy;

  pageRendering: boolean = false;
  currentPage: number = 0;
  pageNumPeding: number | null = null;

  constructor(src: SRC, canvas: HTMLCanvasElement) {
    this.src = src;
    this.canvas = canvas;
    this.canvasContext = canvas.getContext("2d");
  }
  async getPDF(): Promise<PDFDocumentProxy> {
    pdfjsLib.GlobalWorkerOptions.workerSrc = WorkerSrc;
    const loadingTask = pdfjsLib.getDocument(this.src);
    this.pdfDocumentProxy = await loadingTask.promise;
    return this.pdfDocumentProxy;
  }
  async getPage(num: number): Promise<PDFPageProxy> {
    return await (await this.getPDF()).getPage(num);
  }
  async renderPage(pageNum: number, canvas?: HTMLCanvasElement): Promise<void> {
    this.pageRendering = true;

    const page = await this.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    // const canvas = document.createElement("canvas");
    const _canvas = canvas || this.canvas;
    _canvas.width = viewport.width;
    _canvas.height = viewport.height;

    page.render({
      canvasContext: _canvas.getContext("2d"),
      viewport: viewport,
    });

    this.pageRendering = false;

    if (this.pageNumPeding !== null) {
      await this.renderPage(this.pageNumPeding);
      this.pageNumPeding = null;
    }

    this.appendNextPage();
  }
  async appendNextPage() {
    const newCanvas = document.createElement("canvas");
    this.canvas.parentNode.append(newCanvas);

    if (this.currentPage >= this.pdfDocumentProxy.numPages) {
      return;
    }
    this.currentPage++;
    await this.renderPage(this.currentPage, newCanvas);
  }
  async queueRenderPage(num: number): Promise<void> {
    if (this.pageNumPeding) {
      this.pageNumPeding = num;
    } else {
      this.renderPage(num);
    }
  }
  async renderNextPage(): Promise<void> {
    if (this.currentPage >= this.pdfDocumentProxy.numPages) {
      return;
    }
    this.currentPage++;
    await this.renderPage(this.currentPage);
  }
  async renderPrevPage(): Promise<void> {
    if (this.currentPage <= 1) {
      return;
    }
    this.currentPage--;
    await this.renderPage(this.currentPage);
  }
}
