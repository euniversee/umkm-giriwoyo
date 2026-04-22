"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import MobileMenu from "@/components/mobile-menu"

// Koordinat pusat Giriwoyo
const giriwoyoCenter = [-8.03037, 110.93762]

export default function PetaUMKMClient() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [umkmLocations, setUmkmLocations] = useState([])
  const [loading, setLoading] = useState(true)

  // Load location data from updated CSV
  const loadLocationData = async () => {
    try {
      const response = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UMKM_Giriwoyo_Merged%20-%20UMKM_Giriwoyo_Merged.csv-HoVxuTq4Smz9uABt0C2Ppmx2eBsNzQ.csv",
        { cache: "no-store" },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const csvText = await response.text()
      const lines = csvText.split("\n")

      if (lines.length < 2) {
        throw new Error("CSV file is empty or invalid")
      }

      const locations = []

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        try {
          // Parse CSV line with proper quote handling
          const values = parseCSVLine(line)
          if (values.length >= 6) {
            const namaUsaha = values[0].replace(/"/g, "")
            const alamat = values[1].replace(/"/g, "")
            const koordinat = values[2].replace(/"/g, "")

            if (namaUsaha && koordinat && koordinat !== "#") {
              const coords = koordinat.split(",").map((coord) => coord.trim())
              if (coords.length === 2) {
                const lat = Number.parseFloat(coords[0])
                const lng = Number.parseFloat(coords[1])

                if (!isNaN(lat) && !isNaN(lng)) {
                  // Parse cdn_links for image
                  let cdnLinks = []
                  const cdnLinksStr = values[5]
                  if (cdnLinksStr && cdnLinksStr !== "#") {
                    try {
                      const cleanCdnStr = cdnLinksStr.replace(/'/g, '"').replace(/\n/g, "").trim()
                      cdnLinks = JSON.parse(cleanCdnStr)
                    } catch (e) {
                      cdnLinks = ["/placeholder.svg"]
                    }
                  }

                  locations.push({
                    id: i,
                    name: namaUsaha,
                    category: getCategoryFromName(namaUsaha),
                    address: alamat || "Giriwoyo, Wonogiri",
                    lat: lat,
                    lng: lng,
                    image: cdnLinks.length > 0 ? cdnLinks[0] : getImageFromName(namaUsaha),
                  })
                }
              }
            }
          }
        } catch (error) {
          console.warn(`Error parsing location line ${i}:`, error)
          continue
        }
      }

      setUmkmLocations(locations)
      setLoading(false)
    } catch (error) {
      console.error("Error loading location data:", error)
      setLoading(false)
    }
  }

  // Helper function to parse CSV line with proper quote handling
  const parseCSVLine = (line: string): string[] => {
    const result = []
    let current = ""
    let inQuotes = false
    let i = 0

    while (i < line.length) {
      const char = line[i]

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i += 2
        } else {
          inQuotes = !inQuotes
          i++
        }
      } else if (char === "," && !inQuotes) {
        result.push(current)
        current = ""
        i++
      } else {
        current += char
        i++
      }
    }

    result.push(current)
    return result
  }

  // Helper function to determine category from name
  const getCategoryFromName = (name) => {
    const nameLower = name.toLowerCase()
    if (
      nameLower.includes("warung") ||
      nameLower.includes("peyek") ||
      nameLower.includes("intip") ||
      nameLower.includes("donat") ||
      nameLower.includes("nugget") ||
      nameLower.includes("balung") ||
      nameLower.includes("karak") ||
      nameLower.includes("tempe") ||
      nameLower.includes("mete") ||
      nameLower.includes("selar") ||
      nameLower.includes("kue") ||
      nameLower.includes("rambak") ||
      nameLower.includes("kripik") ||
      nameLower.includes("roti") ||
      nameLower.includes("snack") ||
      nameLower.includes("cake") ||
      nameLower.includes("opak") ||
      nameLower.includes("jajanan")
    ) {
      return "Makanan"
    } else if (
      nameLower.includes("jamu") ||
      nameLower.includes("sari") ||
      nameLower.includes("keelor") ||
      nameLower.includes("dmaykeelor")
    ) {
      return "Kesehatan"
    } else if (nameLower.includes("toko") || nameLower.includes("kelontong")) {
      return "Kebutuhan Sehari-hari"
    } else if (nameLower.includes("berkah") || nameLower.includes("embun")) {
      return "Lainnya"
    }
    return "Makanan" // default
  }

  // Helper function to get appropriate image
  const getImageFromName = (name) => {
    const nameLower = name.toLowerCase()
    if (nameLower.includes("balung")) {
      return "/images/balung-kethek.webp"
    } else if (nameLower.includes("keelor") || nameLower.includes("dmaykeelor")) {
      return "/images/kelor-powder.webp"
    } else if (nameLower.includes("warung") || nameLower.includes("sayur")) {
      return "/images/food-2.jpg"
    } else if (nameLower.includes("jamu")) {
      return "/images/food-3.jpg"
    } else if (nameLower.includes("toko") || nameLower.includes("kelontong")) {
      return "/images/product-1.jpg"
    } else if (nameLower.includes("peyek")) {
      return "/images/food-4.jpg"
    } else if (nameLower.includes("cemilan") || nameLower.includes("kriuk")) {
      return "/images/product-2.jpg"
    } else if (nameLower.includes("donat") || nameLower.includes("nugget")) {
      return "/images/product-3.jpg"
    } else if (nameLower.includes("kue") || nameLower.includes("cake")) {
      return "/images/batik-1.jpg"
    } else if (nameLower.includes("rambak")) {
      return "/images/batik-2.jpg"
    }
    return "/images/food-1.jpg" // default
  }

  useEffect(() => {
    loadLocationData()
  }, [])

  useEffect(() => {
    // Load OpenStreetMap via Leaflet
    const loadMap = async () => {
      if (typeof window !== "undefined" && !mapInstanceRef.current && umkmLocations.length > 0) {
        const L = await import("leaflet")
        await import("leaflet/dist/leaflet.css")

        // Fix icon paths
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        })

        if (mapRef.current && !mapInstanceRef.current) {
          // Initialize map with Giriwoyo center
          mapInstanceRef.current = L.map(mapRef.current).setView(giriwoyoCenter, 13)

          // Add OpenStreetMap tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstanceRef.current)

          // Add markers for UMKM locations and collect them in an array
          const markers = umkmLocations.map((location) => {
            const marker = L.marker([location.lat, location.lng]).addTo(mapInstanceRef.current)
            marker.bindPopup(`
              <div style="width: 200px">
                <strong>${location.name}</strong><br>
                <span>${location.category}</span><br>
                <span>${location.address}</span><br>
                <small>Lat: ${location.lat}, Lng: ${location.lng}</small>
              </div>
            `)
            return marker
          })

          // Create a feature group and fit bounds to show all markers
          if (markers.length > 0) {
            const group = new L.featureGroup(markers)
            mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [50, 50] })
          }
        }
      }
    }

    loadMap()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [umkmLocations])

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
          <Link href="/tentang-kami" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Tentang Kami
          </Link>
          <Link href="/katalog" className="text-sm font-normal text-[#161616] hover:text-[#b4252b]">
            Katalog
          </Link>
          <Link href="/peta-umkm" className="text-sm font-normal text-[#b4252b]">
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
          <MobileMenu currentPath="/peta-umkm" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#f8f8f8] py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-semibold text-[#161616] mb-4">Peta UMKM</h1>
          <p className="text-sm text-[#161616] max-w-2xl mx-auto">
            Temukan lokasi UMKM di sekitar Kecamatan Giriwoyo dengan koordinat yang akurat
          </p>
          {loading && <p className="text-xs text-gray-500 mt-2">Memuat data lokasi UMKM...</p>}
          {!loading && umkmLocations.length > 0 && (
            <p className="text-xs text-gray-500 mt-2">Menampilkan {umkmLocations.length} lokasi UMKM</p>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div
              ref={mapRef}
              className="h-[600px] rounded-3xl overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center"
            >
              {loading && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#161616] mx-auto mb-2"></div>
                  <p className="text-gray-500">Memuat peta...</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[#161616] mb-4">Daftar UMKM</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#161616] mx-auto mb-2"></div>
                  <p className="text-gray-500 text-sm">Memuat daftar UMKM...</p>
                </div>
              ) : umkmLocations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">Tidak ada data UMKM tersedia</p>
                </div>
              ) : (
                umkmLocations.map((location) => (
                  <div
                    key={location.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex">
                      <div className="w-24 h-24 relative">
                        <Image
                          src={location.image || "/placeholder.svg"}
                          alt={location.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <h4 className="font-semibold text-[#161616] text-sm">{location.name}</h4>
                        <p className="text-xs text-gray-600 mb-1">{location.category}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{location.address}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
