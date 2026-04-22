import { type NextRequest, NextResponse } from "next/server"
import Papa from "papaparse"

const CSV_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UMKM_Giriwoyo_Merged%20-%20UMKM_Giriwoyo_Merged.csv-HoVxuTq4Smz9uABt0C2Ppmx2eBsNzQ.csv"

// In-memory storage for new/updated data (in production, use a database)
let localData: any[] = []
let isInitialized = false

// Check admin authentication
function isAuthenticated(request: NextRequest) {
  const adminSession = request.cookies.get("admin-session")
  return adminSession?.value === "authenticated"
}

async function initializeData() {
  if (!isInitialized) {
    try {
      const response = await fetch(CSV_URL)
      const csvText = await response.text()
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      })
      localData = parsed.data || []
      isInitialized = true
    } catch (error) {
      console.error("Error initializing data:", error)
      localData = []
    }
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await initializeData()
    return NextResponse.json(localData)
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await initializeData()
    const newData = await request.json()

    // Add unique ID if not present
    if (!newData.id) {
      newData.id = Date.now().toString()
    }

    console.log("[v0] Adding new data:", newData)
    localData.push(newData)

    return NextResponse.json({
      success: true,
      message: "Data added successfully",
      id: newData.id,
      totalCount: localData.length,
    })
  } catch (error) {
    console.error("Error adding data:", error)
    return NextResponse.json({ error: "Failed to add data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await initializeData()
    const updatedData = await request.json()
    const { id } = updatedData

    const index = localData.findIndex((item) => item.id === id || item["Nama Usaha"] === updatedData["Nama Usaha"])

    if (index !== -1) {
      localData[index] = { ...localData[index], ...updatedData }
      console.log("[v0] Updated data at index:", index)
      return NextResponse.json({
        success: true,
        message: "Data updated successfully",
        totalCount: localData.length,
      })
    } else {
      return NextResponse.json({ error: "Data not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}
