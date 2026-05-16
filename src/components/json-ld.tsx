import { getStructuredDataGraph } from "@/lib/structured-data";

export function JsonLd() {
  const data = getStructuredDataGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
