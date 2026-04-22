"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"

// Import Leaflet dynamically to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

// Koordinat pusat Giriwoyo
const giriwoyoCenter: [number, number] = [-8.03037, 110.93762]

export default function PetaUMKMClient() {
  const [umkmLocations, setUmkmLocations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedUMKM, setSelectedUMKM] = useState<any>(null)
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet)
      import("leaflet/dist/leaflet.css")
    })
  }, [])

  const customIcon = useMemo(() => {
    if (!L) return null
    return L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }, [L])

  // Load location data from updated CSV
  const loadLocationData = async () => {
    try {
      const response = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UMKM_Giriwoyo_Merged%20-%20UMKM_Giriwoyo_Merged.csv-HoVxuTq4Smz9uABt0C2Ppmx2eBsNzQ.csv",
        { cache: "no-store" },
      )

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const csvText = await response.text()
      const lines = csvText.split("\n")
      if (lines.length < 2) throw new Error("CSV file is empty or invalid")

      const locations: any[] = []
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const values = parseCSVLine(line)
        if (values.length >= 6) {
          const namaUsaha = values[0].replace(/"/g, "")
          const alamat = values[1].replace(/"/g, "")
          const koordinat = values[2].replace(/"/g, "")

          if (namaUsaha && koordinat && koordinat !== "#") {
            const coords = koordinat.split(",").map((coord) => coord.trim())
            if (coords.length === 2) {
              const lat = parseFloat(coords[0])
              const lng = parseFloat(coords[1])

              if (!isNaN(lat) && !isNaN(lng)) {
                let cdnLinks = []
                const cdnLinksStr = values[5]
                if (cdnLinksStr && cdnLinksStr !== "#") {
                  try {
                    const cleanCdnStr = cdnLinksStr.replace(/'/g, '"').replace(/\n/g, "").trim()
                    cdnLinks = JSON.parse(cleanCdnStr)
                  } catch (e) {
                    cdnLinks = []
                  }
                }

                locations.push({
                  id: i,
                  name: namaUsaha,
                  nama_umkm: namaUsaha,
                  category: getCategoryFromName(namaUsaha),
                  kategori: getCategoryFromName(namaUsaha),
                  address: alamat || "Giriwoyo, Wonogiri",
                  alamat: alamat || "Giriwoyo, Wonogiri",
                  lat: lat,
                  lng: lng,
                  latitude: lat.toString(),
                  longitude: lng.toString(),
                  pemilik: "Warga Lokal",
                  nomor_wa: "6283139087647",
                  image: cdnLinks.length > 0 ? cdnLinks[0] : getImageFromName(namaUsaha),
                  gambar_produk: cdnLinks.length > 0 ? cdnLinks[0] : getImageFromName(namaUsaha),
                })
              }
            }
          }
        }
      }
      setUmkmLocations(locations)
      setLoading(false)
    } catch (error) {
      console.error("Error loading location data:", error)
      setLoading(false)
    }
  }

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

  const getCategoryFromName = (name: string) => {
    const nameLower = name.toLowerCase()
    if (["warung", "peyek", "intip", "donat", "nugget", "balung", "karak", "tempe", "mete", "selar", "kue", "rambak", "kripik", "roti", "snack", "cake", "opak", "jajanan"].some(k => nameLower.includes(k))) {
      return "Makanan"
    } else if (["jamu", "sari", "keelor", "dmaykeelor"].some(k => nameLower.includes(k))) {
      return "Kesehatan"
    } else if (nameLower.includes("toko") || nameLower.includes("kelontong")) {
      return "Kebutuhan Sehari-hari"
    }
    return "Lainnya"
  }

  const getImageFromName = (name: string) => {
    const nameLower = name.toLowerCase()
    if (nameLower.includes("balung")) return "/images/balung-kethek.webp"
    if (nameLower.includes("keelor") || nameLower.includes("dmaykeelor")) return "/images/kelor-powder.webp"
    return "/images/food-1.jpg"
  }

  useEffect(() => {
    loadLocationData()
  }, [])

  const filteredUMKM = useMemo(() => {
    return umkmLocations.filter((umkm) => {
      const matchesSearch =
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.address.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "Semua" || umkm.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [umkmLocations, searchQuery, selectedCategory])

  const categories = ["Semua", "Makanan", "Kesehatan", "Kebutuhan Sehari-hari", "Lainnya"]

  if (typeof window === "undefined") return null

  return (
    <div className="bg-[#fcfbf6] min-h-screen pt-[72px]">
      <Header currentPath="/peta-umkm" />

      <main className="relative h-[calc(100vh-72px)] overflow-hidden">
        {/* Map Container */}
        <div className="absolute inset-0 z-0">
          <MapContainer
            center={giriwoyoCenter}
            zoom={13}
            className="h-full w-full grayscale-[0.2] contrast-[1.1]"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredUMKM.map((umkm) => (
              <Marker
                key={umkm.id}
                position={[umkm.lat, umkm.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => setSelectedUMKM(umkm),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2">
                    <h4 className="font-bold text-[#161616] text-sm mb-1">{umkm.name}</h4>
                    <p className="text-[10px] text-[#b4252b] font-bold uppercase tracking-widest">{umkm.category}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* UI Overlays - Header/Search */}
        <div className="absolute top-8 left-8 right-8 z-10 flex flex-col md:flex-row gap-4 items-start pointer-events-none">
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-[#161616]/5 pointer-events-auto max-w-md w-full">
            <span className="text-[#b4252b] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Interactive Atlas</span>
            <h1 className="text-4xl font-bold text-[#161616] tracking-tighter mb-8 leading-none italic">Sebaran Karya <br />Giriwoyo.</h1>
            
            <div className="relative group mb-6">
              <input
                type="text"
                placeholder="Cari UMKM atau produk..."
                className="w-full bg-[#fcfbf6] px-6 py-4 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b4252b] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-[#161616]/20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>

            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap shadow-sm px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    selectedCategory === category
                      ? "bg-[#b4252b] text-white shadow-lg shadow-[#b4252b]/20"
                      : "bg-white text-[#161616]/40 hover:bg-[#161616] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected UMKM Detail Drawer */}
        {selectedUMKM && (
          <div className="absolute bottom-12 left-8 right-8 md:right-auto md:w-[450px] z-20 pointer-events-auto">
            <div className="bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-[#161616]/5 overflow-hidden">
               <div className="relative h-48 bg-[#161616] overflow-hidden">
                  {selectedUMKM.image ? (
                    <Image 
                      src={selectedUMKM.image} 
                      alt={selectedUMKM.name} 
                      fill 
                      className="object-cover opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                       <span className="text-white/20 italic font-bold">No Preview</span>
                    </div>
                  )}
                  <button 
                    onClick={() => setSelectedUMKM(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#b4252b] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
               </div>
               
               <div className="p-10">
                  <div className="mb-6">
                    <span className="text-[#b4252b] font-bold text-[10px] uppercase tracking-[0.4em] mb-2 block">{selectedUMKM.category}</span>
                    <h2 className="text-3xl font-bold text-[#161616] tracking-tighter italic">{selectedUMKM.name}</h2>
                  </div>

                  <p className="text-[#161616]/60 leading-relaxed mb-8 line-clamp-3">
                    Pelaku UMKM unggulan dari wilayah Giriwoyo yang berdedikasi menjaga kualitas dan tradisi produk lokal di pasar modern.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4 text-sm font-medium text-[#161616]">
                      <div className="w-8 h-8 rounded-lg bg-[#fcfbf6] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      </div>
                      <span className="truncate">{selectedUMKM.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium text-[#161616]">
                      <div className="w-8 h-8 rounded-lg bg-[#fcfbf6] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                      </div>
                      <span>Owner: {selectedUMKM.pemilik}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        const message = `Halo ${selectedUMKM.pemilik}, saya ingin bertanya tentang produk ${selectedUMKM.name}...`
                        const waUrl = `https://wa.me/${selectedUMKM.nomor_wa}?text=${encodeURIComponent(message)}`
                        window.open(waUrl, "_blank")
                      }}
                      className="flex-1 bg-[#161616] text-white py-5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#b4252b] transition-all shadow-xl"
                    >
                      Hubungi UMKM
                    </button>
                    <Link 
                      href={`/katalog?umkm=${encodeURIComponent(selectedUMKM.name)}`}
                      className="flex-1 bg-[#fcfbf6] text-[#161616] py-5 rounded-2xl text-xs font-bold uppercase tracking-widest text-center border border-[#161616]/5 hover:bg-white transition-all"
                    >
                      Lihat Katalog
                    </Link>
                  </div>
               </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 20px;
          padding: 0;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
          border: 1px solid rgba(22, 22, 22, 0.05);
        }
        .custom-popup .leaflet-popup-content { margin: 0; }
        .custom-popup .leaflet-popup-tip { box-shadow: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
