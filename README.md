# UMKM Giriwoyo (Kawula UMKM) 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**UMKM Giriwoyo** adalah platform digital inklusif yang dirancang untuk memberdayakan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di wilayah **Giriwoyo, Wonogiri**. Platform ini berfungsi sebagai jembatan antara produsen lokal dengan pasar yang lebih luas, menghadirkan produk unggulan daerah dalam satu ekosistem yang modern dan mudah diakses.

---

## ✨ Fitur Utama

- **Katalog Produk Dinamis**: Menampilkan berbagai produk lokal mulai dari kuliner tradisional (Balung Kethek, Olahan Kelor) hingga kerajinan tangan, dengan data yang diperbarui secara *real-time* melalui integrasi CSV.
- **Peta Interaktif UMKM**: Visualisasi lokasi usaha menggunakan **Leaflet JS**, memudahkan konsumen untuk menemukan titik lokasi UMKM di seluruh pelosok Giriwoyo.
- **Optimasi Mobile-First**: Desain yang responsif dan ringan, disesuaikan dengan kebiasaan pengguna lokal yang mayoritas mengakses platform melalui smartphone.
- **Dashboard Admin**: Antarmuka khusus untuk monitoring data UMKM, memastikan informasi yang ditampilkan tetap akurat dan mutakhir.
- **Integrasi WhatsApp**: Hubungan langsung antara pembeli dan penjual melalui fitur "Klik untuk Chat", mempercepat proses transaksi tanpa hambatan.

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, React 19) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Maps** | [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/) |
| **Data Fetching** | Fetch API & PapaParse (CSV Processing) |
| **Form Handling** | React Hook Form & Zod Validation |

---

## 🚀 Memulai (Local Development)

Ikuti langkah-langkah berikut untuk menjalankan proyek di mesin lokal Anda:

1. **Clone repositori**:
   ```bash
   git clone https://github.com/euniversee/umkm-giriwoyo.git
   cd umkm-giriwoyo
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   # atau
   pnpm install
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```

4. **Buka di browser**:
   Akses `http://localhost:3000` untuk melihat hasilnya.

---

## 📊 Manajemen Data

Proyek ini menggunakan pendekatan **Data-as-a-Service** yang sederhana namun efektif:
- Seluruh data UMKM disimpan dalam file CSV eksternal yang di-host di Vercel Blob Storage.
- File `lib/load-umkm-data.ts` bertanggung jawab untuk memproses, memvalidasi (menggunakan Zod), dan menyediakan data tersebut ke seluruh komponen aplikasi.
- Pendekatan ini memungkinkan pembaruan data tanpa harus melakukan *deployment* ulang kode sumber.
