import { readdirSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, "../public/images");
const outputFile = join(__dirname, "../src/imageMap.ts");

// Image extensions to include
const imageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".webp",
  ".avif",
];

function generateImageMap() {
  try {
    const files = readdirSync(publicDir);

    // Filter only image files
    const imageFiles = files.filter((file) => {
      const ext = extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Sort alphabetically
    imageFiles.sort();

    // Generate TypeScript file content
    let content = "// Auto-generated image map - Do not edit manually\n";
    content += "// Generated at: " + new Date().toISOString() + "\n\n";
    content += "export const imageMap = {\n";

    imageFiles.forEach((file, index) => {
      // Create a valid variable name from filename
      const key = basename(file, extname(file))
        .replace(/[^a-zA-Z0-9]/g, "_")
        .replace(/^(\d)/, "_$1"); // Prefix with underscore if starts with number

      const isLast = index === imageFiles.length - 1;
      content += `  ${key}: '/images/${file}'${isLast ? "" : ","}\n`;
    });

    content += "} as const;\n\n";
    content += "export type ImageKey = keyof typeof imageMap;\n";

    // Write to file
    writeFileSync(outputFile, content, "utf-8");

    console.log(`✅ Image map generated successfully!`);
    console.log(`📁 Found ${imageFiles.length} images`);
    console.log(`📝 Output: ${outputFile}`);
  } catch (error) {
    console.error("❌ Error generating image map:", error);
    process.exit(1);
  }
}

generateImageMap();
