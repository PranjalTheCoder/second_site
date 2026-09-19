import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getAllDocs, getDocBySlug } from "@/lib/docs";

import Sidebar from "@/components/docs/Sidebar";

export function generateStaticParams() {
  const docs = getAllDocs();

  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocumentationPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="docs-layout">
      <Sidebar />

      <main className="docs-content">
        <h1>{doc.title}</h1>

        {doc.description && (
          <p className="docs-description">{doc.description}</p>
        )}

        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
      </main>
    </div>
  );
}
