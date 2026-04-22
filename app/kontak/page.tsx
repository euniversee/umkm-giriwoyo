"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"

export default function Kontak() {
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
    <div className="bg-white min-h-screen">
      <Header currentPath="/kontak" />

      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[#b4252b] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
          <h1 className="text-6xl font-bold text-[#161616] tracking-tighter mb-6 leading-tight">Hubungi Kami</h1>
          <p className="text-xl text-[#161616]/60 max-w-2xl mx-auto leading-relaxed">
            Ada pertanyaan atau ingin berkolaborasi? Kami siap membantu dan mendengar ide-ide cemerlang Anda.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#161616] mb-8">Informasi Kontak</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[#d9d9d9] rounded-full hover:border-[#b4252b] transition">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Alamat</h3>
                  <p className="text-sm text-[#161616]">
                    Desa Giriwoyo, Kecamatan Giriwoyo
                    <br />
                    Kabupaten Wonogiri, Jawa Tengah
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[#d9d9d9] rounded-full hover:border-[#b4252b] transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Telepon</h3>
                  <p className="text-sm text-[#161616]">+62 831-3908-7647</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[#d9d9d9] rounded-full hover:border-[#b4252b] transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 9.00005L10.2 13.65C11.2667 14.45 12.7333 14.45 13.8 13.65L20 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 9.17681C3 8.45047 3.39378 7.78123 4.02871 7.42849L11.0287 3.5396C11.6328 3.20402 12.3672 3.20402 12.9713 3.5396L19.9713 7.42849C20.6062 7.78123 21 8.45047 21 9.17681V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V9.17681Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <p className="text-sm text-[#161616]">imapresgiriwoyo2@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">Media Sosial</h3>
              <div className="flex space-x-4">
                <Link href="https://www.instagram.com/umkm.gio/" className="text-[#161616] hover:text-[#b4252b]">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#d9d9d9] rounded-full hover:border-[#b4252b] transition">
                    <Image src="/images/instagram.svg" alt="Instagram" width={20} height={20} />
                  </div>
                </Link>
                <Link href="https://www.instagram.com/ofc.mapresgio/" className="text-[#161616] hover:text-[#b4252b]">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#d9d9d9] rounded-full hover:border-[#b4252b] transition">
                    <Image src="/images/instagram.svg" alt="Instagram" width={20} height={20} />
                  </div>
                </Link>
              </div>
              <div className="flex space-x-4 mt-2 text-xs text-[#161616]">
                <span>@umkmgio</span>
                <span>@ofcmapresgio</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#161616] mb-8">Kirim Pesan</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#161616] mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b4252b] focus:border-transparent"
                  placeholder="Masukkan nama lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#161616] mb-2">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b4252b] focus:border-transparent"
                  placeholder="Masukkan subjek pesan"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#161616] mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b4252b] focus:border-transparent resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#161616] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#000000] transition"
              >
                Kirim Pesan via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
