import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import MobileMenu from "@/components/mobile-menu"

export const metadata: Metadata = {
  title: "Beranda - Platform UMKM Lokal Giriwoyo",
  description:
    "Temukan dan dukung produk-produk berkualitas dari UMKM lokal Giriwoyo, Wonogiri. Dari makanan tradisional hingga inovasi modern, semua ada di sini.",
  keywords: [
    "UMKM Giriwoyo",
    "produk lokal",
    "makanan tradisional",
    "Wonogiri",
    "ekonomi kreatif",
    "bisnis lokal",
    "kuliner Jawa",
  ],
  openGraph: {
    title: "UMKM Giriwoyo - Platform UMKM Lokal Wonogiri",
    description: "Temukan dan dukung produk-produk berkualitas dari UMKM lokal Giriwoyo, Wonogiri.",
    images: [
      {
        url: "/images/hero-og.jpg",
        width: 1200,
        height: 630,
        alt: "UMKM Giriwoyo - Produk Lokal Berkualitas",
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <header className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/images/logo.svg" alt="UMKM Giriwoyo Logo" width={33} height={24} className="mr-2" />
          <span className="font-semibold text-sm text-[#161616]">UMKM Giriwoyo</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-sm font-normal text-[#b4252b]">
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
          <Link href="/panduan-belanja" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Panduan Belanja
          </Link>
          <Link href="/kontak" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Kontak
          </Link>
        </nav>
        <div className="flex items-center">
          <MobileMenu currentPath="/" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-16 pb-20 text-center">
        <h1 className="text-5xl font-semibold text-[#161616] max-w-3xl mx-auto leading-tight">
          Monggo dipun sekseni asiling pakaryan lokal.
        </h1>
        <span className="subtitle-caption">Silakan saksikan hasil karya lokal kami</span>

        <div className="relative mt-10 mb-10 h-[240px]">
          <div className="food-gallery">
            <div className="food-image-container" style={{ transform: "rotate(-6deg)" }}>
              <Image
                src="/images/food-1.jpg"
                alt="Sate ayam dengan bumbu kacang"
                width={200}
                height={200}
                className="rounded-3xl shadow-lg object-cover"
              />
            </div>
            <div className="food-image-container" style={{ transform: "rotate(-3deg)" }}>
              <Image
                src="/images/food-2.jpg"
                alt="Tumis kangkung dengan cabai"
                width={200}
                height={200}
                className="rounded-3xl shadow-lg object-cover"
              />
            </div>
            <div className="food-image-container" style={{ transform: "rotate(0deg)" }}>
              <Image
                src="/images/food-3.jpg"
                alt="Nasi dengan ayam dan lalapan"
                width={200}
                height={200}
                className="rounded-3xl shadow-lg object-cover"
              />
            </div>
            <div className="food-image-container" style={{ transform: "rotate(3deg)" }}>
              <Image
                src="/images/food-4.jpg"
                alt="Nasi dengan lauk pauk di daun pisang"
                width={200}
                height={200}
                className="rounded-3xl shadow-lg object-cover"
              />
            </div>
            <div className="food-image-container" style={{ transform: "rotate(6deg)" }}>
              <Image
                src="/images/food-5.jpg"
                alt="Tumis kangkung dengan cabai"
                width={200}
                height={200}
                className="rounded-3xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>

        <p className="text-sm font-normal text-[#161616] mb-8">
          Lebih dari sekadar produk, ini adalah cerita, tradisi, dan semangat hangat dari setiap sudut Giriwoyo.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            href="/tentang-kami"
            className="bg-[#161616] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#000000] transition"
          >
            Tentang Kami
          </Link>
          <Link
            href="/katalog"
            className="bg-white text-[#161616] text-sm font-medium px-6 py-3 rounded-full border border-[#d9d9d9] hover:bg-[#f1f1f1] transition"
          >
            Jelajahi Katalog
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-[#161616] mb-6 leading-tight">
            Temukan & Dukung Produk Lokal Terbaik
          </h2>
          <p className="text-sm font-normal text-[#161616] mb-8 max-w-md">
            Jelajahi etalase digital kami dan temukan produk berkualitas yang menyimpan keunikan kearifan lokal dalam
            setiap kemasannya.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/katalog"
              className="bg-[#161616] text-white text-sm px-6 py-3 rounded-full hover:bg-[#000000] transition"
            >
              Lihat Semua Produk
            </Link>
            <Link
              href="/peta-umkm"
              className="bg-white text-[#161616] text-sm px-6 py-3 rounded-full border border-[#d9d9d9] hover:bg-[#f1f1f1] transition"
            >
              Lihat Peta UMKM
            </Link>
          </div>
        </div>
        <div className="relative h-[360px]">
          <div className="product-gallery">
            <div className="product-image-container" style={{ transform: "rotate(-6deg)" }}>
              <Image
                src="/images/product-1.jpg"
                alt="Sate ayam dengan bumbu kacang"
                width={200}
                height={200}
                className="rounded-3xl shadow-lg object-cover"
              />
            </div>
            <div className="product-image-container" style={{ transform: "rotate(0deg)" }}>
              <Image
                src="/images/product-2.jpg"
                alt="Tumis kangkung dengan cabai"
                width={200}
                height={200}
                className="rounded-3xl shadow-lg object-cover"
              />
            </div>
            <div className="product-image-container" style={{ transform: "rotate(6deg)" }}>
              <Image
                src="/images/product-3.jpg"
                alt="Nasi dengan ayam dan lalapan"
                width={200}
                height={200}
                className="rounded-3xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local Creation Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-[#161616] mb-10 leading-tight">Gerbang menuju kreasi lokal.</h2>
        <div className="rounded-3xl overflow-hidden h-[400px] relative">
          <Image src="/images/market.jpg" alt="Pasar tradisional Indonesia" fill className="object-cover" />
        </div>
      </section>

      {/* Unique Products Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-[#161616] mb-16 leading-tight">Inovasi Bertemu Tradisi</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="text-left">
            <div className="rounded-3xl overflow-hidden h-[300px] mb-6 relative">
              <Image
                src="/images/kelor-powder.webp"
                alt="Produk olahan kelor DMAYKEELOR"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Kreasi Modern Olahan Kelor</h3>
            <p className="text-sm font-normal text-[#161616] mb-4">
              Rasakan manfaat 'superfood' lokal dalam sajian modern yang lezat. Inovasi menyehatkan dari DMAYKEELOR yang
              siap memanjakan lidah Anda.
            </p>
            <Link
              href="/katalog"
              className="inline-block border border-[#d9d9d9] text-[#161616] text-sm px-6 py-2 rounded-full hover:bg-[#f1f1f1] transition"
            >
              Lihat Produk
            </Link>
          </div>

          <div className="text-left">
            <div className="rounded-3xl overflow-hidden h-[300px] mb-6 relative">
              <Image
                src="/images/balung-kethek.webp"
                alt="Jajanan Balung Kethek khas Giriwoyo"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Jajanan Legendaris Balung Kethek</h3>
            <p className="text-sm font-normal text-[#161616] mb-4">
              Cicipi gurihnya camilan otentik khas Giriwoyo dengan nama yang unik. Warisan kuliner dari Balung Kethek
              Ayu Pak Budi yang selalu dirindukan.
            </p>
            <Link
              href="/katalog"
              className="inline-block border border-[#d9d9d9] text-[#161616] text-sm px-6 py-2 rounded-full hover:bg-[#f1f1f1] transition"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
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
              <h4 className="font-medium mb-3 text-sm">Panduan Belanja</h4>
              <h4 className="font-medium mb-3 text-sm">Kontak</h4>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
