import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(scriptDirectory, "../public");
const sourcePath = path.join(publicDirectory, "Brochure_Chembioen_2027.pdf");
const outputPath = path.join(publicDirectory, "Brochure_Chembioen_2027_with_contacts.pdf");
const contacts = [
  {
    name: "Dr. Jatinder Kumar Ratan",
    designation: "[OFFICIAL DESIGNATION TO BE VERIFIED]"
  },
  {
    name: "Reddy Sahu",
    designation: "[DESIGNATION TO BE PROVIDED]"
  },
  {
    name: "[ADDITIONAL CONTACT PERSON 1]",
    designation: "[DESIGNATION TO BE PROVIDED]"
  },
  {
    name: "[ADDITIONAL CONTACT PERSON 2]",
    designation: "[DESIGNATION TO BE PROVIDED]"
  }
];

const sourceBytes = await readFile(sourcePath);
const brochure = await PDFDocument.load(sourceBytes);
const originalPageSize = brochure.getPage(0).getSize();
const page = brochure.addPage([originalPageSize.width, originalPageSize.height]);
const regular = await brochure.embedFont(StandardFonts.Helvetica);
const bold = await brochure.embedFont(StandardFonts.HelveticaBold);
const navy = rgb(9 / 255, 45 / 255, 76 / 255);
const blue = rgb(28 / 255, 98 / 255, 132 / 255);
const teal = rgb(66 / 255, 188 / 255, 176 / 255);
const muted = rgb(99 / 255, 120 / 255, 137 / 255);
const line = rgb(224 / 255, 232 / 255, 237 / 255);
const margin = 42;
const headerHeight = Math.min(124, originalPageSize.height * 0.19);
const headerBottom = originalPageSize.height - headerHeight;

page.drawRectangle({
  x: 0,
  y: headerBottom,
  width: originalPageSize.width,
  height: headerHeight,
  color: navy
});
page.drawRectangle({
  x: 0,
  y: headerBottom,
  width: 8,
  height: headerHeight,
  color: teal
});
page.drawText("CHEMBIOEN 2027", {
  x: margin,
  y: originalPageSize.height - 38,
  size: 10,
  font: bold,
  color: rgb(0.76, 0.9, 0.91)
});
page.drawText("Contact Information", {
  x: margin,
  y: originalPageSize.height - 70,
  size: 24,
  font: bold,
  color: rgb(1, 1, 1)
});
page.drawText("Contact details to be confirmed", {
  x: margin,
  y: originalPageSize.height - 94,
  size: 10,
  font: regular,
  color: rgb(0.84, 0.89, 0.92)
});

const gridTop = headerBottom - 20;
const footerSpace = 54;
const cardGap = 10;
const cardHeight = Math.min(
  120,
  (gridTop - margin - footerSpace - cardGap * (contacts.length - 1)) / contacts.length
);

contacts.forEach((contact, index) => {
  const y = gridTop - cardHeight * (index + 1) - cardGap * index;
  const cardWidth = originalPageSize.width - margin * 2;
  page.drawRectangle({
    x: margin,
    y,
    width: cardWidth,
    height: cardHeight,
    color: rgb(0.97, 0.98, 0.985),
    borderColor: line,
    borderWidth: 1
  });
  page.drawRectangle({ x: margin, y, width: 3, height: cardHeight, color: blue });
  page.drawText(contact.name, {
    x: margin + 14,
    y: y + cardHeight - 25,
    size: 12,
    font: bold,
    color: navy
  });
  page.drawText("Designation", {
    x: margin + 14,
    y: y + cardHeight - 46,
    size: 8,
    font: bold,
    color: muted
  });
  page.drawText(contact.designation, {
    x: margin + 78,
    y: y + cardHeight - 46,
    size: 8,
    font: regular,
    color: muted
  });
  page.drawText("Phone", {
    x: margin + 14,
    y: y + cardHeight - 65,
    size: 8,
    font: bold,
    color: muted
  });
  page.drawText("[TO BE PROVIDED]", {
    x: margin + 48,
    y: y + cardHeight - 65,
    size: 8,
    font: regular,
    color: muted
  });
  page.drawText("Email", {
    x: margin + 220,
    y: y + cardHeight - 65,
    size: 8,
    font: bold,
    color: muted
  });
  page.drawText("[TO BE PROVIDED]", {
    x: margin + 254,
    y: y + cardHeight - 65,
    size: 8,
    font: regular,
    color: muted
  });
});

const noteY = Math.max(22, gridTop - cardHeight * contacts.length - cardGap * (contacts.length - 1) - 27);
page.drawText(
  "Placeholders are not confirmed contact information. Verify the official title and replace all bracketed fields before publication.",
  {
    x: margin,
    y: noteY,
    size: 7,
    font: regular,
    color: muted,
    maxWidth: originalPageSize.width - margin * 2
  }
);

await writeFile(outputPath, await brochure.save());
console.log(`Updated brochure written to ${outputPath}`);
