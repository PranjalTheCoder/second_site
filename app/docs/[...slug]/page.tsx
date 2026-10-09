import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getAllDocs, getDocBySlug } from "@/lib/docs";

import DocsHeader from "@/components/docs/DocsHeader";
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
  const allDocs = getAllDocs();

  const currentIndex = allDocs.findIndex(
    (item) => item.slug.join("/") === slug.join("/"),
  );

  const previousDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;

  const nextDoc =
    currentIndex >= 0 && currentIndex < allDocs.length - 1
      ? allDocs[currentIndex + 1]
      : null;

  return (
    <>
      <DocsHeader />

      <div className="docs-layout">
        <Sidebar currentPath={`/docs/${slug.join("/")}`} />

        <main className="docs-content">
          <nav className="docs-breadcrumbs" aria-label="Breadcrumb">
            <a href="/second_site/">Home</a>

            {slug.map((part, index) => {
              const label = part
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              return (
                <span key={part}>
                  <span className="breadcrumb-separator">/</span>
                  <span>{label}</span>
                </span>
              );
            })}
          </nav>
          <h1>{doc.title}</h1>

          {doc.description && (
            <p className="docs-description">{doc.description}</p>
          )}

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {doc.content}
          </ReactMarkdown>
          <nav
            className="docs-pagination"
            aria-label="Documentation pagination"
          >
            {previousDoc ? (
              <Link
                href={`/docs/${previousDoc.slug.join("/")}`}
                className="docs-pagination-link"
              >
                <span>← Previous</span>
                <strong>{previousDoc.title}</strong>
              </Link>
            ) : (
              <span />
            )}

            {nextDoc ? (
              <Link
                href={`/docs/${nextDoc.slug.join("/")}`}
                className="docs-pagination-link docs-pagination-next"
              >
                <span>Next →</span>
                <strong>{nextDoc.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>
      </div>
    </>
  );
}
