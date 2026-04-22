"use client"

import type React from "react"
import Head from "next/head"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus, X } from "lucide-react"

interface Product {
  name: string
  price: string
  description: string
}

interface UMKMData {
  id?: string
  "Nama Usaha": string
  Alamat: string
  Koordinat: string
  "Link WhatsApp": string
  products: string
  cdn_links: string
}

export default function AdminDashboard() {
  const [data, setData] = useState<UMKMData[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<UMKMData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [formData, setFormData] = useState<UMKMData>({
    "Nama Usaha": "",
    Alamat: "",
    Koordinat: "",
    "Link WhatsApp": "",
    products: "",
    cdn_links: "",
  })

  const [products, setProducts] = useState<Product[]>([{ name: "", price: "", description: "" }])
  const [whatsappNumber, setWhatsappNumber] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      console.log("[v0] Fetching UMKM data from API...")
      const response = await fetch("/api/admin/umkm", {
        credentials: "include",
        cache: "no-cache",
      })
      console.log("[v0] API response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Fetched data:", result)
        console.log("[v0] Data length:", result.length)
        setData(result)
      } else if (response.status === 401) {
        console.log("[v0] Unauthorized - redirecting to login")
        window.location.href = "/admin"
      } else {
        console.log("[v0] API response not ok:", await response.text())
      }
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting form data...")

    try {
      const productsJson = JSON.stringify(
        products.map((p) => ({
          "Nama Produk": p.name,
          Harga: p.price,
          "Deskripsi Produk": p.description,
        })),
      )

      const whatsappLink = whatsappNumber.startsWith("https://wa.me/")
        ? whatsappNumber
        : `https://wa.me/${whatsappNumber}`

      const submitData = {
        ...formData,
        "Link WhatsApp": whatsappLink,
        products: productsJson,
        ...(editingItem && { id: editingItem.id || editingItem["Nama Usaha"] }),
      }

      console.log("[v0] Submit data:", submitData)

      const url = "/api/admin/umkm"
      const method = editingItem ? "PUT" : "POST"

      console.log("[v0] Making request to:", url, "with method:", method)

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(submitData),
      })

      console.log("[v0] Submit response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Submit successful:", result)
        await fetchData()
        resetForm()
        setIsDialogOpen(false)
      } else {
        const errorText = await response.text()
        console.log("[v0] Submit failed:", errorText)
        alert("Gagal menyimpan data: " + errorText)
      }
    } catch (error) {
      console.error("[v0] Error saving data:", error)
      alert("Terjadi kesalahan saat menyimpan data")
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(`/api/admin/umkm/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          await fetchData()
        }
      } catch (error) {
        console.error("Error deleting data:", error)
      }
    }
  }

  const handleImageUpload = async (files: FileList) => {
    setUploadingImages(true)
    const uploadedUrls: string[] = []

    try {
      console.log("[v0] Starting image upload for", files.length, "files")

      for (const file of Array.from(files)) {
        console.log("[v0] Uploading file:", file.name)

        const uploadFormData = new FormData()
        uploadFormData.append("file", file)
        uploadFormData.append("upload_preset", "UMKM Giriwoyo Website")
        uploadFormData.append("folder", "umkm_giriwoyo")

        const response = await fetch("https://api.cloudinary.com/v1_1/dad4b97rw/image/upload", {
          method: "POST",
          body: uploadFormData,
        })

        if (response.ok) {
          const result = await response.json()
          console.log("[v0] Upload successful:", result.secure_url)
          uploadedUrls.push(result.secure_url)
        } else {
          console.error("[v0] Upload failed for", file.name, await response.text())
        }
      }

      let currentLinks: string[] = []
      try {
        if (formData.cdn_links && formData.cdn_links.trim()) {
          currentLinks = JSON.parse(formData.cdn_links)
        }
      } catch (e) {
        console.log("[v0] Error parsing existing CDN links, starting fresh")
        currentLinks = []
      }

      const updatedLinks = [...currentLinks, ...uploadedUrls]
      console.log("[v0] Updated CDN links:", updatedLinks)

      setFormData({
        ...formData,
        cdn_links: JSON.stringify(updatedLinks),
      })
    } catch (error) {
      console.error("[v0] Error uploading images:", error)
    } finally {
      setUploadingImages(false)
    }
  }

  const resetForm = () => {
    setFormData({
      "Nama Usaha": "",
      Alamat: "",
      Koordinat: "",
      "Link WhatsApp": "",
      products: "",
      cdn_links: "",
    })
    setProducts([{ name: "", price: "", description: "" }])
    setWhatsappNumber("")
    setEditingItem(null)
  }

  const openEditDialog = (item: UMKMData) => {
    console.log("[v0] Opening edit dialog for:", item)
    setEditingItem(item)
    setFormData(item)

    try {
      if (item.products && item.products.trim()) {
        const parsedProducts = JSON.parse(item.products)
        console.log("[v0] Parsed products:", parsedProducts)

        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          const formattedProducts = parsedProducts.map((p: any) => ({
            name: p["Nama Produk"] || p.name || "",
            price: p["Harga"] || p.price || "",
            description: p["Deskripsi Produk"] || p.description || "",
          }))
          console.log("[v0] Formatted products:", formattedProducts)
          setProducts(formattedProducts)
        } else {
          console.log("[v0] No valid products found, using default")
          setProducts([{ name: "", price: "", description: "" }])
        }
      } else {
        console.log("[v0] No products data, using default")
        setProducts([{ name: "", price: "", description: "" }])
      }
    } catch (error) {
      console.error("[v0] Error parsing products:", error)
      setProducts([{ name: "", price: "", description: "" }])
    }

    const whatsappLink = item["Link WhatsApp"] || ""
    const extractedNumber = whatsappLink.replace("https://wa.me/", "").replace("http://wa.me/", "")
    console.log("[v0] Extracted WhatsApp number:", extractedNumber)
    setWhatsappNumber(extractedNumber)

    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const addProduct = () => {
    setProducts([...products, { name: "", price: "", description: "" }])
  }

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index))
    }
  }

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = products.map((product, i) => (i === index ? { ...product, [field]: value } : product))
    setProducts(updatedProducts)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b4252b] mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - UMKM Giriwoyo</title>
        <meta name="description" content="Dashboard admin untuk mengelola data UMKM Giriwoyo" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#161616]">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Kelola data UMKM Giriwoyo ({data.length} UMKM)</p>
            </div>
            <Button onClick={openAddDialog} className="bg-[#b4252b] hover:bg-[#8b1e22] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah UMKM
            </Button>
          </div>

          {data.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="text-center py-12">
                <p className="text-gray-600 mb-4">Belum ada data UMKM</p>
                <Button onClick={openAddDialog} className="bg-[#b4252b] hover:bg-[#8b1e22] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah UMKM Pertama
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {data.map((item, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-[#161616]">{item["Nama Usaha"]}</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">{item["Alamat"]}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(item)}
                          className="border-gray-300 hover:border-[#b4252b]"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id || index.toString())}
                          className="border-red-300 hover:border-red-500 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Koordinat:</span>
                        <p className="text-gray-600">{item["Koordinat"]}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">WhatsApp:</span>
                        <p className="text-gray-600">{item["Link WhatsApp"]}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Produk:</span>
                        <p className="text-gray-600 line-clamp-2">{item["products"]}</p>
                      </div>
                      {item.cdn_links && (
                        <div className="md:col-span-2">
                          <span className="font-medium text-gray-700">Gambar:</span>
                          <p className="text-gray-600 text-xs">
                            {item.cdn_links.length > 100 ? item.cdn_links.substring(0, 100) + "..." : item.cdn_links}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl text-[#161616]">
                  {editingItem ? "Edit UMKM" : "Tambah UMKM Baru"}
                </DialogTitle>
                <DialogDescription>
                  {editingItem ? "Ubah informasi UMKM" : "Masukkan informasi UMKM baru"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nama-usaha">Nama Usaha</Label>
                    <Input
                      id="nama-usaha"
                      value={formData["Nama Usaha"]}
                      onChange={(e) => setFormData({ ...formData, "Nama Usaha": e.target.value })}
                      className="border-gray-300 focus:border-[#b4252b]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="alamat">Alamat</Label>
                    <Input
                      id="alamat"
                      value={formData["Alamat"]}
                      onChange={(e) => setFormData({ ...formData, Alamat: e.target.value })}
                      className="border-gray-300 focus:border-[#b4252b]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="koordinat">Koordinat</Label>
                    <Input
                      id="koordinat"
                      placeholder="-8.057132, 110.932097"
                      value={formData["Koordinat"]}
                      onChange={(e) => setFormData({ ...formData, Koordinat: e.target.value })}
                      className="border-gray-300 focus:border-[#b4252b]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        https://wa.me/
                      </span>
                      <Input
                        id="whatsapp"
                        placeholder="6281393029025"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="border-gray-300 focus:border-[#b4252b] rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Produk</Label>
                    <Button
                      type="button"
                      onClick={addProduct}
                      size="sm"
                      className="bg-[#b4252b] hover:bg-[#8b1e22] text-white"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Tambah Produk
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-700">Produk {index + 1}</span>
                          {products.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeProduct(index)}
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <Label htmlFor={`product-name-${index}`}>Nama Produk</Label>
                            <Input
                              id={`product-name-${index}`}
                              placeholder="Peyek Besar"
                              value={product.name}
                              onChange={(e) => updateProduct(index, "name", e.target.value)}
                              className="border-gray-300 focus:border-[#b4252b]"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor={`product-price-${index}`}>Harga</Label>
                            <Input
                              id={`product-price-${index}`}
                              placeholder="Rp 10.000"
                              value={product.price}
                              onChange={(e) => updateProduct(index, "price", e.target.value)}
                              className="border-gray-300 focus:border-[#b4252b]"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`product-desc-${index}`}>Deskripsi Produk</Label>
                          <Textarea
                            id={`product-desc-${index}`}
                            placeholder="Peyek berukuran besar dari Warung Sayur Mbok Tarti..."
                            value={product.description}
                            onChange={(e) => updateProduct(index, "description", e.target.value)}
                            className="border-gray-300 focus:border-[#b4252b] min-h-[60px]"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="images">Upload Gambar</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                      className="border-gray-300 focus:border-[#b4252b]"
                      disabled={uploadingImages}
                    />
                    {uploadingImages && <p className="text-sm text-gray-600">Mengupload gambar...</p>}
                    <p className="text-xs text-gray-500">
                      Gambar akan otomatis ditambahkan ke CDN Links setelah upload berhasil
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="cdn-links">CDN Links (Otomatis terisi saat upload gambar)</Label>
                  <Textarea
                    id="cdn-links"
                    placeholder='["https://res.cloudinary.com/dad4b97rw/image/upload/v1756516410/umkm_giriwoyo/image1.webp"]'
                    value={formData["cdn_links"]}
                    onChange={(e) => setFormData({ ...formData, cdn_links: e.target.value })}
                    className="border-gray-300 focus:border-[#b4252b] min-h-[80px]"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 border-gray-300"
                  >
                    Batal
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#b4252b] hover:bg-[#8b1e22] text-white">
                    {editingItem ? "Update" : "Simpan"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
