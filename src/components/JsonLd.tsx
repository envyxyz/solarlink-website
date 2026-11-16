/** Renders one or more JSON-LD objects. Server component; `<` is escaped so content cannot close the tag. */
export function JsonLd({ data }: { data: object | (object | null)[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
