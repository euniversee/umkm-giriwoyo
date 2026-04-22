"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll ke atas setiap kali pathname berubah (pindah halaman)
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
