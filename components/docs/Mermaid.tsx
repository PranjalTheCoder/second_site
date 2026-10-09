"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function Mermaid({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramId = useId().replace(/:/g, "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: "neutral" });

      try {
        const { svg } = await mermaid.render(`mermaid-${diagramId}`, code);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) {
          setError("Could not render this diagram.");
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, diagramId]);

  if (error) {
    return <pre className="mermaid-error">{error}</pre>;
  }

  return <div className="mermaid-diagram" ref={containerRef} />;
}
