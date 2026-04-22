import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#161616] text-[#fcfbf6] pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 pb-20 border-b border-white/10">
          <div>
            <div className="flex items-center mb-8">
              <div className="bg-white p-2 rounded-xl mr-4">
                <Image src="/images/logo.svg" alt="Logo" width={24} height={24} />
              </div>
              <span className="text-2xl font-bold tracking-tighter">UMKM Giriwoyo</span>
            </div>
            <p className="text-xl text-[#fcfbf6]/60 leading-relaxed max-w-md">
              Sebuah jembatan digital untuk mendukung pertumbuhan UMKM lokal, melestarikan tradisi, dan menghadirkan
              produk berkualitas bagi semua.
            </p>
            <div className="flex gap-4 mt-8">
              {[
                { name: "Instagram @umkmgio", href: "https://www.instagram.com/umkm.gio/" },
                { name: "Instagram @ofcmapresgio", href: "https://www.instagram.com/ofc.mapresgio/" },
              ].map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-[#b4252b] hover:bg-[#b4252b] transition-all"
                  aria-label={social.name}
                >
                  <Image src="/images/instagram.svg" alt="Instagram" width={20} height={20} className="brightness-0 invert" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="font-bold text-lg mb-6 tracking-tight">Navigasi</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-[#fcfbf6]/60 hover:text-white transition-colors">Beranda</Link></li>
                <li><Link href="/tentang-kami" className="text-[#fcfbf6]/60 hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="/katalog" className="text-[#fcfbf6]/60 hover:text-white transition-colors">Katalog Produk</Link></li>
                <li><Link href="/peta-umkm" className="text-[#fcfbf6]/60 hover:text-white transition-colors">Peta UMKM</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 tracking-tight">Halaman</h4>
              <ul className="space-y-4">
                <li><Link href="/panduan-belanja" className="text-[#fcfbf6]/60 hover:text-white transition-colors">Panduan Belanja</Link></li>
                <li><Link href="/kontak" className="text-[#fcfbf6]/60 hover:text-white transition-colors">Kontak Kami</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold text-lg mb-6 tracking-tight">Lokasi</h4>
              <p className="text-[#fcfbf6]/60 leading-relaxed">
                Kecamatan Giriwoyo,<br />
                Kabupaten Wonogiri,<br />
                Jawa Tengah, Indonesia
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[#fcfbf6]/40 text-sm">
          <p>© 2026 Platform UMKM Lokal Giriwoyo. Kabeh Hak Reksa.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
