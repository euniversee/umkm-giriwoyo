import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { UmkmData } from "./load-umkm-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fungsi untuk shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Fungsi untuk mendapatkan foto unik untuk setiap produk dari UMKM yang sama
export function getUniqueImageForProducts(umkmData: UmkmData[]): Map<string, string> {
  const imageMap = new Map<string, string>()
  const usedImages = new Map<number, Set<string>>()

  umkmData.forEach((umkm) => {
    usedImages.set(umkm.id, new Set())

    umkm.products.forEach((product, productIndex) => {
      const productId = `${umkm.id}-${productIndex}`
      const availableImages = umkm.cdn_links.filter((img) => !usedImages.get(umkm.id)?.has(img))

      if (availableImages.length > 0) {
        const selectedImage = availableImages[0]
        imageMap.set(productId, selectedImage)
        usedImages.get(umkm.id)?.add(selectedImage)
      } else {
        // Jika semua gambar sudah digunakan, gunakan gambar pertama
        imageMap.set(productId, umkm.cdn_links[0] || "/placeholder.svg")
      }
    })
  })

  return imageMap
}
