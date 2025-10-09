import "./globals.css";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body id="top">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
