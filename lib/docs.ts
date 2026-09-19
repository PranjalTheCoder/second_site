import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "content", "docs");

export type Doc = {
  slug: string[];
  title: string;
  description?: string;
  category?: string;
  order?: number;
  content: string;
};

export function getAllDocs(): Doc[] {
  const docs: Doc[] = [];

  function readDirectory(directory: string) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        readDirectory(fullPath);
      } else if (file.endsWith(".md")) {
        const fileContent = fs.readFileSync(fullPath, "utf8");

        const { data, content } = matter(fileContent);

        const relativePath = path.relative(docsDirectory, fullPath);

        const slug = relativePath.replace(/\.md$/, "").split(path.sep);

        docs.push({
          slug,
          title: data.title ?? "Untitled",
          description: data.description,
          category: data.category,
          order: data.order,
          content,
        });
      }
    }
  }

  readDirectory(docsDirectory);

  return docs;
}

export function getDocBySlug(slug: string[]): Doc | null {
  const filePath = path.join(docsDirectory, `${slug.join("/")}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description,
    category: data.category,
    order: data.order,
    content,
  };
}
