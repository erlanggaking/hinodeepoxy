"use client";

import { useState, useEffect, useCallback } from "react";

interface UploadedImage { filename: string; url: string; category: string; size: number; }

type Tab = "upload" | "portfolio" | "testimonial" | "api";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("logo");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("upload");

  // Check if already authenticated on load
  useEffect(() => {
    const auth = localStorage.getItem("hinode_admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "hinode" && loginForm.password === "hinode@378") {
      setIsAuthenticated(true);
      localStorage.setItem("hinode_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Username atau password salah.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("hinode_admin_auth");
  };

  // Portfolio form
  const [portfolioForm, setPortfolioForm] = useState({ title: "", location: "", area: "", type: "coating", description: "", duration: "" });
  // Testimonial form
  const [testimonialForm, setTestimonialForm] = useState({ name: "", role: "", company: "", text: "", rating: "5" });

  const fetchImages = useCallback(async () => {
    try { const res = await fetch("/api/images"); const data = await res.json(); if (data.success) setImages(data.data); } catch {}
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setMessage(null);
    const formData = new FormData();
    formData.append("file", file); formData.append("category", category);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) { setMessage({ type: "success", text: `Upload berhasil! URL: ${data.data.url}` }); fetchImages(); }
      else { setMessage({ type: "error", text: data.error }); }
    } catch { setMessage({ type: "error", text: "Upload gagal." }); }
    finally { setUploading(false); e.target.value = ""; }
  };

  const handlePortfolioSubmit = async () => {
    if (!portfolioForm.title || !portfolioForm.location) {
      setMessage({ type: "error", text: "Mohon isi judul dan lokasi proyek." });
      return;
    }
    
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolioForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `Proyek "${portfolioForm.title}" berhasil disimpan!` });
        setPortfolioForm({ title: "", location: "", area: "", type: "coating", description: "", duration: "" });
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({ type: "error", text: "Gagal menyimpan proyek." });
    }
  };

  const handleTestimonialSubmit = async () => {
    if (!testimonialForm.name || !testimonialForm.text) {
      setMessage({ type: "error", text: "Mohon isi nama dan testimoni." });
      return;
    }
    
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `Testimoni dari "${testimonialForm.name}" berhasil disimpan!` });
        setTestimonialForm({ name: "", role: "", company: "", text: "", rating: "5" });
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({ type: "error", text: "Gagal menyimpan testimoni." });
    }
  };

  const fmt = (b: number) => b < 1024 ? `${b}B` : b < 1048576 ? `${(b/1024).toFixed(1)}KB` : `${(b/1048576).toFixed(1)}MB`;

  const tabs: { value: Tab; label: string; icon: string }[] = [
    { value: "upload", label: "Upload Foto", icon: "📷" },
    { value: "portfolio", label: "Portofolio", icon: "🏗️" },
    { value: "testimonial", label: "Testimoni", icon: "⭐" },
    { value: "api", label: "API", icon: "🔌" },
  ];

  const inputClass = "w-full px-4 py-2.5 bg-[#1E293B] border border-[#334155] rounded-lg text-gray-200 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500";
  const labelClass = "block text-sm text-gray-400 mb-1.5";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen admin-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-blue flex items-center justify-center font-bold text-white text-2xl mx-auto mb-4">H</div>
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">Admin Login</h1>
            <p className="text-gray-400 text-sm mt-1">Masuk untuk mengelola HINODE EPOXY</p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
                  ⚠️ {loginError}
                </div>
              )}
              <div>
                <label className={labelClass}>Username</label>
                <input
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className={inputClass}
                  placeholder="hinode"
                />
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20"
              >
                Masuk ke Dashboard
              </button>
            </form>
          </div>
          <p className="text-center text-gray-600 text-xs mt-8">
            &copy; {new Date().getFullYear()} HINODE EPOXY Professional Flooring
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen admin-dark">
      {/* Header */}
      <div className="bg-[#0F172A] border-b border-[#1E293B] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-white mb-1">Admin Dashboard</h1>
              <p className="text-sm text-gray-400">Kelola foto, portofolio, testimoni, dan API backend</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded-lg text-sm transition-all"
            >
              Keluar
            </button>
          </div>
          <div className="flex gap-2 mt-5 overflow-x-auto pb-2">
            {tabs.map((t) => (
              <button key={t.value} onClick={() => { setActiveTab(t.value); setMessage(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === t.value ? "bg-blue-600 text-white" : "bg-[#1E293B] text-gray-400 hover:text-white border border-[#334155]"
                }`}
              >{t.icon} {t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-400" : "bg-red-500/10 border border-red-500/30 text-red-400"}`}>
            {message.type === "success" ? "✅" : "❌"} {message.text}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ===== UPLOAD TAB ===== */}
        {activeTab === "upload" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h2 className="text-base font-semibold text-white mb-4">Upload Gambar</h2>
                <div className="mb-4">
                  <label className={labelClass}>Kategori</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                    <option value="logo">🏷️ Logo</option>
                    <option value="portfolio">📸 Foto Proyek</option>
                    <option value="services">🔧 Foto Layanan</option>
                    <option value="blog">📝 Gambar Artikel</option>
                    <option value="testimonial">⭐ Foto Klien</option>
                    <option value="general">📁 Umum</option>
                  </select>
                </div>
                <label className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${uploading ? "border-blue-500 bg-blue-500/5" : "border-[#334155] hover:border-blue-500/50"}`}>
                    {uploading ? (
                      <p className="text-sm text-blue-400 animate-pulse">Mengupload...</p>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                        <p className="text-sm text-gray-400">Klik untuk pilih gambar</p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP, SVG • Max 5MB</p>
                      </>
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
                </label>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Gambar ({images.length})</h2>
                <button onClick={fetchImages} className="text-sm text-blue-400 hover:text-blue-300">↻ Refresh</button>
              </div>
              {images.length === 0 ? (
                <div className="card p-12 text-center"><p className="text-gray-500">Belum ada gambar. Upload gambar pertama Anda.</p></div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img) => (
                    <div key={img.url} className="card overflow-hidden group">
                      <div className="aspect-square bg-[#1E293B] relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.filename} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={() => { navigator.clipboard.writeText(img.url); setMessage({ type: "success", text: `URL disalin: ${img.url}` }); }}
                            className="px-3 py-1.5 bg-blue-600 rounded text-xs font-medium text-white">📋 Copy URL</button>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs text-gray-300 truncate">{img.filename}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">{img.category}</span>
                          <span className="text-[10px] text-gray-500">{fmt(img.size)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== PORTFOLIO TAB ===== */}
        {activeTab === "portfolio" && (
          <div className="max-w-2xl">
            <h2 className="text-base font-semibold text-white mb-6">Tambah Proyek Portofolio</h2>
            <div className="card p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Judul Proyek *</label>
                  <input type="text" placeholder="Epoxy Self-Leveling Gudang Farmasi" value={portfolioForm.title}
                    onChange={(e) => setPortfolioForm({...portfolioForm, title: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Lokasi *</label>
                  <input type="text" placeholder="Bekasi, Jawa Barat" value={portfolioForm.location}
                    onChange={(e) => setPortfolioForm({...portfolioForm, location: e.target.value})} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Luas Area</label>
                  <input type="text" placeholder="2000 m²" value={portfolioForm.area}
                    onChange={(e) => setPortfolioForm({...portfolioForm, area: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Jenis Epoxy</label>
                  <select value={portfolioForm.type} onChange={(e) => setPortfolioForm({...portfolioForm, type: e.target.value})} className={inputClass}>
                    <option value="coating">Coating</option>
                    <option value="self-leveling">Self-Leveling</option>
                    <option value="heavy-duty">Heavy Duty</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Durasi</label>
                  <input type="text" placeholder="14 hari" value={portfolioForm.duration}
                    onChange={(e) => setPortfolioForm({...portfolioForm, duration: e.target.value})} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Deskripsi</label>
                <textarea placeholder="Aplikasi epoxy self-leveling untuk gudang farmasi dengan standar GMP..." value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({...portfolioForm, description: e.target.value})} rows={3} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Foto Proyek (Before/After)</label>
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-[#334155] rounded-lg p-6 text-center hover:border-blue-500/50 transition-all">
                    <svg className="w-6 h-6 text-gray-500 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                    <p className="text-xs text-gray-500">Upload foto before & after</p>
                  </div>
                  <input type="file" accept="image/*" multiple onChange={(e) => {
                    if (e.target.files) {
                      Array.from(e.target.files).forEach(async (file) => {
                        const fd = new FormData(); fd.append("file", file); fd.append("category", "portfolio");
                        await fetch("/api/upload", { method: "POST", body: fd });
                      });
                      fetchImages();
                      setMessage({ type: "success", text: `${e.target.files.length} foto diupload ke kategori portfolio` });
                    }
                  }} className="hidden" />
                </label>
              </div>
              <button onClick={handlePortfolioSubmit} className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                Simpan Proyek
              </button>
            </div>
          </div>
        )}

        {/* ===== TESTIMONIAL TAB ===== */}
        {activeTab === "testimonial" && (
          <div className="max-w-2xl">
            <h2 className="text-base font-semibold text-white mb-6">Tambah Testimoni Klien</h2>
            <div className="card p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nama Klien *</label>
                  <input type="text" placeholder="Budi Santoso" value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Jabatan / Role</label>
                  <input type="text" placeholder="Plant Manager" value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Perusahaan</label>
                  <input type="text" placeholder="PT Industrial Indonesia" value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({...testimonialForm, company: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Rating</label>
                  <select value={testimonialForm.rating} onChange={(e) => setTestimonialForm({...testimonialForm, rating: e.target.value})} className={inputClass}>
                    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                    <option value="4">⭐⭐⭐⭐ (4)</option>
                    <option value="3">⭐⭐⭐ (3)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Testimoni *</label>
                <textarea placeholder="Kualitas pekerjaan sangat memuaskan. Lantai gudang kami sekarang bersih dan mudah dirawat..." value={testimonialForm.text}
                  onChange={(e) => setTestimonialForm({...testimonialForm, text: e.target.value})} rows={4} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Foto Klien (Opsional)</label>
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-[#334155] rounded-lg p-4 text-center hover:border-blue-500/50 transition-all">
                    <p className="text-xs text-gray-500">Upload foto klien (opsional)</p>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const fd = new FormData(); fd.append("file", e.target.files[0]); fd.append("category", "testimonial");
                      fetch("/api/upload", { method: "POST", body: fd }).then(() => fetchImages());
                      setMessage({ type: "success", text: "Foto klien diupload" });
                    }
                  }} className="hidden" />
                </label>
              </div>
              <button onClick={handleTestimonialSubmit} className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                Simpan Testimoni
              </button>
            </div>
          </div>
        )}

        {/* ===== API TAB ===== */}
        {activeTab === "api" && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-base font-semibold text-white mb-4">API Endpoints</h2>
            {[
              { method: "GET", url: "/api/articles", desc: "List semua artikel", example: "curl http://localhost:3000/api/articles", color: "bg-green-500/10 text-green-400 border-green-500/20" },
              { method: "POST", url: "/api/articles", desc: "Buat artikel baru", example: 'curl -X POST /api/articles -H "Content-Type: application/json" -d \'{"title":"...","content":"## ...","excerpt":"...","category":"Edukasi"}\'', color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
              { method: "GET", url: "/api/portfolio", desc: "List portofolio (filter: ?type=&location=)", example: "curl http://localhost:3000/api/portfolio?type=coating", color: "bg-green-500/10 text-green-400 border-green-500/20" },
              { method: "POST", url: "/api/upload", desc: "Upload gambar", example: 'curl -X POST /api/upload -F "file=@foto.jpg" -F "category=portfolio"', color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
              { method: "GET", url: "/api/images", desc: "List gambar terupload", example: "curl http://localhost:3000/api/images", color: "bg-green-500/10 text-green-400 border-green-500/20" },
              { method: "POST", url: "/api/leads", desc: "Track klik WhatsApp", example: 'curl -X POST /api/leads -H "Content-Type: application/json" -d \'{"source":"hero","page":"/"}\'', color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
            ].map((api) => (
              <div key={api.url + api.method} className="card p-5">
                <div className="flex items-start gap-2.5 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded border ${api.color}`}>{api.method}</span>
                  <div>
                    <code className="text-blue-400 text-sm">{api.url}</code>
                    <p className="text-xs text-gray-400 mt-0.5">{api.desc}</p>
                  </div>
                </div>
                <div className="bg-[#0F172A] rounded-lg p-3 mt-2">
                  <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap break-all">{api.example}</pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
