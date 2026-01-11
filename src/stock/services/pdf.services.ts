import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { StockItem, StockStatus } from "../types/stock.types";

/**
 * HIGH-END DESIGN UTILITIES
 * Using a "Sophisticated Tech" Palette
 */
const THEME = {
  primary: rgb(0.05, 0.2, 0.45),      // Navy Blue
  accent: rgb(0.14, 0.45, 0.95),      // Electric Blue
  success: rgb(0.04, 0.52, 0.33),     // Emerald
  danger: rgb(0.78, 0.11, 0.15),      // Crimson
  surface: rgb(0.97, 0.98, 0.99),     // Off-white surface
  border: rgb(0.9, 0.92, 0.94),       // Subtle borders
  textMain: rgb(0.12, 0.14, 0.17),    // Dark Onyx
  textSecondary: rgb(0.4, 0.45, 0.5), // Slate Gray
};

function toArrayBuffer(uint8: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(uint8.byteLength);
  new Uint8Array(buffer).set(uint8);
  return buffer;
}

export async function generateStockPdf(
  items: StockItem[],
  shopName?: string,
  statusFilter?: StockStatus | "inStock"
): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 Standard
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const inStockItems = items.filter((item) => item.status === "inStock");
  const outOfStockItems = items.filter((item) => item.status === "outOfStock");

  let y = height - 50;

  // ==========================================
  // 1. BRANDED HEADER (MINIMALIST)
  // ==========================================
  page.drawRectangle({ x: 50, y: height - 60, width: 4, height: 40, color: THEME.accent });
  
  page.drawText((shopName || "Inventory Report").toUpperCase(), {
    x: 65,
    y: height - 45,
    size: 20,
    font: boldFont,
    color: THEME.textMain,
  });

  page.drawText(`${new Date().toLocaleDateString()} | BillBuddy Premium Analytics`, {
    x: 65,
    y: height - 58,
    size: 9,
    font,
    color: THEME.textSecondary,
  });

  y = height - 130;

  // ==========================================
  // 2. SUMMARY DASHBOARD (CARD STYLE)
  // ==========================================
  const cardWidth = 150;
  const drawCard = (x: number, label: string, value: string, color: any) => {
    page.drawRectangle({
      x, y: y - 50, width: cardWidth, height: 60,
      color: THEME.surface,
      borderColor: THEME.border,
      borderWidth: 1,
    });
    page.drawText(label, { x: x + 15, y: y - 15, size: 8, font: boldFont, color: THEME.textSecondary });
    page.drawText(value, { x: x + 15, y: y - 40, size: 22, font: boldFont, color });
  };

  drawCard(50, "TOTAL ITEMS", items.length.toString(), THEME.textMain);
  drawCard(222, "IN STOCK", inStockItems.length.toString(), THEME.success);
  drawCard(395, "OUT OF STOCK", outOfStockItems.length.toString(), THEME.danger);

  y -= 100;

  // ==========================================
  // 3. THE DATA GRID (CLEAN & SPACIOUS)
  // ==========================================
  const renderItems = (itemList: StockItem[], title: string, titleColor: any) => {
    if (itemList.length === 0) return;

    // Section Header
    page.drawText(title.toUpperCase(), { x: 50, y, size: 10, font: boldFont, color: titleColor });
    y -= 12;
    page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }, thickness: 1, color: THEME.border });
    y -= 25;

    itemList.forEach((item, index) => {
      // Automatic Page Overflow
      if (y < 80) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - 50;
      }

      // Zebra Stripping (Subtle)
      if (index % 2 === 0) {
        page.drawRectangle({
          x: 50, y: y - 12, width: width - 100, height: 28,
          color: THEME.surface,
        });
      }

      // Item Detail
      page.drawText(item.itemName.substring(0, 75), {
        x: 65, y: y, size: 10, font, color: THEME.textMain
      });

      // Status Badge (Right Aligned)
      const badgeText = item.status === "inStock" ? "AVAILABLE" : "EMPTY";
      const badgeColor = item.status === "inStock" ? THEME.success : THEME.danger;
      
      page.drawRectangle({
        x: width - 130, y: y - 5, width: 80, height: 16,
        color: badgeColor,
        opacity: 0.1, // Soft background
      });
      
      page.drawText(badgeText, {
        x: width - 120, y: y + 1, size: 7, font: boldFont, color: badgeColor
      });

      y -= 28;
    });
    y -= 20; // Margin between sections
  };

  if(statusFilter==="inStock"){
  renderItems(inStockItems, "In Stock Units", THEME.success);
  }
  else {
  renderItems(outOfStockItems, "Out of Stock Units", THEME.danger);  
  }

  // ==========================================
  // 4. PRESTIGE FOOTER
  // ==========================================
  const totalPages = pdfDoc.getPageCount();
  pdfDoc.getPages().forEach((p, i) => {
    p.drawRectangle({ x: 0, y: 0, width, height: 30, color: THEME.surface });
    p.drawText(`Confidential Document - ${shopName || 'Internal'}`, {
      x: 50, y: 12, size: 8, font, color: THEME.textSecondary
    });
    p.drawText(`Page ${i + 1} of ${totalPages}`, {
      x: width - 100, y: 12, size: 8, font, color: THEME.textSecondary
    });
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([toArrayBuffer(pdfBytes)], { type: "application/pdf" });
}