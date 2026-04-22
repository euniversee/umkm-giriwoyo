import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import MobileMenu from "@/components/mobile-menu"

export const metadata: Metadata = {
  title: "Tentang Kami | UMKM Giriwoyo",
  description: "Kisah Imapres Kelbang Giriwoyo dalam mendukung pertumbuhan UMKM lokal melalui platform digital",
}

export default function TentangKami() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <header className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <Image src="/images/logo.svg" alt="UMKM Giriwoyo Logo" width={33} height={24} className="mr-2" />
              <span className="font-semibold text-sm text-[#161616]">UMKM Giriwoyo</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Beranda
          </Link>
          <Link href="/tentang-kami" className="text-sm font-normal text-[#b4252b]">
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
          <MobileMenu currentPath="/tentang-kami" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#f8f8f8] py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-semibold text-[#161616] mb-4">Semangat Muda untuk Wajah Baru UMKM Giriwoyo</h1>
          <p className="text-lg text-[#161616] max-w-3xl mx-auto">
            Menjembatani karya lokal dengan pasar yang lebih luas
          </p>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg mb-8">
            <Image
              src="/images/foto-bersama-3.webp"
              alt="Tim Imapres Kelbang Giriwoyo dalam kegiatan penanaman bersama masyarakat"
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-sm text-[#666] italic">Tim Imapres Kelbang Giriwoyo</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Siapa Kami */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-[#161616] mb-6">Siapa Kami?</h2>
            <p className="text-[#161616] mb-6 leading-relaxed text-lg">
              Selamat datang di etalase digital UMKM Giriwoyo!
            </p>
            <p className="text-[#161616] mb-6 leading-relaxed">
              Kami adalah <strong>Imapres Kelbang Giriwoyo</strong>, sebuah Kelompok Pengembangan (Kelbang) yang
              merupakan bagian dari Ikatan Mahasiswa Berprestasi (Imapres) Wonogiri. Kami adalah sekelompok
              mahasiswa-mahasiswi asal Kecamatan Giriwoyo yang memiliki semangat dan dedikasi untuk berkontribusi secara
              nyata bagi Giriwoyo.
            </p>
            <p className="text-[#161616] leading-relaxed">
              Sebagai generasi muda, kami percaya bahwa energi dan ide-ide baru dapat menjadi motor penggerak kemajuan,
              terutama bagi para pahlawan ekonomi lokal kita yaitu para pelaku UMKM.
            </p>
          </div>

          {/* Mengapa Kami Ada */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-[#161616] mb-6">Mengapa Kami Ada?</h2>
            <p className="text-[#161616] mb-6 leading-relaxed">
              Giriwoyo adalah rumah bagi puluhan pelaku usaha mikro, kecil, dan menengah (UMKM) dengan produk-produk
              yang luar biasa yang penuh dengan cita rasa otentik dan dibuat dengan ketulusan. Namun, kami melihat
              banyak dari potensi ini belum bersinar secara maksimal di panggung digital yang semakin ramai.
            </p>
            <p className="text-[#161616] leading-relaxed">
              Berangkat dari sinilah, program kerja dan misi kami terbentuk yaitu{" "}
              <strong>menjadi jembatan antara kekayaan produk lokal Giriwoyo dengan pasar yang lebih luas.</strong> Kami
              ingin memastikan setiap karya hebat menemukan panggungnya, dan setiap cerita di balik produk dapat
              didengar oleh dunia.
            </p>
          </div>

          {/* Apa yang Kami Lakukan */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-[#161616] mb-6">Apa yang Kami Lakukan?</h2>
            <p className="text-[#161616] mb-8 leading-relaxed">
              Untuk mewujudkan misi tersebut, kami menjalankan beberapa program utama:
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-[#f8f8f8] p-6 rounded-3xl">
                <div className="w-12 h-12 bg-[#b4252b] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#161616] mb-3">Membangun Etalase Digital</h3>
                <p className="text-[#666] leading-relaxed">
                  Kami merancang dan mengelola website ini sebagai 'rumah' bagi produk-produk terbaik Giriwoyo.
                  Tujuannya agar produk-produk ini dapat diakses dengan mudah oleh siapa saja, kapan saja, dan di mana
                  saja.
                </p>
              </div>

              <div className="bg-[#f8f8f8] p-6 rounded-3xl">
                <div className="w-12 h-12 bg-[#b4252b] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#161616] mb-3">Promosi Melalui Media Sosial</h3>
                <p className="text-[#666] leading-relaxed">
                  Kami memanfaatkan kekuatan Instagram untuk menceritakan kisah di balik setiap produk, menampilkan
                  keunikannya secara visual, dan membangun komunitas para pecinta produk lokal Giriwoyo.
                </p>
              </div>

              <div className="bg-[#f8f8f8] p-6 rounded-3xl">
                <div className="w-12 h-12 bg-[#b4252b] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#161616] mb-3">Pendampingan Langsung</h3>
                <p className="text-[#666] leading-relaxed">
                  Kami tidak hanya bekerja di belakang layar. Tim kami secara aktif mengunjungi para pelaku UMKM,
                  berdiskusi, dan membantu mereka yang belum terbiasa dengan dunia digital.
                </p>
              </div>
            </div>
          </div>

          {/* Tim di Balik Layar */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-[#161616] mb-6">Tim di Balik Layar</h2>
            <p className="text-[#161616] leading-relaxed">
              Di balik proyek ini adalah tim mahasiswa dari berbagai disiplin ilmu, yang dipersatukan oleh satu cinta
              yang sama untuk Giriwoyo. Seluruh energi, ide, dan waktu kami curahkan untuk keberhasilan para pelaku
              UMKM, karena kami percaya kemajuan mereka adalah kemajuan kita bersama.
            </p>
          </div>

          {/* Visi Misi */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#f8f8f8] p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold text-[#161616] mb-4">Visi</h3>
              <p className="text-[#161616] leading-relaxed">
                Menjadi platform terdepan yang mendukung pertumbuhan UMKM lokal di Indonesia, khususnya di wilayah
                Giriwoyo, melalui inovasi digital dan pemberdayaan komunitas.
              </p>
            </div>
            <div className="bg-[#f8f8f8] p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold text-[#161616] mb-4">Misi</h3>
              <p className="text-[#161616] leading-relaxed">
                Memfasilitasi UMKM lokal untuk memasarkan produk mereka, meningkatkan kualitas produk, memperluas
                jangkauan pasar, dan membangun ekosistem ekonomi digital yang berkelanjutan.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-[#b4252b] text-white p-8 rounded-3xl text-center">
            <h2 className="text-3xl font-semibold mb-4">Mari Dukung Misi Kami!</h2>
            <p className="text-lg mb-6 opacity-90">
              Cara terbaik untuk mendukung kami adalah dengan mendukung langsung para pelaku UMKM itu sendiri.
            </p>
            <p className="mb-8 opacity-90">
              Setiap pembelian Anda adalah apresiasi tertinggi bagi karya lokal dan dukungan nyata bagi mimpi-mimpi
              mereka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/katalog"
                className="bg-white text-[#b4252b] px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Jelajahi Katalog
              </Link>
              <Link
                href="/peta-umkm"
                className="border-2 border-white text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-[#b4252b] transition-colors"
              >
                Lihat Peta UMKM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fcfbf6] py-16 mt-12 border-t border-[#f1f1f1]">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <h3 className="font-bold text-lg mb-2">Platform UMKM kita.</h3>
            <p className="text-sm font-normal max-w-md">
              Mendukung pertumbuhan UMKM lokal dengan menghadirkan produk berkualitas untuk semua
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
}
