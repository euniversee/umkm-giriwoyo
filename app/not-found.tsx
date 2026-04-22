import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="bg-[#fcfbf6] min-h-screen flex flex-col">
      <Header currentPath="" />
      
      <main className="flex-grow flex items-center justify-center py-24">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[#b4252b] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Error 404</span>
          <h1 className="text-7xl font-bold text-[#161616] tracking-tighter mb-6 leading-tight">
            Halaman Tidak <br /> Ditemukan
          </h1>
          <p className="text-xl text-[#161616]/60 max-w-md mx-auto leading-relaxed mb-12">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan ke alamat lain.
          </p>
          
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 bg-[#161616] text-white px-8 py-4 rounded-full hover:bg-black transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
