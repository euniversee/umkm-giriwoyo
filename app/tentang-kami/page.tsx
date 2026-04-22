import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kisah Imapres Kelbang Giriwoyo dalam mendukung pertumbuhan UMKM lokal melalui platform digital",
}

export default function TentangKami() {
  return (
    <div className="bg-[#fcfbf6] min-h-screen">
      <Header currentPath="/tentang-kami" />

      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="lg:grid lg:grid-cols-[1.2fr,0.8fr] gap-20 items-end">
            <div>
              <span className="text-[#b4252b] font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">The Human Story</span>
              <h1 className="text-7xl md:text-9xl font-bold text-[#161616] tracking-tighter leading-[0.85] mb-12">
                Semangat Muda, <br />
                Wajah Baru <br />
                Giriwoyo.
              </h1>
            </div>
            <div className="lg:mb-4">
              <p className="text-2xl text-[#161616]/60 leading-relaxed font-medium">
                Menjembatani karya lokal dengan pasar global melalui dedikasi kolektif dan inovasi digital yang tulus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Section */}
      <section className="container mx-auto px-6 pb-32">
        <div className="relative group">
          <div className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="/images/foto-bersama-3.webp"
              alt="Tim Imapres Kelbang Giriwoyo"
              width={2400}
              height={1000}
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-12 rounded-[40px] shadow-xl max-w-sm hidden lg:block border border-[#161616]/5">
            <p className="text-[#161616] font-medium leading-relaxed italic">
              "Kami percaya bahwa energi muda adalah motor penggerak paling kuat untuk kemajuan ekonomi lokal."
            </p>
            <p className="text-[#b4252b] text-[10px] font-bold uppercase tracking-widest mt-6">— Tim Imapres Giriwoyo</p>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="container mx-auto px-6 pb-48">
        <div className="grid lg:grid-cols-2 gap-32 items-start">
          {/* Section 1 */}
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-bold text-[#161616] tracking-tighter mb-8 italic leading-tight">Siapa Kami?</h2>
              <p className="text-xl text-[#161616]/80 leading-relaxed indent-12">
                Kami adalah <strong>Imapres Kelbang Giriwoyo</strong>—sebuah kolektif mahasiswa berprestasi yang berakar dari tanah Giriwoyo. Kami bukan sekadar kelompok studi, melainkan manifestasi dari kepedulian putra-putri daerah untuk tanah kelahiran.
              </p>
            </div>
            <div className="p-12 bg-white rounded-[40px] shadow-sm border border-[#161616]/5">
               <p className="text-[#161616]/70 leading-relaxed">
                Sebagai generasi digital, kami merasa terpanggil untuk memberdayakan pahlawan ekonomi lokal kita: para pelaku UMKM yang selama ini menjaga nyala api tradisi dan ekonomi Giriwoyo di setiap sudut jalan dan pasar.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:pt-48 space-y-12">
            <div className="flex justify-end">
              <div className="max-w-md">
                <h2 className="text-5xl font-bold text-[#161616] tracking-tighter mb-8 leading-tight text-right">Misi Kami.</h2>
                <p className="text-lg text-[#161616]/80 leading-relaxed text-right">
                  Giriwoyo menyimpan ribuan cita rasa otentik yang belum terjamah teknologi. Kami hadir sebagai **jembatan digital** untuk memastikan setiap produk UMKM Giriwoyo memiliki panggung yang layak di era modern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Section */}
      <section className="bg-[#161616] text-[#fcfbf6] py-48 overflow-hidden rounded-[80px] mx-6">
        <div className="container mx-auto px-12">
          <span className="text-[#b4252b] font-bold text-[10px] uppercase tracking-[0.4em] mb-16 block text-center">Tiga Pilar Pergerakan</span>
          
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="p-12 border border-white/10 rounded-[40px] hover:bg-white/5 transition-colors group">
              <span className="text-6xl font-bold text-white/10 block mb-8 group-hover:text-[#b4252b] transition-colors">01</span>
              <h3 className="text-2xl font-bold mb-6 italic">Etalase Digital</h3>
              <p className="text-white/60 leading-relaxed">
                Membangun platform kurasi yang memungkinkan produk lokal diakses tanpa batas jarak dan waktu.
              </p>
            </div>

            <div className="p-12 border border-white/10 rounded-[40px] hover:bg-white/5 transition-colors group lg:translate-y-12">
              <span className="text-6xl font-bold text-white/10 block mb-8 group-hover:text-[#b4252b] transition-colors">02</span>
              <h3 className="text-2xl font-bold mb-6 italic">Amplifikasi Sosial</h3>
              <p className="text-white/60 leading-relaxed">
                Menceritakan narasi di balik setiap produk melalui visual kreatif dan strategi media sosial yang modern.
              </p>
            </div>

            <div className="p-12 border border-white/10 rounded-[40px] hover:bg-white/5 transition-colors group lg:translate-y-24">
              <span className="text-6xl font-bold text-white/10 block mb-8 group-hover:text-[#b4252b] transition-colors">03</span>
              <h3 className="text-2xl font-bold mb-6 italic">Pendampingan</h3>
              <p className="text-white/60 leading-relaxed">
                Interaksi langsung dengan pelaku UMKM—dari literasi digital hingga optimalisasi kemasan produk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-48 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-8xl font-bold text-[#161616] tracking-tighter leading-none mb-12">Visi & <br /> Tujuan.</h2>
          </div>
          <div className="lg:w-1/2 grid gap-12">
            <div className="p-12 bg-white rounded-[40px] shadow-sm border border-[#161616]/5">
              <h4 className="text-[#b4252b] text-[10px] font-bold uppercase tracking-widest mb-6">Masa Depan</h4>
              <p className="text-2xl text-[#161616] font-medium leading-tight">
                Menjadi katalisator utama transformasi ekonomi digital bagi UMKM di Wonogiri Selatan.
              </p>
            </div>
            <div className="p-12 bg-white rounded-[40px] shadow-sm border border-[#161616]/5">
              <h4 className="text-[#b4252b] text-[10px] font-bold uppercase tracking-widest mb-6">Strategi</h4>
              <p className="text-lg text-[#161616]/60 leading-relaxed">
                Membangun ekosistem yang mandiri melalui digitalisasi pasar, peningkatan standarisasi kualitas, dan penguatan identitas brand lokal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-32">
        <div className="bg-[#b4252b] rounded-[60px] p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-none">
              Jadilah Bagian <br /> Dari Perubahan.
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
              Dukungan Anda—baik sebagai pembeli maupun mitra—adalah investasi bagi mimpi dan keberlanjutan ekonomi masyarakat Giriwoyo.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/katalog"
                className="bg-white text-[#b4252b] px-12 py-5 rounded-3xl text-sm font-bold hover:bg-gray-100 transition-all shadow-xl"
              >
                Lihat Katalog Produk
              </Link>
              <Link
                href="/peta-umkm"
                className="bg-[#161616] text-white px-12 py-5 rounded-3xl text-sm font-bold hover:bg-black transition-all shadow-xl"
              >
                 Ekplorasi Peta UMKM
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
