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
  title: "Katalog Produk",
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
    title: "Katalog Produk",
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
    <div className="bg-[#fcfbf6] min-h-screen">
      <Header currentPath="/katalog" />

      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <span className="text-[#b4252b] font-bold text-sm uppercase tracking-[0.2em] mb-6 block">Our Collection</span>
              <h1 className="text-7xl md:text-8xl font-bold text-[#161616] tracking-tighter leading-[0.9] mb-8">
                Produk Pilihan <br />
                Giriwoyo
              </h1>
              <p className="text-2xl text-[#161616]/60 leading-relaxed max-w-xl">
                Kurasi produk lokal terbaik yang dibuat dengan ketulusan dan kearifan lokal oleh para pelaku UMKM Kecamatan Giriwoyo.
              </p>
            </div>
            
            <div className="lg:mb-4">
              <div className="inline-flex flex-col items-start gap-4 p-8 bg-white rounded-3xl shadow-sm border border-[#161616]/5">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-[#161616] leading-none">{shuffledProducts.length}</span>
                  <span className="text-sm font-medium text-[#161616]/40 uppercase tracking-widest leading-tight">
                    Produk <br /> Tersedia
                  </span>
                </div>
                <div className="w-full h-px bg-[#161616]/5" />
                <p className="text-sm font-medium text-[#161616]/60">
                  Halaman {currentPage} dari {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 pb-24">
        {productsForDisplay.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-[#161616]/10">
            <p className="text-gray-500 text-xl font-medium">Tidak ada produk yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsForDisplay.map((product, idx) => (
              <div
                key={product.id}
                className={`group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#161616]/5 ${
                  idx % 4 === 1 || idx % 4 === 3 ? "lg:translate-y-12" : ""
                }`}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Link
                      href={`/katalog/${product.id}`}
                      className="w-full bg-white text-[#161616] text-sm font-bold py-4 rounded-2xl shadow-xl hover:bg-[#161616] hover:text-white transition-colors block text-center"
                    >
                      Lihat Produk
                    </Link>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-4">
                    <p className="text-[#b4252b] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{product.namaUsaha}</p>
                    <h3 className="text-xl font-bold text-[#161616] leading-tight group-hover:text-[#b4252b] transition-colors line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#161616]/5">
                    <span className="text-lg font-bold text-[#161616]">{product.priceDisplay}</span>
                    <div className="w-8 h-8 rounded-full bg-[#161616]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1H1M11 1V11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="container mx-auto px-6 py-24 flex justify-center">
        <div className="flex items-center gap-3">
          {currentPage > 1 && (
            <Link
              href={`/katalog?page=${currentPage - 1}`}
              className="w-14 h-14 flex items-center justify-center rounded-3xl bg-white text-[#161616] border border-[#161616]/10 hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </Link>
          )}

          <div className="flex items-center p-2 bg-white rounded-[32px] border border-[#161616]/5 shadow-sm">
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
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl text-sm font-bold transition-all ${
                    pageNum === currentPage
                      ? "bg-[#161616] text-white shadow-lg"
                      : "text-[#161616]/40 hover:text-[#161616] hover:bg-[#161616]/5"
                  }`}
                >
                  {pageNum}
                </Link>
              )
            })}
          </div>

          {currentPage < totalPages && (
            <Link
              href={`/katalog?page=${currentPage + 1}`}
              className="w-14 h-14 flex items-center justify-center rounded-3xl bg-white text-[#161616] border border-[#161616]/10 hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
