import Image from "next/image"
import Link from "next/link"
import MobileMenu from "@/components/mobile-menu"

export default function PanduanBelanja() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <header className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/images/logo.svg" alt="UMKM Giriwoyo Logo" width={33} height={24} className="mr-2" />
          <span className="font-semibold text-sm text-[#161616]">UMKM Giriwoyo</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Beranda
          </Link>
          <Link href="/tentang-kami" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Tentang Kami
          </Link>
          <Link href="/katalog" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Katalog
          </Link>
          <Link href="/peta-umkm" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Peta UMKM
          </Link>
          <Link href="/panduan-belanja" className="text-sm font-normal text-[#b4252b]">
            Panduan Belanja
          </Link>
          <Link href="/kontak" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Kontak
          </Link>
        </nav>
        <div className="flex items-center">
          <MobileMenu currentPath="/panduan-belanja" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-16 pb-12">
        <h1 className="text-4xl font-bold text-[#161616] mb-6">Panduan Belanja</h1>
        <p className="text-lg text-[#161616] max-w-2xl">
          Pelajari cara berbelanja produk UMKM lokal dengan mudah dan aman melalui platform kami.
        </p>
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

      {/* Footer */}
      <footer className="bg-[#fcfbf6] py-16 mt-12 border-t border-[#f1f1f1]">
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
                    <Image src="/images/instagram.svg" alt="Instagram" width={16} height={16} />
                  </div>
                </Link>
                <Link href="https://www.instagram.com/ofc.mapresgio/" className="text-[#161616]">
                  <div className="w-8 h-8 flex items-center justify-center border border-[#d9d9d9] rounded-full">
                    <Image src="/images/instagram.svg" alt="Instagram" width={16} height={16} />
                  </div>
                </Link>
              </div>
              <div className="flex space-x-2 mt-2 text-xs">
                <span>@umkmgio</span>
                <span>@ofcmapresgio</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-3">
                <Link href="/" className="hover:text-[#b4252b]">
                  Beranda
                </Link>
              </h4>
              <h4 className="font-medium mb-3 text-sm">
                <Link href="/tentang-kami" className="hover:text-[#b4252b]">
                  Tentang Kami
                </Link>
              </h4>
              <h4 className="font-medium mb-3 text-sm">
                <Link href="/katalog" className="hover:text-[#b4252b]">
                  Produk
                </Link>
              </h4>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-sm">
                <Link href="/peta-umkm" className="hover:text-[#b4252b]">
                  Peta UMKM
                </Link>
              </h4>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-sm">
                <Link href="/panduan-belanja" className="hover:text-[#b4252b]">
                  Panduan Belanja
                </Link>
              </h4>
              <h4 className="font-medium mb-3 text-sm">
                <Link href="/kontak" className="hover:text-[#b4252b]">
                  Kontak
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
