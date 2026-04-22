import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ImageWithFallback from "@/components/image-with-fallback"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { loadUmkmData } from "@/lib/load-umkm-data"

export const metadata: Metadata = {
  title: "Beranda",
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
      <Header currentPath="/" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl text-left">
            <h1 className="text-6xl md:text-7xl font-semibold text-[#161616] leading-[1.1] tracking-tighter text-balance">
              Monggo dipun sekseni asiling pakaryan lokal.
            </h1>
            <p className="subtitle-caption text-xl mt-4 text-[#b4252b]/80 font-medium italic">
              Silakan saksikan hasil karya lokal kami
            </p>
            <p className="text-lg font-normal text-[#161616]/70 mt-8 mb-10 max-w-lg leading-relaxed">
              Lebih dari sekadar produk, ini adalah cerita, tradisi, dan semangat hangat dari setiap sudut Giriwoyo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/katalog"
                className="bg-[#161616] text-white text-sm font-medium px-8 py-4 rounded-full hover:bg-black transition-all active:scale-95 text-center shadow-lg hover:shadow-xl"
              >
                Jelajahi Katalog
              </Link>
              <Link
                href="/tentang-kami"
                className="bg-transparent text-[#161616] text-sm font-medium px-8 py-4 rounded-full border border-[#161616]/20 hover:bg-[#161616]/5 transition-all active:scale-95 text-center"
              >
                Tentang Kami
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] hidden lg:block">
            <div className="absolute top-0 right-0 w-64 h-64 rotate-3 hover:rotate-0 transition-transform duration-500 z-30 group">
              <Image
                src="/images/food-1.jpg"
                alt="Sate ayam"
                fill
                className="rounded-3xl shadow-2xl object-cover border-4 border-white transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute top-20 right-40 w-56 h-56 -rotate-6 hover:rotate-0 transition-transform duration-500 z-20 group">
              <Image
                src="/images/food-3.jpg"
                alt="Nasi ayam"
                fill
                className="rounded-3xl shadow-2xl object-cover border-4 border-white transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 right-10 w-72 h-72 rotate-12 hover:rotate-0 transition-transform duration-500 z-10 group">
              <Image
                src="/images/food-5.jpg"
                alt="Masakan lokal"
                fill
                className="rounded-3xl shadow-2xl object-cover border-4 border-white transition-transform group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Editorial Grid */}
      <section className="bg-[#161616] text-[#fcfbf6] py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter leading-tight text-balance">
                Temukan & Dukung Produk Lokal Terbaik
              </h2>
              <p className="text-xl text-[#fcfbf6]/60 mt-6 leading-relaxed max-w-lg">
                Jelajahi etalase digital kami dan temukan produk berkualitas yang menyimpan keunikan kearifan lokal.
              </p>
            </div>
            <Link
              href="/katalog"
              className="group flex items-center gap-3 text-lg font-medium hover:text-[#b4252b] transition-colors"
            >
              Lihat Semua Produk
              <span className="w-12 h-12 flex items-center justify-center rounded-full border border-[#fcfbf6]/20 group-hover:border-[#b4252b] transition-all group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 relative h-[450px] rounded-[2rem] overflow-hidden group cursor-pointer">
              <Image
                src="/images/market.jpg"
                alt="Pasar lokal"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-10 left-10">
                <span className="px-4 py-1 bg-[#b4252b] text-white text-xs font-bold rounded-full uppercase tracking-widest">
                  Featured
                </span>
                <h3 className="text-3xl font-bold mt-4">Kearifan Lokal Giriwoyo</h3>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-8">
              <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer bg-[#262626]">
                <Image
                  src="/images/product-1.jpg"
                  alt="Produk 1"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                  <span className="text-sm font-medium bg-[#fcfbf6] text-[#161616] px-6 py-2 rounded-full">
                    Detail Produk
                  </span>
                </div>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer bg-[#262626]">
                <Image
                  src="/images/product-2.jpg"
                  alt="Produk 2"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                  <span className="text-sm font-medium bg-[#fcfbf6] text-[#161616] px-6 py-2 rounded-full">
                    Detail Produk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Products Section - Asymmetrical Layout */}
      <section className="container mx-auto px-6 py-32">
        <div className="flex items-center gap-4 mb-20">
          <div className="h-px flex-1 bg-[#161616]/10" />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-center">Inovasi Bertemu Tradisi</h2>
          <div className="h-px flex-1 bg-[#161616]/10" />
        </div>

        <div className="space-y-40">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 relative aspect-[4/3] w-full group">
              <div className="absolute -inset-4 bg-[#b4252b]/5 rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl">
                <Image src="/images/kelor-powder.webp" alt="Olahan Kelor" fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1 lg:pl-10">
              <span className="text-[#b4252b] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                Local Superfood
              </span>
              <h3 className="text-4xl font-bold mb-6 tracking-tight leading-tight">Kreasi Modern Olahan Kelor</h3>
              <p className="text-lg text-[#161616]/70 leading-relaxed mb-8">
                Rasakan manfaat 'superfood' lokal dalam sajian modern yang lezat. Inovasi menyehatkan dari DMAYKEELOR
                yang siap memanjakan lidah Anda. Tiap butir serbuk kelor diproses dengan standar kualitas tinggi untuk
                menjaga nutrisi alaminya.
              </p>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 group font-semibold text-[#161616]"
              >
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#161616] after:origin-right after:scale-x-0 group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform">
                  Pelajari Lebih Lanjut
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
            <div className="flex-1 relative aspect-[4/3] w-full group">
              <div className="absolute -inset-4 bg-[#161616]/5 rounded-[2.5rem] rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl">
                <Image src="/images/balung-kethek.webp" alt="Balung Kethek" fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1 lg:pr-10">
              <span className="text-[#161616]/40 font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
                Heritage Snack
              </span>
              <h3 className="text-4xl font-bold mb-6 tracking-tight leading-tight">Jajanan Legendaris Balung Kethek</h3>
              <p className="text-lg text-[#161616]/70 leading-relaxed mb-8">
                Cicipi gurihnya camilan otentik khas Giriwoyo dengan nama yang unik. Warisan kuliner dari Balung Kethek
                Ayu Pak Budi yang selalu dirindukan, diolah secara tradisional untuk rasa yang tak terlupakan.
              </p>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 group font-semibold text-[#161616]"
              >
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#161616] after:origin-right after:scale-x-0 group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform">
                  Lihat Katalog Jajanan
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-32">
        <div className="bg-[#b4252b] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-150 duration-700" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8 leading-tight max-w-3xl mx-auto">
              Siap Menemukan Keajaiban Lokal Giriwoyo?
            </h2>
            <Link
              href="/katalog"
              className="bg-white text-[#b4252b] text-lg font-bold px-10 py-5 rounded-full hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transition-all active:scale-95 inline-block"
            >
              Mulai Menjelajah Sekarang
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
