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
      </div>
    </header>
  );
}