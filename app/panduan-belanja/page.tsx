import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function PanduanBelanja() {
  return (
    <div className="bg-[#fcfbf6] min-h-screen">
      <Header currentPath="/panduan-belanja" />

      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="lg:grid lg:grid-cols-[1fr,1fr] gap-20 items-end">
            <div>
              <span className="text-[#b4252b] font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">Step by Step</span>
              <h1 className="text-7xl md:text-9xl font-bold text-[#161616] tracking-tighter leading-[0.85] mb-12">
                Panduan <br />
                Belanja Lokal.
              </h1>
            </div>
            <div className="lg:mb-4">
              <p className="text-2xl text-[#161616]/60 leading-relaxed font-medium">
                Kami merancang proses yang sederhana namun bermakna untuk mendukung pertumbuhan UMKM Giriwoyo langsung dari tangan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-6 pb-48">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="group relative pt-24">
            <span className="absolute top-0 left-0 text-[180px] font-bold text-[#161616]/5 leading-none select-none group-hover:text-[#b4252b]/10 transition-colors">1</span>
            <div className="relative z-10 px-8">
              <h3 className="text-3xl font-bold text-[#161616] mb-6 italic">Eksplorasi Katalog</h3>
              <p className="text-lg text-[#161616]/70 leading-relaxed">
                Telusuri kurasi produk terbaik kami melalui halaman katalog. Temukan keajaiban lokal yang menanti untuk Anda bawa pulang.
              </p>
              <div className="w-12 h-px bg-[#161616]/20 mt-12 group-hover:w-full group-hover:bg-[#b4252b] transition-all duration-700" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative pt-24 lg:translate-y-24">
            <span className="absolute top-0 left-0 text-[180px] font-bold text-[#161616]/5 leading-none select-none group-hover:text-[#b4252b]/10 transition-colors">2</span>
            <div className="relative z-10 px-8">
              <h3 className="text-3xl font-bold text-[#161616] mb-6 italic">Pilih Dengan Hati</h3>
              <p className="text-lg text-[#161616]/70 leading-relaxed">
                Masuki halaman detail setiap produk untuk memahami narasi, spesifikasi, dan harga yang ditawarkan secara transparan.
              </p>
              <div className="w-12 h-px bg-[#161616]/20 mt-12 group-hover:w-full group-hover:bg-[#b4252b] transition-all duration-700" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative pt-24">
            <span className="absolute top-0 left-0 text-[180px] font-bold text-[#161616]/5 leading-none select-none group-hover:text-[#b4252b]/10 transition-colors">3</span>
            <div className="relative z-10 px-8">
              <h3 className="text-3xl font-bold text-[#161616] mb-6 italic">Interaksi Langsung</h3>
              <p className="text-lg text-[#161616]/70 leading-relaxed">
                Hubungi penjual melalui akses WhatsApp yang telah terintegrasi untuk memesan produk dan mendiskusikan pengiriman.
              </p>
              <div className="w-12 h-px bg-[#161616]/20 mt-12 group-hover:w-full group-hover:bg-[#b4252b] transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Advice Section */}
      <section className="container mx-auto px-6 pb-48">
        <div className="lg:grid lg:grid-cols-[0.8fr,1.2fr] gap-32 items-center">
          <div className="mb-12 lg:mb-0">
             <h2 className="text-5xl font-bold text-[#161616] tracking-tighter leading-tight mb-8">Etiket <br /> Belanja Bijak.</h2>
             <p className="text-[#161616]/60 text-lg">
              Berbelanja di UMKM adalah tentang membangun hubungan manusiawi, bukan sekadar transaksi angka.
             </p>
          </div>
          <div className="grid gap-6">
            <div className="group p-10 bg-white rounded-[40px] shadow-sm border border-[#161616]/5 flex items-start gap-8 hover:bg-[#161616] transition-all duration-500">
              <div className="w-10 h-10 rounded-full border border-[#161616]/10 flex items-center justify-center shrink-0 group-hover:border-white/20">
                <span className="text-[#b4252b] font-bold">•</span>
              </div>
              <div>
                <p className="text-[#161616] font-medium text-xl leading-snug group-hover:text-white transition-colors">
                  Luangkan waktu untuk menanyakan ketersediaan stok produk sebelum melakukan pembayaran.
                </p>
              </div>
            </div>

            <div className="group p-10 bg-white rounded-[40px] shadow-sm border border-[#161616]/5 flex items-start gap-8 hover:bg-[#161616] transition-all duration-500">
              <div className="w-10 h-10 rounded-full border border-[#161616]/10 flex items-center justify-center shrink-0 group-hover:border-white/20">
                <span className="text-[#b4252b] font-bold">•</span>
              </div>
              <div>
                <p className="text-[#161616] font-medium text-xl leading-snug group-hover:text-white transition-colors">
                  Sepakati biaya pengiriman dan metode pembayaran secara jelas di awal percakapan.
                </p>
              </div>
            </div>

            <div className="group p-10 bg-white rounded-[40px] shadow-sm border border-[#161616]/5 flex items-start gap-8 hover:bg-[#161616] transition-all duration-500">
              <div className="w-10 h-10 rounded-full border border-[#161616]/10 flex items-center justify-center shrink-0 group-hover:border-white/20">
                <span className="text-[#b4252b] font-bold">•</span>
              </div>
              <div>
                <p className="text-[#161616] font-medium text-xl leading-snug group-hover:text-white transition-colors">
                   Apresiasi setiap karya lokal dengan memberikan ulasan yang membangun jika Anda puas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-32">
        <div className="bg-[#161616] rounded-[60px] p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#b4252b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-none">
              Mulai Langkah <br /> Pertama Anda.
            </h2>
            <p className="text-xl text-white/40 max-w-xl mx-auto mb-12">
              Katalog kami terbuka lebar untuk Anda jelajahi setiap saat. Temukan kebanggaan lokal hari ini.
            </p>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-4 bg-[#b4252b] text-white px-12 py-5 rounded-[24px] text-sm font-bold hover:bg-[#921e23] transition-all shadow-2xl"
            >
              Jelajahi Produk Sekarang
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
