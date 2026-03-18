import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "RetailEdge - On-Device Retail AI", description: "Edge AI platform for retail: smart shelves, analytics, POS, signage, inventory, and fleet management" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="antialiased">{children}</body></html>;
}
