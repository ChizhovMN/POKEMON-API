import React from "react";
export default function SearchCounter({
  search,
  results,
}: {
  search: string;
  results: number;
}) {
  return (
    <>
      {search.length > 0 && (
        <div style={{ textAlign: "center" }}>Search results: {results}</div>
      )}
    </>
  );
}
