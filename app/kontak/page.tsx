import type { Metadata } from "next"
import KontakClient from "@/components/kontak-client"

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi IMAPRES Giriwoyo untuk informasi lebih lanjut mengenai UMKM lokal",
}

export default function KontakPage() {
  return <KontakClient />
}
