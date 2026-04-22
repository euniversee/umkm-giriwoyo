import { type NextRequest, NextResponse } from "next/server"

// Check admin authentication
function isAuthenticated(request: NextRequest) {
  const adminSession = request.cookies.get("admin-session")
  return adminSession?.value === "authenticated"
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedData = await request.json()
    const { id } = params

    // In a real implementation, you would update the specific row in the CSV
    // For now, we'll just return success

    return NextResponse.json({ success: true, message: "Data updated successfully" })
  } catch (error) {
    console.error("Error updating data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = params

    // In a real implementation, you would delete the specific row from the CSV
    // For now, we'll just return success

    return NextResponse.json({ success: true, message: "Data deleted successfully" })
  } catch (error) {
    console.error("Error deleting data:", error)
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 })
  }
}
