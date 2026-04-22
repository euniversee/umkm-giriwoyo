import ImageWithFallback from "@/components/image-with-fallback"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MessageCircle } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import ImageGallery from "@/components/image-gallery"

interface ProductDetailProps {
  params: {
    id: string
  }
}

// Utility functions (inline)
function extractPrice(priceStr: string): number {
  if (!priceStr || priceStr === "#") return 0
  const cleanPrice = priceStr.replace(/[^\d]/g, "")
  return Number.parseInt(cleanPrice) || 0
}

function formatPrice(price: number): string {
  if (price === 0) return "Hubungi Penjual"
  return `Rp ${price.toLocaleString("id-ID")}`
}

// Load UMKM data function (inline) with updated CSV URL
async function loadUmkmData() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UMKM_Giriwoyo_Merged%20-%20UMKM_Giriwoyo_Merged.csv-HoVxuTq4Smz9uABt0C2Ppmx2eBsNzQ.csv",
      { cache: "no-store" },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    const lines = csvText.split("\n")

    if (lines.length < 2) {
      throw new Error("CSV file is empty or invalid")
    }

    const umkmData = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      try {
        const values = parseCSVLine(line)

        if (values.length >= 6) {
          let products = []
          const productsStr = values[4]
          if (productsStr && productsStr !== "#") {
            try {
              const cleanProductsStr = productsStr.replace(/'/g, '"').replace(/\n/g, "").trim()
              products = JSON.parse(cleanProductsStr)
            } catch (e) {
              console.warn(`Error parsing products for line ${i}:`, e)
              products = []
            }
          }

          let cdnLinks = []
          const cdnLinksStr = values[5]
          if (cdnLinksStr && cdnLinksStr !== "#") {
            try {
              const cleanCdnStr = cdnLinksStr.replace(/'/g, '"').replace(/\n/g, "").trim()
              cdnLinks = JSON.parse(cleanCdnStr)
            } catch (e) {
              console.warn(`Error parsing cdn_links for line ${i}:`, e)
              cdnLinks = ["/placeholder.svg"]
            }
          }

          if (products.length > 0) {
            umkmData.push({
              id: i,
              "Nama Usaha": values[0].replace(/"/g, ""),
              Alamat: values[1].replace(/"/g, ""),
              Koordinat: values[2].replace(/"/g, ""),
              "Link WhatsApp": values[3].replace(/"/g, ""),
              products: products,
              cdn_links: cdnLinks.length > 0 ? cdnLinks : ["/placeholder.svg"],
            })
          }
        }
      } catch (error) {
        console.warn(`Error parsing line ${i}:`, error)
        continue
      }
    }

    return umkmData
  } catch (error) {
    console.error("Error loading UMKM data:", error)
    return []
  }
}

function parseCSVLine(line: string): string[] {
  const result = []
  let current = ""
  let inQuotes = false
  let i = 0

  while (i < line.length) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 2
      } else {
        inQuotes = !inQuotes
        i++
      }
    } else if (char === "," && !inQuotes) {
      result.push(current)
      current = ""
      i++
    } else {
      current += char
      i++
    }
  }

  result.push(current)
  return result
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  try {
    const umkmData = await loadUmkmData()

    if (umkmData.length === 0) {
      return (
        <div className="bg-white min-h-screen">
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

          <section className="container mx-auto px-6 py-16 text-center">
            <h1 className="text-3xl font-semibold text-[#161616] mb-4">Produk Tidak Ditemukan</h1>
            <p className="text-gray-500 mb-8">Maaf, data produk sedang tidak tersedia. Silakan coba lagi nanti.</p>
            <Link href="/katalog" className="bg-[#161616] text-white px-6 py-3 rounded-full hover:bg-black transition">
              Kembali ke Katalog
            </Link>
          </section>
        </div>
      )
    }

    // Parse ID untuk mendapatkan UMKM dan product index
    const [umkmId, productIndex] = params.id.split("-").map(Number)
    const umkm = umkmData.find((u) => u.id === umkmId)
    const product = umkm?.products[productIndex]

    if (!umkm || !product) {
      notFound()
    }

    // Get related products from the same UMKM
    const relatedProducts = umkm.products
      .map((p: any, index: number) => ({
        id: `${umkm.id}-${index}`,
        name: p["Nama Produk"] || "Produk Tanpa Nama",
        price: extractPrice(p.Harga || "0"),
        priceDisplay: p.Harga || "Hubungi Penjual",
        image: umkm.cdn_links[0] || "/placeholder.svg",
        namaUsaha: umkm["Nama Usaha"] || "UMKM",
      }))
      .filter((_, index) => index !== productIndex)
      .slice(0, 3)

    // Parse coordinates for map link - improved coordinate parsing
    const parseCoordinates = (koordinatStr: string) => {
      if (!koordinatStr || koordinatStr === "#") return null

      const coords = koordinatStr.split(",").map((coord) => coord.trim())
      if (coords.length === 2) {
        const lat = Number.parseFloat(coords[0])
        const lng = Number.parseFloat(coords[1])

        if (!isNaN(lat) && !isNaN(lng)) {
          return { lat, lng }
        }
      }
      return null
    }

    const parsedCoords = parseCoordinates(umkm.Koordinat || "")
    const mapUrl = parsedCoords
      ? `https://www.google.com/maps?q=${parsedCoords.lat},${parsedCoords.lng}`
      : `https://www.google.com/maps/search/${encodeURIComponent(umkm["Nama Usaha"] + " Giriwoyo Wonogiri")}`

    const createWhatsAppMessage = () => {
      const productName = product["Nama Produk"] || "Produk"
      const umkmName = umkm["Nama Usaha"] || "UMKM"
      const price = product.Harga || "Hubungi Penjual"

      const message = `Halo ${umkmName}! 

Saya tertarik dengan produk:
*${productName}*
Harga: ${price}

Saya ingin mengetahui:
• Ketersediaan stok
• Detail produk lebih lanjut
• Cara pemesanan

Terima kasih!`

      return encodeURIComponent(message)
    }

    const whatsappUrl =
      umkm["Link WhatsApp"] && umkm["Link WhatsApp"] !== "#"
        ? `${umkm["Link WhatsApp"]}?text=${createWhatsAppMessage()}`
        : null

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

        {/* Breadcrumb */}
        <section className="container mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#b4252b]">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/katalog" className="hover:text-[#b4252b]">
              Katalog
            </Link>
            <span>/</span>
            <span className="text-[#161616]">{product["Nama Produk"] || "Produk"}</span>
          </nav>
        </section>

        {/* Product Detail */}
        <section className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <ImageGallery
                images={umkm.cdn_links || ["/placeholder.svg"]}
                productName={product["Nama Produk"] || "Produk"}
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-semibold text-[#161616] mb-4">
                {product["Nama Produk"] || "Produk Tanpa Nama"}
              </h1>

              {/* UMKM Info */}
              <div className="bg-[#f8f8f8] p-4 rounded-xl mb-6">
                <h3 className="font-semibold text-[#161616] mb-2">Informasi UMKM</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Nama Usaha:</strong> {umkm["Nama Usaha"] || "UMKM"}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Alamat:</strong> {umkm.Alamat || "Alamat tidak tersedia"}
                </p>
                <div className="flex space-x-2">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 bg-[#25D366] text-white px-3 py-1 rounded-full text-xs hover:bg-green-600 transition"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#161616] text-white px-3 py-1 rounded-full text-xs hover:bg-black transition"
                  >
                    Lihat Lokasi
                  </a>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#b4252b]">{product.Harga || "Hubungi Penjual"}</span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#161616] mb-2">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product["Deskripsi Produk"] || "Deskripsi tidak tersedia"}
                </p>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3 mb-6">
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 bg-[#25D366] text-white px-8 py-3 rounded-lg hover:bg-green-600 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>HUBUNGI VIA WHATSAPP</span>
                  </a>
                ) : (
                  <div className="w-full flex items-center justify-center bg-gray-300 text-gray-500 px-8 py-3 rounded-lg cursor-not-allowed">
                    <span>KONTAK TIDAK TERSEDIA</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="container mx-auto px-6 py-8">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              <button className="py-2 px-1 border-b-2 border-[#b4252b] text-[#b4252b] font-medium text-sm">
                Deskripsi
              </button>
            </nav>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              {product["Deskripsi Produk"] || "Deskripsi tidak tersedia"}
            </p>
            <div className="bg-[#f8f8f8] p-4 rounded-xl">
              <h4 className="font-semibold text-[#161616] mb-2">Informasi Tambahan</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>UMKM:</strong> {umkm["Nama Usaha"] || "UMKM"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Lokasi:</strong> {umkm.Alamat || "Alamat tidak tersedia"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Koordinat:</strong> {umkm.Koordinat}
              </p>
              <p className="text-sm text-gray-600">
                Produk ini merupakan hasil karya UMKM lokal dari Giriwoyo yang dibuat dengan penuh dedikasi dan kualitas
                terbaik.
              </p>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-semibold text-[#161616] mb-8 text-center">
              Produk Lainnya dari {umkm["Nama Usaha"] || "UMKM"}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-48 relative overflow-hidden">
                    <ImageWithFallback
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#161616] mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#161616]">{formatPrice(relatedProduct.price)}</span>
                      <Link
                        href={`/katalog/${relatedProduct.id}`}
                        className="bg-[#161616] text-white text-xs px-3 py-1 rounded-full hover:bg-black transition"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-[#fcfbf6] py-16 border-t border-[#f1f1f1]">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <h3 className="font-bold text-lg mb-2">UMKM GIO: Dari Giriwoyo, Untuk Indonesia.</h3>
              <p className="text-sm font-normal max-w-md">
                Sebuah jembatan digital untuk mendukung pertumbuhan UMKM lokal, melestarikan tradisi, dan menghadirkan
                produk berkualitas bagi semua.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex space-x-4 mt-6">
                  <Link href="https://www.instagram.com/umkm.gio/" className="text-[#161616]">
                    <div className="w-8 h-8 flex items-center justify-center border border-[#d9d9d9] rounded-full">
                      <ImageWithFallback src="/images/instagram.svg" alt="Instagram" width={16} height={16} />
                    </div>
                  </Link>
                  <Link href="https://www.instagram.com/ofc.mapresgio/" className="text-[#161616]">
                    <div className="w-8 h-8 flex items-center justify-center border border-[#d9d9d9] rounded-full">
                      <ImageWithFallback src="/images/instagram.svg" alt="Instagram" width={16} height={16} />
                    </div>
                  </Link>
                </div>
                <div className="flex space-x-2 mt-2 text-xs">
                  <span>@umkmgio</span>
                  <span>@ofcmapresgio</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-3">Beranda</h4>
                <h4 className="font-medium mb-3 text-sm">Tentang Kami</h4>
                <h4 className="font-medium mb-3 text-sm">Produk</h4>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-sm">Peta UMKM</h4>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-sm">Panduan Belanja</h4>
                <h4 className="font-medium mb-3 text-sm">Kontak</h4>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    console.error("Error in ProductDetail:", error)

    return (
      <div className="bg-white min-h-screen">
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
          <div className="flex items-center">
            <MobileMenu currentPath="/katalog" />
          </div>
        </header>

        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-semibold text-[#161616] mb-4">Terjadi Kesalahan</h1>
          <p className="text-gray-500 mb-8">
            Maaf, terjadi kesalahan saat memuat detail produk. Silakan coba lagi nanti.
          </p>
          <Link href="/katalog" className="bg-[#161616] text-white px-6 py-3 rounded-full hover:bg-black transition">
            Kembali ke Katalog
          </Link>
        </section>
      </div>
    )
  }
}
