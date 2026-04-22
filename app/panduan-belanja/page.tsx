import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function PanduanBelanja() {
  return (
    <div className="bg-white min-h-screen">
      <Header currentPath="/panduan-belanja" />

      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[#b4252b] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Shopping Guide</span>
          <h1 className="text-6xl font-bold text-[#161616] tracking-tighter mb-6 leading-tight">Cara Belanja Produk Lokal</h1>
          <p className="text-xl text-[#161616]/60 max-w-2xl mx-auto leading-relaxed">
            Pelajari cara berbelanja produk UMKM lokal dengan mudah dan aman melalui platform dedikasi kami.
          </p>
        </div>
      </section>

      {/* Guide Steps */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#fcfbf6] p-6 rounded-2xl">
            <div className="w-12 h-12 bg-[#b4252b] rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-bold text-xl mb-3">Jelajahi Katalog</h3>
            <p className="text-sm text-[#161616]">Telusuri berbagai produk UMKM lokal di halaman katalog.</p>
          </div>

          <div className="bg-[#fcfbf6] p-6 rounded-2xl">
            <div className="w-12 h-12 bg-[#b4252b] rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-bold text-xl mb-3">Pilih Produk</h3>
            <p className="text-sm text-[#161616]">
              Klik pada produk yang menarik untuk melihat detail lengkap, termasuk deskripsi, harga, dan informasi
              kontak penjual.
            </p>
          </div>

          <div className="bg-[#fcfbf6] p-6 rounded-2xl">
            <div className="w-12 h-12 bg-[#b4252b] rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-bold text-xl mb-3">Hubungi Penjual</h3>
            <p className="text-sm text-[#161616]">
              Gunakan informasi kontak yang tersedia untuk menghubungi penjual langsung dan melakukan pemesanan.
            </p>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#161616] mb-8">Tips Berbelanja</h2>
        <div className="bg-[#fcfbf6] p-8 rounded-2xl">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-[#b4252b] mr-3">•</span>
              <span className="text-sm text-[#161616]">
                Pastikan untuk menanyakan ketersediaan stok sebelum memesan
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#b4252b] mr-3">•</span>
              <span className="text-sm text-[#161616]">
                Konfirmasi harga dan ongkos kirim sebelum melakukan pembayaran
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#b4252b] mr-3">•</span>
              <span className="text-sm text-[#161616]">Simpan kontak penjual untuk pembelian selanjutnya</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-[#161616] mb-6">Siap Berbelanja?</h2>
        <p className="text-sm text-[#161616] mb-8 max-w-md mx-auto">
          Mulai jelajahi produk-produk berkualitas dari UMKM lokal Giriwoyo sekarang juga.
        </p>
        <Link
          href="/katalog"
          className="bg-[#161616] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#000000] transition"
        >
          Mulai Berbelanja
        </Link>
      </section>

      <Footer />
    </div>
  )
}
