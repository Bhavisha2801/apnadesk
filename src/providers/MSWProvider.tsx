"use client";

import { useEffect, useState } from "react";

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { worker } = await import("../mocks/browser");

        await worker.start({
          onUnhandledRequest: "bypass",
        });

        console.log("✅ MSW started successfully");

        setReady(true);
      } catch (error) {
        console.error("❌ MSW failed to start:", error);
        setReady(true);
      }
    };

    init();
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}