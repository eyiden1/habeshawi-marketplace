"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [language, setLanguage] = useState<"en" | "am">("en");
  return (
    <>
      <div className="bg-[#064d2b] px-6 py-2 text-sm text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2">
          <div className="flex gap-6">
            <span>☎ 240 3918621</span>
            <span>✉ habeshawi2023@gmail.com</span>
          </div>

<div className="flex items-center gap-3">
  <button
    onClick={() => setLanguage("en")}
    className={`rounded px-3 py-1 font-semibold ${
      language === "en"
        ? "bg-yellow-400 text-black"
        : "text-white hover:bg-white/10"
    }`}
  >
    English
  </button>

  <button
    onClick={() => setLanguage("am")}
    className={`rounded px-3 py-1 font-semibold ${
      language === "am"
        ? "bg-yellow-400 text-black"
        : "text-white hover:bg-white/10"
    }`}
  >
    አማርኛ
  </button>

  <span className="ml-2">ሐበሻዊ ONLINE</span>
</div>
        </div>
      </div>

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-8">
<div className="flex items-center">
  <Image
    src="/logo/habeshawi-logo.png"
    alt="Habeshawi Marketplace"
    width={600}
    height={180}
    priority
    className="h-auto w-auto max-h-44"
  />
</div>

          <nav className="flex flex-wrap items-center gap-6 font-semibold">
            <a className="text-[#087531]" href="#">
              Home
            </a>
            <a
  href="/marketplace"
  className="hover:text-[#087531]"
>
  Marketplace
</a>
            <a href="/jobs" className="hover:text-[#087531]">
  Jobs
</a>
            <a href="/housing" className="hover:text-[#087531]">
  Housing
</a>
            <a href="/services" className="hover:text-[#087531]">
  Services
</a>
            <a href="/businesses" className="hover:text-[#087531]">
  Businesses
</a>
<a
  href="/post-ad"
  className="rounded-lg bg-[#0a7a3e] px-4 py-2 text-white hover:bg-[#086532]"
>
  Post Ad
</a>
          </nav>

          <div className="flex gap-3">
            <button className="rounded-lg border border-[#087531] px-5 py-3 font-bold text-[#087531]">
              Login
            </button>

            <button className="rounded-lg bg-yellow-400 px-5 py-3 font-bold">
              Register
            </button>

            <button className="rounded-lg bg-[#087531] px-5 py-3 font-bold text-white">
              Post an Ad +
            </button>
          </div>
        </div>
      </header>
    </>
  );
}