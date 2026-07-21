import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HeatGuard — Heat Wave Early Warning System",
    template: "%s · HeatGuard",
  },
  description:
    "Monitor heat-wave risk, issue IMD-style early warnings, assess vulnerable populations, and track recovery across India.",
  applicationName: "HeatGuard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
