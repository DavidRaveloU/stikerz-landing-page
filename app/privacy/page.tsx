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
  title: "Privacidad - Stikerz",
  description: "Política de privacidad de Stikerz.",
};

export default async function PrivacyPage() {
  const contentHtml = await getMarkdownContentAsHtml("privacy.md");

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <article
          id="privacy-article"
          className="prose prose-invert sm:prose-lg"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </main>
  );
}
