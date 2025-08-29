import "./globals.css";
import localFont from 'next/font/local';
import { Figtree } from "next/font/google";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import QueryProvider from "@/providers/react-query-provider";
import NextTopLoader from "nextjs-toploader";
import { Notifications } from "./_components/notification/notifications";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "700", "800", "900"],
});

const yekanbakh = localFont({
  src: [
    {
      path: "@/assets/fonts/yekanbakh/YekanBakh-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "@/assets/fonts/yekanbakh/YekanBakh-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "@/assets/fonts/yekanbakh/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "@/assets/fonts/yekanbakh/YekanBakh-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "@/assets/fonts/yekanbakh/YekanBakh-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "@/assets/fonts/yekanbakh/YekanBakh-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" className={`${yekanbakh.variable} ${figtree.variable}`}>
      <body
        cz-shortcut-listen="true"
        className="min-h-screen grid grid-rows-[80px_1fr_auto] font-bold uppercase bg-base-100 text-base-content"
      >
        <NextTopLoader showSpinner={false} color="#077bea" />
        <Notifications />
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
