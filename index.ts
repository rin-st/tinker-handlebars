import * as fs from "fs";
import * as handlebars from "handlebars";
import * as path from "path";

const exampleName = process.argv[2];

if (!exampleName) {
  console.error("Please provide an example name");
  console.error("Usage: npm run dev <example-name>");
  process.exit(1);
}

// Setup paths
const templatePath = path.join(exampleName, "template.hbs");
const dataPath = path.join(process.cwd(), exampleName, "data.ts");
const helpersPath = path.join(process.cwd(), exampleName, "helpers.ts");
const outputPath = path.join(process.cwd(), exampleName, "output.ts");

// Dynamically import data and helpers
const data = require(dataPath).data;
require(helpersPath); // This will execute the helper registration

function generateFromTemplate(
  templatePath: string,
  outputPath: string,
  data: Record<string, unknown>
): void {
  try {
    // Read the template file
    const templateContent = fs.readFileSync(templatePath, "utf-8");

    // Compile the template
    const template = handlebars.compile(templateContent, {
      noEscape: true,
    });

    // Generate content with the provided data
    const generatedContent = template(data);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the generated content to the output file
    fs.writeFileSync(outputPath, generatedContent);

    console.log(`File generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
}

generateFromTemplate(templatePath, outputPath, data);
