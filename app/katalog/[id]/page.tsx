import ImageWithFallback from "@/components/image-with-fallback"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MessageCircle, MapPin, ArrowLeft, ArrowRight, Share2, Globe, User } from "lucide-react"
import ImageGallery from "@/components/image-gallery"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { loadUmkmData } from "@/lib/load-umkm-data"
import type { Metadata } from "next"

interface ProductDetailProps {
  params: Promise<{
    id: string
  }>
}

// SEO Metadata Generation
export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { id } = await params
  const umkmData = await loadUmkmData()
  const [umkmId, productIndex] = id.split("-").map(Number)
  const umkm = umkmData.find((u) => u.id === umkmId)
  const product = umkm?.products[productIndex]

  if (!product) return { title: "Produk Tidak Ditemukan" }

  return {
    title: `${product["Nama Produk"]} | ${umkm?.["Nama Usaha"]}`,
    description: product["Deskripsi Produk"]?.slice(0, 160) || "Detail produk UMKM Giriwoyo",
  }
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

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params
  
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

    // Parse ID
    const [umkmId, productIndex] = id.split("-").map(Number)
    const umkm = umkmData.find((u) => u.id === umkmId)
    const product = umkm?.products[productIndex]

    if (!umkm || !product) {
      notFound()
    }

    // Related products from same UMKM
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

    const parseCoordinates = (koordinatStr: string) => {
      if (!koordinatStr || koordinatStr === "#") return null
      const coords = koordinatStr.split(",").map((coord) => coord.trim())
      if (coords.length === 2) {
        const lat = Number.parseFloat(coords[0])
        const lng = Number.parseFloat(coords[1])
        if (!isNaN(lat) && !isNaN(lng)) return { lat, lng }
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
      const message = `Halo ${umkmName}! \n\nSaya tertarik dengan produk:\n*${productName}*\nHarga: ${price}\n\nSaya ingin mengetahui ketersediaan stok dan detail pemesanan. Terima kasih!`
      return encodeURIComponent(message)
    }

    const whatsappUrl =
      umkm["Link WhatsApp"] && umkm["Link WhatsApp"] !== "#"
        ? `${umkm["Link WhatsApp"]}?text=${createWhatsAppMessage()}`
        : null

    return (
      <div className="bg-[#fcfbf6] min-h-screen pt-[72px]">
        <Header currentPath="/katalog" />

        <main className="container mx-auto px-6 py-12 lg:py-24">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr,450px] gap-16 xl:gap-24 items-start">
            
            {/* Left Column: Visuals */}
            <div className="w-full space-y-12">
               {/* Breadcrumb - Editorial Style */}
               <nav className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#161616]/40">
                  <Link href="/katalog" className="hover:text-[#b4252b] transition-colors">Catalog</Link>
                  <ArrowRight className="w-3 h-3" />
                  <span className="text-[#161616] truncate max-w-[200px]">{product["Nama Produk"]}</span>
               </nav>

               <div className="relative group">
                  <ImageGallery
                    images={umkm.cdn_links || ["/placeholder.svg"]}
                    productName={product["Nama Produk"] || "Produk"}
                  />
                  {/* Floating metadata badge */}
                  <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 hidden md:block">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#b4252b] block mb-1">Authentic Local</span>
                     <span className="text-sm font-bold text-[#161616]">Giriwoyo, Wonogiri</span>
                  </div>
               </div>

               {/* Large Editorial Description */}
               <div className="pt-12 border-t border-[#161616]/5">
                  <h3 className="text-sm font-bold text-[#b4252b] uppercase tracking-[0.4em] mb-12">Product Narrative</h3>
                  <p className="text-4xl md:text-5xl font-bold text-[#161616] tracking-tighter leading-[1.1] italic mb-12">
                     "{product["Deskripsi Produk"] || "Karya autentik dari pengrajin lokal yang menjaga tradisi di setiap detailnya."}"
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-12 pt-12">
                     <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#161616]/40">Kategori</span>
                        <p className="text-lg font-bold text-[#161616]">{umkm.Kategori || "Lainnya"}</p>
                     </div>
                     <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#161616]/40">Ketersediaan</span>
                        <p className="text-lg font-bold text-[#161616]">Ready to Order</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column: Sticky Info */}
            <aside className="lg:sticky lg:top-32 w-full">
               <div className="bg-white p-10 md:p-12 rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-[#161616]/5">
                  
                  <div className="mb-12">
                    <span className="text-[#b4252b] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Store Exclusive</span>
                    <h1 className="text-5xl font-bold text-[#161616] tracking-tighter leading-[0.9] mb-6 italic">
                       {product["Nama Produk"]}
                    </h1>
                    <div className="flex items-center gap-4">
                       <span className="text-2xl font-bold text-[#161616]">{product.Harga || "Hubungi Penjual"}</span>
                       <div className="h-px flex-1 bg-[#161616]/5"></div>
                    </div>
                  </div>

                  {/* Merchant Card */}
                  <div className="bg-[#fcfbf6] p-8 rounded-[32px] mb-12 group transition-all hover:bg-[#161616] hover:text-white">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b4252b] mb-4 block">Merchant Profile</span>
                     <h4 className="text-xl font-bold mb-6 italic">{umkm["Nama Usaha"]}</h4>
                     
                     <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs font-semibold">
                           <MapPin className="w-4 h-4 opacity-40" />
                           <span className="line-clamp-1">{umkm.Alamat}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-semibold">
                           <User className="w-4 h-4 opacity-40" />
                           <span>Warga Lokal Giriwoyo</span>
                        </div>
                     </div>

                     <div className="mt-8 pt-8 border-t border-[#161616]/5 group-hover:border-white/10 flex gap-4">
                        <a href={mapUrl} target="_blank" className="flex-1 text-center py-4 rounded-xl border border-[#161616]/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#161616] transition-all">Location</a>
                        <Link href="/peta-umkm" className="flex-1 text-center py-4 rounded-xl border border-[#161616]/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#161616] transition-all">Interactive Map</Link>
                     </div>
                  </div>

                  <div className="space-y-4">
                    {whatsappUrl ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center p-8 bg-[#161616] text-white rounded-[24px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#b4252b] transition-all shadow-xl"
                      >
                        Pesan via WhatsApp
                      </a>
                    ) : (
                      <div className="w-full p-8 bg-gray-100 text-gray-400 rounded-[24px] text-xs font-bold uppercase tracking-[0.2em] text-center italic">
                        Contact Offline
                      </div>
                    )}
                    <button className="w-full flex items-center justify-center p-8 bg-transparent border border-[#161616]/5 text-[#161616] rounded-[24px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all">
                       Bagikan Karya Ini
                    </button>
                  </div>

                  <p className="mt-8 text-center text-[10px] text-[#161616]/40 font-bold uppercase tracking-[0.1em]">
                     Setiap pembelian mendukung pengrajin lokal.
                  </p>
               </div>
            </aside>
          </div>
        </main>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="bg-white py-24 md:py-32">
            <div className="container mx-auto px-6 text-center mb-16">
              <span className="text-[#b4252b] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Recommended</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#161616] tracking-tighter italic">Lainnya Dari {umkm["Nama Usaha"]}</h2>
            </div>

            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  href={`/katalog/${relatedProduct.id}`}
                  key={relatedProduct.id}
                  className="group bg-[#fcfbf6] rounded-[40px] overflow-hidden border border-[#161616]/5 transition-all hover:shadow-2xl"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#161616]">
                    <ImageWithFallback
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-xl rounded-3xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                       <span className="text-[10px] font-bold text-[#b4252b] uppercase tracking-[0.2em] mb-2 block">Premium Item</span>
                       <h4 className="text-lg font-bold text-[#161616] truncate mb-1 italic">{relatedProduct.name}</h4>
                       <p className="text-xs font-bold text-[#161616]/60">{formatPrice(relatedProduct.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
