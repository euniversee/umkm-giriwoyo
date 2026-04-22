"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"

export default function KontakClient() {
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Phone number from contact info (removing + and spaces)
    const phoneNumber = "6283139087647"

    // Simple validation
    if (!name || !subject || !message) {
      alert("Harap isi semua kolom terlebih dahulu.")
      return
    }

    // Create WhatsApp message template
    const waMessage = `Halo, saya ingin bertanya.

*Nama Lengkap:* ${name}
*Subjek:* ${subject}
*Pesan:* 
${message}`

    // Create WhatsApp URL
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`

    // Open WhatsApp in new tab
    window.open(url, "_blank")
  }

  return (
    <div className="bg-[#fcfbf6] min-h-screen">
      <Header currentPath="/kontak" />

      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="lg:grid lg:grid-cols-[1.2fr,0.8fr] gap-20 items-center">
            <div>
              <span className="text-[#b4252b] font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">Inquiries</span>
              <h1 className="text-7xl md:text-9xl font-bold text-[#161616] tracking-tighter leading-[0.85] mb-12">
                 Mari Bicara <br />
                 Karya Lokal.
              </h1>
              <p className="text-2xl text-[#161616]/60 leading-relaxed font-medium max-w-xl">
                Terbuka untuk diskusi, kolaborasi, atau sekadar sapaan hangat untuk para pejuang ekonomi Giriwoyo.
              </p>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-full aspect-square relative rounded-[40px] overflow-hidden">
                <Image 
                  src="/images/logo.svg" 
                  alt="Decorative Logo" 
                  fill 
                  className="object-contain opacity-5 grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 pb-48">
        <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-24 items-start">
          {/* Contact Info */}
          <div className="order-2 lg:order-1 space-y-16">
            <div>
              <h3 className="text-xs font-bold text-[#b4252b] uppercase tracking-widest mb-10">Titik Temu</h3>
              <div className="space-y-12">
                <div className="group flex items-start gap-8">
                  <div className="w-14 h-14 rounded-2xl border border-[#161616]/10 flex items-center justify-center shrink-0 group-hover:bg-[#161616] group-hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#161616] uppercase tracking-tighter mb-2">Lokasi Utama</h4>
                    <p className="text-lg text-[#161616]/60 leading-relaxed">
                      Desa Giriwoyo, Kecamatan Giriwoyo<br />
                      Kabupaten Wonogiri, Jawa Tengah
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-8">
                  <div className="w-14 h-14 rounded-2xl border border-[#161616]/10 flex items-center justify-center shrink-0 group-hover:bg-[#161616] group-hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#161616] uppercase tracking-tighter mb-2">Saluran Suara</h4>
                    <p className="text-lg text-[#161616]/60 leading-relaxed">
                      +62 831-3908-7647
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-8">
                  <div className="w-14 h-14 rounded-2xl border border-[#161616]/10 flex items-center justify-center shrink-0 group-hover:bg-[#161616] group-hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#161616] uppercase tracking-tighter mb-2">Korespondensi</h4>
                    <p className="text-lg text-[#161616]/60 leading-relaxed italic underline">
                      imapresgiriwoyo2@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-[#161616]/5">
              <h3 className="text-xs font-bold text-[#b4252b] uppercase tracking-widest mb-8">Ikuti Jejak Kami</h3>
              <div className="flex gap-6">
                 <Link href="https://www.instagram.com/umkm.gio/" className="group relative">
                    <div className="w-12 h-12 rounded-full border border-[#161616]/10 flex items-center justify-center group-hover:bg-[#b4252b] group-hover:border-[#b4252b] transition-all">
                      <Image src="/images/instagram.svg" alt="Instagram" width={18} height={18} className="group-hover:invert transition-all" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">@umkmgio</span>
                 </Link>
                 <Link href="https://www.instagram.com/ofc.mapresgio/" className="group relative">
                    <div className="w-12 h-12 rounded-full border border-[#161616]/10 flex items-center justify-center group-hover:bg-[#b4252b] group-hover:border-[#b4252b] transition-all">
                      <Image src="/images/instagram.svg" alt="Instagram" width={18} height={18} className="group-hover:invert transition-all" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">@mapresgio</span>
                 </Link>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white p-12 rounded-[60px] shadow-sm border border-[#161616]/5 mb-12">
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#161616]/40 block ml-2">Identitas Anda</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-[#fcfbf6] px-8 py-6 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-[#b4252b] focus:bg-white transition-all text-lg font-medium border-none"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#161616]/40 block ml-2">Perihal</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full bg-[#fcfbf6] px-8 py-6 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-[#b4252b] focus:bg-white transition-all text-lg font-medium border-none"
                    placeholder="Apa yang ingin dibicarakan?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#161616]/40 block ml-2">Pesan Anda</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full bg-[#fcfbf6] px-8 py-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#b4252b] focus:bg-white transition-all text-lg font-medium resize-none border-none"
                    placeholder="Tuliskan pesan menarik Anda di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full group bg-[#161616] text-white flex items-center justify-center gap-4 py-8 rounded-[32px] text-lg font-bold hover:bg-[#b4252b] transition-all duration-500 shadow-xl"
                >
                  Terhubung via WhatsApp
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-2 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            </div>
            <p className="text-center text-[#161616]/40 text-xs px-12">
              Kami biasanya merespons dalam waktu kurang dari 24 jam. Terima kasih telah menghubungi UMKM Giriwoyo.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
