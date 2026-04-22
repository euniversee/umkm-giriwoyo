import type { Metadata } from "next"
import Link from "next/link"
import ImageWithFallback from "@/components/image-with-fallback"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { loadUmkmData } from "@/lib/load-umkm-data"

interface KatalogProps {
  searchParams: {
    page?: string
  }
}

export const metadata: Metadata = {
  title: "Katalog Produk UMKM Giriwoyo - Produk Lokal Berkualitas",
  description:
    "Jelajahi katalog lengkap produk-produk berkualitas dari UMKM lokal Giriwoyo, Wonogiri. Temukan makanan tradisional, kerajinan, dan inovasi produk lokal terbaik.",
  keywords: [
    "katalog UMKM",
    "produk lokal Giriwoyo",
    "makanan tradisional",
    "kerajinan lokal",
    "UMKM Wonogiri",
    "belanja online lokal",
  ],
  openGraph: {
    title: "Katalog Produk UMKM Giriwoyo - Produk Lokal Berkualitas",
    description: "Jelajahi katalog lengkap produk-produk berkualitas dari UMKM lokal Giriwoyo, Wonogiri.",
    images: [
      {
        url: "/images/katalog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Katalog Produk UMKM Giriwoyo",
      },
    ],
  },
}

// Utility functions
function extractPrice(priceStr: string): number {
  if (!priceStr || priceStr === "#") return 0
  const cleanPrice = priceStr.replace(/[^\d]/g, "")
  return Number.parseInt(cleanPrice) || 0
}

function formatPrice(price: number): string {
  if (price === 0) return "Hubungi Penjual"
  return `Rp ${price.toLocaleString("id-ID")}`
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Get unique images for products
function getUniqueImageForProducts(umkmData: any[]) {
  const imageMap = new Map()
  const usedImages = new Map()

  umkmData.forEach((umkm) => {
    usedImages.set(umkm.id, new Set())

    umkm.products.forEach((product: any, productIndex: number) => {
      const productId = `${umkm.id}-${productIndex}`
      const availableImages = umkm.cdn_links.filter((img: string) => !usedImages.get(umkm.id)?.has(img))

      if (availableImages.length > 0) {
        const selectedImage = availableImages[0]
        imageMap.set(productId, selectedImage)
        usedImages.get(umkm.id)?.add(selectedImage)
      } else {
        imageMap.set(productId, umkm.cdn_links[0] || "/placeholder.svg")
      }
    })
  })

  return imageMap
}

function getCompressedImageUrl(originalUrl: string, width = 400, quality = 80): string {
  if (!originalUrl || originalUrl.includes("placeholder.svg")) {
    return originalUrl
  }

  // Check if it's a Cloudinary URL
  if (originalUrl.includes("res.cloudinary.com")) {
    // Insert transformation parameters before the version or file path
    const parts = originalUrl.split("/upload/")
    if (parts.length === 2) {
      return `${parts[0]}/upload/w_${width},q_${quality},f_auto/${parts[1]}`
    }
  }

  return originalUrl
}

export default async function Katalog({ searchParams }: KatalogProps) {
  const umkmData = await loadUmkmData()

  // Fallback jika data kosong
  if (umkmData.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        {/* Navigation */}
        <header className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <ImageWithFallback
                  src="/images/logo.svg"
                  alt="UMKM Giriwoyo Logo"
                  width={33}
                  height={24}
                  className="mr-2"
                />
                <span className="font-semibold text-sm text-[#161616]">UMKM Giriwoyo</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
              Beranda
            </Link>
            <Link href="/tentang-kami" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
              Tentang Kami
            </Link>
            <Link href="/katalog" className="text-sm font-normal text-[#b4252b]">
              Katalog
            </Link>
            <Link href="/peta-umkm" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
              Peta UMKM
            </Link>
            <Link href="/panduan-belanja" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
              Panduan Belanja
            </Link>
            <Link href="/kontak" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
              Kontak
            </Link>
          </nav>
          <div className="flex items-center">
            <MobileMenu currentPath="/katalog" />
          </div>
        </header>

        {/* Error State */}
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-semibold text-[#161616] mb-4">Katalog Produk</h1>
          <p className="text-gray-500 mb-8">Maaf, data produk sedang tidak tersedia. Silakan coba lagi nanti.</p>
          <Link href="/" className="bg-[#161616] text-white px-6 py-3 rounded-full hover:bg-black transition">
            Kembali ke Beranda
          </Link>
        </section>
      </div>
    )
  }

  // Get unique images untuk setiap produk
  const uniqueImageMap = getUniqueImageForProducts(umkmData)

  // Transform data untuk display
  const allProducts = umkmData.flatMap((umkm) =>
    umkm.products.map((product: any, productIndex: number) => ({
      id: `${umkm.id}-${productIndex}`,
      umkmId: umkm.id,
      productIndex: productIndex,
      name: product["Nama Produk"] || "Produk Tanpa Nama",
      namaUsaha: umkm["Nama Usaha"] || "UMKM",
      price: extractPrice(product.Harga || "0"),
      priceDisplay: product.Harga || "Hubungi Penjual",
      image: getCompressedImageUrl(uniqueImageMap.get(`${umkm.id}-${productIndex}`) || "/placeholder.svg"),
      originalImage: uniqueImageMap.get(`${umkm.id}-${productIndex}`) || "/placeholder.svg",
      description: product["Deskripsi Produk"] || "Deskripsi tidak tersedia",
      alamat: umkm.Alamat || "Alamat tidak tersedia",
    })),
  )

  const shuffledProducts = shuffleArray(allProducts)

  // Pagination logic
  const currentPage = Number.parseInt(searchParams.page || "1")
  const productsPerPage = 20
  const totalPages = Math.ceil(shuffledProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const productsForDisplay = shuffledProducts.slice(startIndex, endIndex)

  return (
    <div className="bg-white min-h-screen">
      <Header currentPath="/katalog" />

      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[#b4252b] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Our Catalog</span>
          <h1 className="text-6xl font-bold text-[#161616] tracking-tighter mb-6 leading-tight">Produk Pilihan Giriwoyo</h1>
          <p className="text-xl text-[#161616]/60 max-w-2xl mx-auto leading-relaxed">
            Temukan berbagai produk berkualitas yang dibuat dengan ketulusan oleh para pelaku UMKM Giriwoyo.
          </p>
          <div className="inline-flex items-center gap-4 mt-8 px-6 py-2 bg-[#161616]/5 rounded-full text-xs font-medium text-[#161616]/60">
            <span>Menampilkan {shuffledProducts.length} produk</span>
            <span className="w-1 h-1 bg-[#161616]/20 rounded-full" />
            <span>Halaman {currentPage} dari {totalPages}</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 py-12">
        {productsForDisplay.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Tidak ada produk yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsForDisplay.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-[#161616] line-clamp-2 mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{product.namaUsaha}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#161616] text-sm">{product.priceDisplay}</span>
                    <Link
                      href={`/katalog/${product.id}`}
                      className="bg-[#161616] text-white text-xs px-3 py-1 rounded-full hover:bg-black transition"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="container mx-auto px-6 py-8 flex justify-center">
        <div className="flex items-center space-x-2">
          {/* Previous button */}
          {currentPage > 1 && (
            <Link
              href={`/katalog?page=${currentPage - 1}`}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#161616] border border-[#d9d9d9] hover:bg-gray-50"
            >
              ←
            </Link>
          )}

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }

            return (
              <Link
                key={pageNum}
                href={`/katalog?page=${pageNum}`}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                  pageNum === currentPage
                    ? "bg-[#161616] text-white"
                    : "bg-white text-[#161616] border border-[#d9d9d9] hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </Link>
            )
          })}

          {/* Next button */}
          {currentPage < totalPages && (
            <Link
              href={`/katalog?page=${currentPage + 1}`}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#161616] border border-[#d9d9d9] hover:bg-gray-50"
            >
              →
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
