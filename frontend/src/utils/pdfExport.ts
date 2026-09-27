import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export interface ExportPdfOptions {
  fileName?: string;
  paperSize?: "a4" | "letter" | "legal" | "a3" | string;
  quality?: number;
  onProgress?: (status: string) => void;
}

export async function exportResumePdf(
  element: HTMLElement,
  options: ExportPdfOptions = {}
): Promise<void> {
  const {
    fileName = "Resume",
    paperSize = "a4",
    onProgress
  } = options;

  if (!element) {
    throw new Error("Target resume element not found");
  }

  onProgress?.("Preparing document layout...");

  // 1. Temporarily normalize scaling and background so mobile/dark-mode does not affect export
  const originalTransform = element.style.transform;
  const originalTransition = element.style.transition;
  const originalBoxShadow = element.style.boxShadow;
  const originalMaxWidth = element.style.maxWidth;
  const originalWidth = element.style.width;

  element.style.transform = "none";
  element.style.transition = "none";
  element.style.boxShadow = "none";
  element.style.maxWidth = "820px";
  element.style.width = "820px";

  // Allow layout recalculation
  await new Promise((resolve) => setTimeout(resolve, 60));

  try {
    onProgress?.("Rendering high-resolution vector canvas...");

    // 2. Capture high-res pixel-perfect image using browser SVG foreignObject pipeline
    const imgDataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2.5, // 2.5x retina clarity for crisp small fonts (10px - 11px)
      backgroundColor: "#ffffff",
      cacheBust: true,
      filter: (node) => {
        // Exclude elements with no-print class if any
        if (node instanceof HTMLElement && node.classList.contains("no-print")) {
          return false;
        }
        return true;
      }
    });

    onProgress?.("Embedding clickable links into PDF...");

    // 3. Setup jsPDF with requested paper size
    let format: string | [number, number] = "a4";
    if (paperSize === "letter") format = "letter";
    else if (paperSize === "legal") format = "legal";
    else if (paperSize === "a3") format = "a3";

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const rootRect = element.getBoundingClientRect();
    const elementWidth = element.offsetWidth || rootRect.width || 820;
    const elementHeight = element.offsetHeight || rootRect.height;

    // Calculate aspect ratio in PDF millimeters
    const pdfImgWidth = pageWidth;
    const pdfImgHeight = (elementHeight * pageWidth) / elementWidth;

    // 4. Find all <a> anchor elements inside the resume
    const anchors = Array.from(element.querySelectorAll("a"));

    // If content fits closely on 1 single page (within 8% tolerance), fit it cleanly to 1 page
    const fitsSinglePage = pdfImgHeight <= pageHeight * 1.08;

    if (fitsSinglePage) {
      const targetHeight = Math.min(pdfImgHeight, pageHeight);
      pdf.addImage(imgDataUrl, "PNG", 0, 0, pdfImgWidth, targetHeight, undefined, "FAST");

      const scaleX = pdfImgWidth / elementWidth;
      const scaleY = targetHeight / elementHeight;

      anchors.forEach((a) => {
        const href = a.getAttribute("href");
        if (!href || href === "#" || href.startsWith("javascript:")) return;

        const aRect = a.getBoundingClientRect();
        if (aRect.width === 0 || aRect.height === 0) return;

        const xMm = (aRect.left - rootRect.left) * scaleX;
        const yMm = (aRect.top - rootRect.top) * scaleY;
        const wMm = aRect.width * scaleX;
        const hMm = aRect.height * scaleY;

        pdf.link(xMm, yMm, wMm, hMm, { url: href });
      });
    } else {
      // Multi-page export with accurate link page mapping
      let heightLeft = pdfImgHeight;
      let position = 0;
      let pageIndex = 0;
      const scaleX = pdfImgWidth / elementWidth;
      const scaleY = pdfImgHeight / elementHeight;

      while (heightLeft > 0) {
        if (pageIndex > 0) {
          pdf.addPage(format);
        }

        pdf.addImage(imgDataUrl, "PNG", 0, position, pdfImgWidth, pdfImgHeight, undefined, "FAST");

        const currentPageTopMm = pageIndex * pageHeight;
        const currentPageBottomMm = (pageIndex + 1) * pageHeight;

        anchors.forEach((a) => {
          const href = a.getAttribute("href");
          if (!href || href === "#" || href.startsWith("javascript:")) return;

          const aRect = a.getBoundingClientRect();
          if (aRect.width === 0 || aRect.height === 0) return;

          const aTopMm = (aRect.top - rootRect.top) * scaleY;
          const aBottomMm = (aRect.bottom - rootRect.top) * scaleY;

          // Check if anchor is inside current page boundary
          if (aTopMm >= currentPageTopMm && aTopMm < currentPageBottomMm) {
            const xMm = (aRect.left - rootRect.left) * scaleX;
            const yMm = aTopMm - currentPageTopMm;
            const wMm = aRect.width * scaleX;
            const hMm = Math.min(aBottomMm - aTopMm, pageHeight - yMm);

            pdf.link(xMm, yMm, wMm, hMm, { url: href });
          }
        });

        heightLeft -= pageHeight;
        position -= pageHeight;
        pageIndex++;
      }
    }

    onProgress?.("Downloading PDF...");
    const safeFileName = fileName.replace(/[<>:"/\\|?*]/g, "_").trim() || "Resume";
    pdf.save(safeFileName.endsWith(".pdf") ? safeFileName : `${safeFileName}.pdf`);
    onProgress?.("Completed!");
  } finally {
    // 5. Restore original styles
    element.style.transform = originalTransform;
    element.style.transition = originalTransition;
    element.style.boxShadow = originalBoxShadow;
    element.style.maxWidth = originalMaxWidth;
    element.style.width = originalWidth;
  }
}
