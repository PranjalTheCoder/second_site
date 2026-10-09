import Link from "next/link";

export default function DocsHeader() {
  return (
    <header className="docs-header">
      <div className="docs-header-inner">
        <Link href="/" className="docs-brand">
          <span className="docs-brand-mark">D</span>
          <span>Documentation</span>
        </Link>

        <nav className="docs-header-nav">
          <Link href="/">Home</Link>
          <Link href="/docs/introduction">Docs</Link>
        </nav>

        <div className="docs-search">
          <span className="docs-search-icon">⌕</span>
          <span>Search documentation</span>
          <kbd>⌘ K</kbd>
        </div>

        <div className="docs-header-actions">
          <a
            className="docs-header-action"
            href="/second_site/admin/#/collections/docs"
          >
            Admin
          </a>
          <a
            className="docs-header-action docs-header-action-primary"
            href="/second_site/admin/#/collections/docs/new"
          >
            + New Doc
          </a>
        </div>
      </div>
    </header>
  );
}