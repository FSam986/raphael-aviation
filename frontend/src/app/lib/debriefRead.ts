"use client";

// Read a result sheet on the device. PDFs with a text layer are read directly
// (pdf.js); photos and scanned PDFs go through Tesseract OCR. All engine files
// are served from this site (/pdfjs, /ocr) — nothing is uploaded anywhere.
// Loaded only on the Debrief page (dynamic import), so other pages stay light.

export type Progress = (msg: string, pct?: number) => void;

async function ocrImages(images: (HTMLCanvasElement | File)[], progress: Progress): Promise<string> {
  const { createWorker } = await import("tesseract.js");
  progress("Loading the text reader (first time only)…", 5);
  const worker = await createWorker("eng", 1, {
    workerPath: "/ocr/worker.min.js",
    corePath: "/ocr",
    langPath: "/ocr",
    gzip: true,
    workerBlobURL: false, // CSP: no blob: workers
    logger: (m: { status: string; progress: number }) => { if (m.status === "recognizing text") progress("Reading the sheet…", 10 + Math.round(m.progress * 85)); },
  });
  try {
    let text = "";
    for (const img of images) text += (await worker.recognize(img)).data.text + "\n";
    return text;
  } finally {
    await worker.terminate();
  }
}

async function readPdf(file: File, progress: Progress): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  progress("Opening the PDF…", 5);
  const pages = Math.min(doc.numPages, 10);
  let text = "";
  const canvases: HTMLCanvasElement[] = [];
  for (let i = 1; i <= pages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    // Group text runs into lines by their y position.
    const rows = new Map<number, { x: number; s: string }[]>();
    for (const it of content.items as { str: string; transform: number[] }[]) {
      if (!it.str.trim()) continue;
      const y = Math.round(it.transform[5] / 3);
      (rows.get(y) ?? rows.set(y, []).get(y)!).push({ x: it.transform[4], s: it.str });
    }
    const pageText = [...rows.entries()].sort((a, b) => b[0] - a[0]).map(([, r]) => r.sort((a, b) => a.x - b.x).map((p) => p.s).join(" ")).join("\n");
    if (pageText.replace(/\s/g, "").length > 60) { text += pageText + "\n"; continue; }
    // Scanned page (photo inside a PDF): render it for OCR.
    const vp = page.getViewport({ scale: 2.2 });
    const c = document.createElement("canvas");
    c.width = vp.width; c.height = vp.height;
    await page.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise;
    canvases.push(c);
  }
  if (canvases.length) text += await ocrImages(canvases, progress);
  return text;
}

/** Extract the text of a result sheet (PDF or image). */
export async function readSheet(file: File, progress: Progress): Promise<string> {
  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
  const text = isPdf ? await readPdf(file, progress) : await ocrImages([file], progress);
  progress("Matching to your syllabus…", 100);
  return text;
}
