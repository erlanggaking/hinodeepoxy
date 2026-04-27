# Product Requirements Document (PRD): HINODE EPOXY Digital Platform

**Version:** 1.0  
**Status:** Draft  
**Project Owner:** HINODE EPOXY Team  

---

## 1. Executive Summary
HINODE EPOXY adalah penyedia jasa aplikator lantai epoxy profesional yang melayani wilayah Jabodetabek, Jawa Barat, dan Banten. Dokumen ini merinci kebutuhan pengembangan platform digital yang mencakup website perusahaan (Frontend), sistem manajemen konten (Backend), dan mesin otomasi artikel berbasis AI untuk mendominasi peringkat SEO secara berkelanjutan.

---

## 2. Objectives
- **Lead Generation:** Mengonversi pengunjung menjadi calon klien melalui WhatsApp.
- **Brand Authority:** Membangun kepercayaan melalui portofolio visual dan edukasi teknis.
- **SEO Dominance:** Mencapai peringkat atas Google melalui publikasi konten harian otomatis.
- **Operational Efficiency:** Mengotomatiskan alur kerja konten tanpa intervensi manual harian.

---

## 3. Target Audience
1. **B2B:** Pemilik pabrik, pengelola gudang, kontraktor bangunan, dan manajer operasional rumah sakit/industri.
2. **B2C:** Pemilik cafe, showroom, bengkel, dan garasi rumah mewah.

---

## 4. Functional Requirements

### 4.1. Frontend (FE) - User Experience
- **Responsive Landing Page:** Desain modern dengan estetika "Sleek & Glossy".
- **Dynamic Services Page:** Menampilkan 3 paket utama (Coating, Self-Leveling, Heavy Duty) dengan kalkulator estimasi harga sederhana.
- **Geo-Tagged Portfolio:** Galeri proyek yang menampilkan foto *Before-After* dengan metadata lokasi otomatis untuk Local SEO.
- **Blog/Article Hub:** Halaman indeks artikel yang dioptimalkan untuk keterbacaan (Readability).
- **Direct WhatsApp Integration:** Tombol melayang (Floating button) dan Call-to-Action (CTA) di setiap section.

### 4.2. Backend (BE) - Management System
- **Headless CMS Integration:** Menggunakan Strapi atau Sanity untuk menyimpan data proyek, testimoni, dan artikel.
- **API Endpoints:**
  - `POST /api/articles`: Menerima input dari AI Writer.
  - `GET /api/portfolio`: Mengambil data proyek berdasarkan lokasi.
- **Lead Tracking:** Dashboard sederhana untuk melihat jumlah klik WhatsApp (opsional).

### 4.3. AI Automation - SEO Engine
- **Scheduled AI Writer:** Sistem yang berjalan secara otomatis (Cron Job) setiap hari jam 09.00 WIB.
- **Content Intelligence:** AI yang dilatih dengan "Master System Prompt HINODE" untuk menghasilkan konten solutif.
- **Automatic Indexing:** Integrasi dengan Google Search Console API untuk *request indexing* instan setelah artikel terbit.

---

## 5. Technical Architecture

### 5.1. Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS.
- **Deployment:** Vercel (untuk kecepatan loading dan performa SEO).
- **CMS:** Sanity.io atau Strapi (Headless).
- **Automation:** GitHub Actions atau Vercel Cron Jobs.
- **AI Engine:** Google Gemini API atau OpenAI API.

### 5.2. System Flow (Automation)
1. **Trigger:** Cron Job aktif setiap 24 jam.
2. **Keyword Fetching:** Mengambil keyword target dari daftar (Excel/Database).
3. **AI Generation:** Mengirim keyword ke LLM dengan System Prompt khusus HINODE.
4. **Validation:** Script mengecek format Markdown dan kelengkapan elemen SEO (H1, Meta Desc).
5. **Publishing:** Script mengirim konten ke Headless CMS via API.
6. **Deploying:** Vercel melakukan Revalidation (ISR) agar konten muncul secara instan.

---

## 6. Detailed Feature Specifications

| Modul | Fitur | Deskripsi |
| :--- | :--- | :--- |
| **FE** | Kalkulator Harga | Input luasan (m2) -> Output estimasi harga berdasarkan paket yang dipilih. |
| **FE** | Geo-Map Portfolio | Integrasi Google Maps API untuk menampilkan titik-titik proyek yang sudah selesai. |
| **BE** | Role Management | Superadmin (Owner) & Editor (Admin Content). |
| **AI** | Auto-Image Search | (Optional) AI mencari gambar pendukung yang relevan atau menggunakan placeholder branded HINODE. |

---

## 7. SEO Strategy
- **Primary Keywords:** Jasa Epoxy Lantai, Kontraktor Epoxy Jakarta, Harga Epoxy per meter 2026.
- **Long-tail Keywords:** Tips merawat lantai epoxy, Perbedaan epoxy coating vs self-leveling.
- **Local SEO:** Optimasi Google Business Profile (GBP) yang terhubung dengan alamat Kalideres, Jakarta Barat.

---

## 8. Roadmap Pengembangan
1. **Minggu 1:** Finalisasi desain UI/UX dan setup Headless CMS.
2. **Minggu 2:** Pengembangan Frontend (Next.js) dan integrasi API WhatsApp.
3. **Minggu 3:** Implementasi AI Automation Script & Testing Cron Job.
4. **Minggu 4:** Launching MVP & Submit Sitemap ke Google Search Console.

---

## 9. Security & Compliance
- **SSL Certificate:** Wajib (Auto-handled by Vercel).
- **Sanitization:** Semua input dari AI dan user harus divalidasi sebelum masuk ke database/CMS.
- **Backups:** Otomatis harian untuk database CMS.

---
