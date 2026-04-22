import ImageWithFallback from "@/components/image-with-fallback"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MessageCircle, MapPin, ArrowLeft } from "lucide-react"
import ImageGallery from "@/components/image-gallery"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { loadUmkmData } from "@/lib/load-umkm-data"

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


export default async function ProductDetail({ params }: ProductDetailProps) {
  try {
    const umkmData = await loadUmkmData()

    if (umkmData.length === 0) {
      return (
        <div className="bg-[#fcfbf6] min-h-screen">
          <Header currentPath="/katalog" />
          <section className="container mx-auto px-6 py-32 text-center">
            <h1 className="text-5xl font-bold text-[#161616] tracking-tighter mb-4">Produk Tidak Ditemukan</h1>
            <p className="text-[#161616]/60 mb-12 max-w-md mx-auto">Maaf, data produk sedang tidak tersedia atau telah dihapus.</p>
            <Link href="/katalog" className="inline-flex items-center space-x-2 bg-[#161616] text-white px-8 py-4 rounded-full hover:bg-black transition text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Katalog</span>
            </Link>
          </section>
          <Footer />
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
      <div className="bg-[#fcfbf6] min-h-screen">
        <Header currentPath="/katalog" />

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
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error in ProductDetail:", error)

    return (
      <div className="bg-[#fcfbf6] min-h-screen">
        <Header currentPath="/katalog" />
        <section className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl font-bold text-[#161616] tracking-tighter mb-4">Terjadi Kesalahan</h1>
          <p className="text-[#161616]/60 mb-12 max-w-md mx-auto">
            Maaf, terjadi kesalahan saat memuat detail produk. Silakan coba lagi nanti.
          </p>
          <Link href="/katalog" className="inline-flex items-center space-x-2 bg-[#161616] text-white px-8 py-4 rounded-full hover:bg-black transition text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
        </section>
        <Footer />
      </div>
    )
  }
}
