import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

async function getMarkdownContentAsHtml(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), "docs", filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const processed = await remark().use(html).process(fileContents);
  return processed.toString();
}

export const metadata: Metadata = {
  title: "Términos y Condiciones - Stikerz",
  description: "Términos y condiciones de uso de Stikerz.",
};

export default async function TermsPage() {
  const contentHtml = await getMarkdownContentAsHtml("terms.md");

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <article
          id="terms-article"
          className="prose prose-invert sm:prose-lg"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </main>
  );
}
