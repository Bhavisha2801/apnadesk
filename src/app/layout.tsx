import "./globals.css";

import MSWProvider from "../providers/MSWProvider";
import StoreProvider from "../providers/StoreProvider";
import Sidebar from "../components/layout/Sidebar";

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
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />

              <main className="min-w-0 flex-1">
                {children}
              </main>
            </div>
          </StoreProvider>
        </MSWProvider>
      </body>
    </html>
  );
}