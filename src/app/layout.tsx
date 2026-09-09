import "./globals.css";

import MSWProvider from "../providers/MSWProvider";
import StoreProvider from "../providers/StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </MSWProvider>
      </body>
    </html>
  );
}