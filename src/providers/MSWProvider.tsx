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
      if (
        process.env.NODE_ENV === "development"
      ) {
        const { worker } = await import(
          "../mocks/browser"
        );

        await worker.start({
          onUnhandledRequest: "bypass",
        });
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