import { Suspense } from "react";

async function BackendData() {
  const response = await fetch("http://backend:3000/db", {
    cache: "no-store",
  });

  const data = await response.json();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function Home() {
  return (
    <main>
      <h1>Multi Service Pet на Docker Hot Reload Test 2</h1>
      <h2>Backend connection</h2>

      <Suspense fallback={<p>Loading backend data...</p>}>
        <BackendData />
      </Suspense>
    </main>
  );
}