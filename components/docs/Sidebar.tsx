import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

export default function Sidebar() {
  const docs = getAllDocs();

  const groupedDocs: Record<string, typeof docs> = {};

  for (const doc of docs) {
    const category = doc.category || "Documentation";

    if (!groupedDocs[category]) {
      groupedDocs[category] = [];
    }

    groupedDocs[category].push(doc);
  }

  for (const category of Object.keys(groupedDocs)) {
    groupedDocs[category].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }

  return (
    <aside className="docs-sidebar">
      <div className="sidebar-title">Documentation</div>

      <nav>
        {Object.entries(groupedDocs).map(([category, categoryDocs]) => (
          <div className="sidebar-section" key={category}>
            <h3>{category}</h3>

            {categoryDocs.map((doc) => (
              <Link
                key={doc.slug.join("/")}
                href={`/docs/${doc.slug.join("/")}`}
                className="sidebar-link"
              >
                {doc.title}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
