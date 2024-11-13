import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main >
      <h1 className="text-center">Welcome to DS URL Shortener</h1>

<p className="">Turn your long, bulky URLs into short, sleek, and shareable links in just seconds! With DS URL Shortener, there’s no need to create an account—just paste your URL, click, and share with confidence.</p>

<h2>Why Choose DS URL Shortener?</h2>
<p>Fast & Simple: Shorten URLs with just one click.</p>
<p>No Login Required: Skip the hassle of sign-ups and passwords.</p>
<p>Free Forever: Enjoy our service at no cost.</p>
<p>Secure & Reliable: Your links, always safe and accessible.</p>
<div className="text-center">
<button className="bg-red-300 rounded"><Link href={"/shortURL"}>Get Started</Link></button>
</div>
    </main>
  );
}
