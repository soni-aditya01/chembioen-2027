import { copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(scriptDirectory, "../public");
const sourcePath = path.join(publicDirectory, "Brochure_Chembioen_2027.pdf");
const outputPath = path.join(publicDirectory, "Brochure_Chembioen_2027_with_contacts.pdf");

const sourceBytes = await readFile(sourcePath);
if (sourceBytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
  throw new Error(`The brochure source is not a valid PDF: ${sourcePath}`);
}

await copyFile(sourcePath, outputPath);
console.log(`Published brochure copied to ${outputPath}`);
