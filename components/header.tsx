"use client"

import Image from "next/image"
import Link from "next/link"
import MobileMenu from "./mobile-menu"

interface HeaderProps {
  currentPath: string
}

export default function Header({ currentPath }: HeaderProps) {
  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/tentang-kami" },
    { name: "Katalog", href: "/katalog" },
    { name: "Peta UMKM", href: "/peta-umkm" },
    { name: "Panduan", href: "/panduan-belanja" },
    { name: "Kontak", href: "/kontak" },
  ]

  return (
    <header className="container mx-auto px-6 py-8 flex justify-between items-center relative z-50">
      <Link href="/" className="flex items-center group cursor-pointer">
        <div className="relative w-8 h-8 mr-3 transition-transform duration-500 group-hover:rotate-12">
          <Image src="/images/logo.svg" alt="UMKM Giriwoyo Logo" fill className="object-contain" />
        </div>
        <span className="font-bold text-lg tracking-tighter text-[#161616]">UMKM Giriwoyo</span>
      </Link>
      
      <nav className="hidden md:flex space-x-10">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-sm font-medium transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#161616] after:transition-all hover:after:w-full ${
              currentPath === item.href ? "text-[#161616] after:w-full" : "text-[#161616]/60 hover:text-[#161616]"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center">
        <MobileMenu currentPath={currentPath} />
      </div>
    </header>
  )
}
