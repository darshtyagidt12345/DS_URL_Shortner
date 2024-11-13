import localFont from "next/font/local";
import "@/styles/globals.css";
import Nav from "@/components/nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "DS URL Shortner",
  description: "DS URL Shortener is a fast and user-friendly tool for shortening long URLs effortlessly. With no login required, you can quickly create compact, shareable links in seconds. Whether you’re managing links for social media, emails, or personal use, DS URL Shortener offers a hassle-free solution for keeping your URLs clean and professional. Simplify your links today with ease and reliability!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mt-20`}
      >
        <Nav></Nav>
        
        {children}
      </body>
    </html>
  );
}
