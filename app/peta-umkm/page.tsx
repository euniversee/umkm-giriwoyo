import PetaUMKMClient from "./PetaUMKMClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Peta UMKM",
  description: "Peta lokasi UMKM di Giriwoyo",
}

export default function PetaUMKM() {
  return <PetaUMKMClient />
}
