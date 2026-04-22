"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { MoreVertical } from "lucide-react"

interface MobileMenuProps {
  currentPath: string
}

export default function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="md:hidden relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none"
        aria-label="Menu"
      >
        <MoreVertical className="w-5 h-5 text-[#161616]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
          <Link
            href="/"
            className={`block px-4 py-2 text-sm ${
              currentPath === "/" ? "text-[#b4252b] font-medium" : "text-[#161616]"
            } hover:bg-gray-100`}
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </Link>
          <Link
            href="/tentang-kami"
            className={`block px-4 py-2 text-sm ${
              currentPath === "/tentang-kami" ? "text-[#b4252b] font-medium" : "text-[#161616]"
            } hover:bg-gray-100`}
            onClick={() => setIsOpen(false)}
          >
            Tentang Kami
          </Link>
          <Link
            href="/katalog"
            className={`block px-4 py-2 text-sm ${
              currentPath === "/katalog" ? "text-[#b4252b] font-medium" : "text-[#161616]"
            } hover:bg-gray-100`}
            onClick={() => setIsOpen(false)}
          >
            Katalog
          </Link>
          <Link
            href="/peta-umkm"
            className={`block px-4 py-2 text-sm ${
              currentPath === "/peta-umkm" ? "text-[#b4252b] font-medium" : "text-[#161616]"
            } hover:bg-gray-100`}
            onClick={() => setIsOpen(false)}
          >
            Peta UMKM
          </Link>
          <Link
            href="/panduan-belanja"
            className={`block px-4 py-2 text-sm ${
              currentPath === "/panduan-belanja" ? "text-[#b4252b] font-medium" : "text-[#161616]"
            } hover:bg-gray-100`}
            onClick={() => setIsOpen(false)}
          >
            Panduan Belanja
          </Link>
          <Link
            href="/kontak"
            className={`block px-4 py-2 text-sm ${
              currentPath === "/kontak" ? "text-[#b4252b] font-medium" : "text-[#161616]"
            } hover:bg-gray-100`}
            onClick={() => setIsOpen(false)}
          >
            Kontak
          </Link>
        </div>
      )}
    </div>
  )
}
