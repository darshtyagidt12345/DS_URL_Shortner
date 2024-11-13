import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <header className="h-20 shadow-xl fixed top-0 w-full flex items-center justify-between px-4">
      <div className="flex items-center h-28 w-28 mt-6">
        <Image     
          src="/DS_URL_SHORTNER-removebg-preview.png"
          alt="Logo"
          height={100}
          width={100}
        />
      </div>
      <nav>
        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shortURL">Short URL</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
