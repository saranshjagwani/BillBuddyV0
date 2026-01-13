import type { StockStatus } from "../types/stock.types";
/**
 * BILLBUDDY PDF SHARING - Fast as Flash ⚡
 * Built for speed, simplicity, and reliability
 * 
 * Requirements: HTTPS website (works automatically on Vercel/Netlify)
 */

/**
 * Generates filename: STOCK_LIST_06Jan2025_11:53.pdf
 */
function generateFileName(status:StockStatus): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' });
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  if(status==="inStock"){
  return `IN_STOCK_LIST_${day}${month}${year}_${hours}:${minutes}.pdf`;
  }
  else {
  return `OUT_OF_STOCK_LIST_${day}${month}${year}_${hours}:${minutes}.pdf`;
  }
}

/**
 * Converts Blob to shareable File
 */
async function toFile(blob: Blob, status:StockStatus): Promise<File> {
  const fileName = generateFileName(status);
  const buffer = await blob.arrayBuffer();
  return new File([buffer], fileName, { 
    type: 'application/pdf',
    lastModified: Date.now()
  });
}

/**
 * 📥 DOWNLOAD PDF
 * Simple, fast, reliable
 */
export async function downloadPdf(blob: Blob,status:StockStatus): Promise<void> {
  const fileName = generateFileName(status);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 🔗 SHARE PDF - ALL OPTIONS
 * Opens native share sheet with all apps:
 * WhatsApp, Telegram, Email, Drive, etc.
 */
export async function sharePdf(blob: Blob ,status:StockStatus): Promise<void> {
  try {
    const file = await toFile(blob,status);
    
    if (!navigator.share || !navigator.canShare?.({ files: [file] })) {
      throw new Error("Share not supported");
    }

    await navigator.share({
      files: [file],
      title: 'Stock List',
      text: 'Stock List PDF'
    });

  } catch (error) {
    // Silent fallback
    if ((error as any)?.name !== 'AbortError') {
      await downloadPdf(blob,status);
    }
  }
}

/**
 * 🚀 USAGE - Keep it simple:
 * 
 * <button onClick={() => shareOnWhatsApp(pdfBlob)}>
 *   Share on WhatsApp
 * </button>
 * 
 * <button onClick={() => sharePdf(pdfBlob)}>
 *   Share
 * </button>
 * 
 * <button onClick={() => downloadPdf(pdfBlob)}>
 *   Download
 * </button>
 */