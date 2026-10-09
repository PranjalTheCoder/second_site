import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

type SidebarProps = {
  currentPath?: string;
};

export default function Sidebar({ currentPath }: SidebarProps) {
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

            {categoryDocs.map((doc) => {
              const href = `/docs/${doc.slug.join("/")}`;
              const isActive = currentPath === href;

              return (
                <Link
                  key={doc.slug.join("/")}
                  href={href}
                  className={`sidebar-link ${
                    isActive ? "sidebar-link-active" : ""
                  }`}
                >
                  {doc.title}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
