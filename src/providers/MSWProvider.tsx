"use client";

import { useEffect, useState } from "react";

let workerStartPromise: Promise<ServiceWorkerRegistration | undefined> | null =
  null;
  
export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === "development") {
        const { worker } = await import("../mocks/browser");

        if (!workerStartPromise) {
          workerStartPromise = worker.start({
            onUnhandledRequest: "bypass",
          });
        }

        await workerStartPromise;
      }

      setReady(true);
    };

    init();
  }, []);

  if (!ready) {
    return null;
  }

  return children;
}