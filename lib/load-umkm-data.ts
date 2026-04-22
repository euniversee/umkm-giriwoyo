// Utility untuk memuat dan memproses data UMKM dari CSV
export interface Product {
  "Nama Produk": string
  Harga: string
  "Deskripsi Produk": string
}

export interface UmkmData {
  id: number
  "Nama Usaha": string
  Alamat: string
  Koordinat: string
  "Link WhatsApp": string
  products: Product[]
  cdn_links: string[]
}

export async function loadUmkmData(): Promise<UmkmData[]> {
  try {
    console.log("[v0] Starting to load UMKM data...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UMKM_Giriwoyo_Merged%20-%20UMKM_Giriwoyo_Merged.csv-HoVxuTq4Smz9uABt0C2Ppmx2eBsNzQ.csv",
      { signal: controller.signal },
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error("[v0] HTTP error:", response.status, response.statusText)
      return getFallbackData() // Return fallback data instead of throwing
    }

    const csvText = await response.text()
    console.log("[v0] CSV data loaded, length:", csvText.length)

    if (!csvText || csvText.trim().length === 0) {
      console.error("[v0] Empty CSV response")
      return getFallbackData()
    }

    // Parse CSV secara manual (simple parser untuk format ini)
    const lines = csvText.split("\n").filter((line) => line.trim()) // Filter empty lines

    if (lines.length < 2) {
      console.error("[v0] Invalid CSV format - not enough lines")
      return getFallbackData()
    }

    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())
    console.log("[v0] Headers:", headers)

    const umkmData: UmkmData[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      try {
        // Parse CSV line dengan handling untuk quoted values
        const values = parseCSVLine(line)

        if (values.length >= 4) {
          // Minimum required fields
          // Parse products JSON string
          let products: Product[] = []
          const productsStr = values[4] // products column
          if (productsStr && productsStr !== "#" && productsStr.trim() !== "") {
            try {
              // Clean up the string and parse JSON
              const cleanProductsStr = productsStr.replace(/'/g, '"').replace(/\n/g, "").trim()
              if (cleanProductsStr.startsWith("[") && cleanProductsStr.endsWith("]")) {
                products = JSON.parse(cleanProductsStr)
              }
            } catch (productError) {
              console.warn(`[v0] Error parsing products for line ${i}:`, productError)
              products = [] // Default to empty array
            }
          }

          // Parse cdn_links JSON string
          let cdnLinks: string[] = []
          const cdnLinksStr = values[5] // cdn_links column
          if (cdnLinksStr && cdnLinksStr !== "#" && cdnLinksStr.trim() !== "") {
            try {
              // Clean up the string and parse JSON
              const cleanCdnStr = cdnLinksStr.replace(/'/g, '"').replace(/\n/g, "").trim()
              if (cleanCdnStr.startsWith("[") && cleanCdnStr.endsWith("]")) {
                cdnLinks = JSON.parse(cleanCdnStr)
              }
            } catch (cdnError) {
              console.warn(`[v0] Error parsing CDN links for line ${i}:`, cdnError)
              cdnLinks = [] // Default to empty array
            }
          }

          const namaUsaha = values[0]?.replace(/"/g, "").trim() || ""
          if (namaUsaha) {
            umkmData.push({
              id: i, // Use line number as ID
              "Nama Usaha": namaUsaha,
              Alamat: values[1]?.replace(/"/g, "").trim() || "",
              Koordinat: values[2]?.replace(/"/g, "").trim() || "",
              "Link WhatsApp": values[3]?.replace(/"/g, "").trim() || "",
              products: products,
              cdn_links: cdnLinks,
            })
          }
        }
      } catch (error) {
        console.warn(`[v0] Error parsing line ${i}:`, error)
        continue
      }
    }

    console.log("[v0] Successfully loaded", umkmData.length, "UMKM entries")
    return umkmData.length > 0 ? umkmData : getFallbackData() // Return fallback if no data
  } catch (error) {
    console.error("[v0] Error loading UMKM data:", error)
    return getFallbackData() // Return fallback data instead of empty array
  }
}

function getFallbackData(): UmkmData[] {
  return [
    {
      id: 1,
      "Nama Usaha": "Warung Sayur Mbok Tarti",
      Alamat: "Tambakrejo, Guwotirto, Kec. Giriwoyo",
      Koordinat: "-8.057132, 110.932097",
      "Link WhatsApp": "https://wa.me/6281393029025",
      products: [
        {
          "Nama Produk": "Peyek Besar",
          Harga: "Rp 10.000",
          "Deskripsi Produk": "Peyek berukuran besar, puas dinikmati bersama keluarga.",
        },
      ],
      cdn_links: ["/peyek-tradisional.png"],
    },
  ]
}

// Helper function to parse CSV line with proper quote handling
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false
  let i = 0

  while (i < line.length) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"'
        i += 2
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
        i++
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      result.push(current)
      current = ""
      i++
    } else {
      current += char
      i++
    }
  }

  // Add the last field
  result.push(current)

  return result
}
