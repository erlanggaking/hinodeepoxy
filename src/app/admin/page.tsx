"use client";

import { useState, useEffect, useCallback } from "react";

interface UploadedImage {
  filename: string;
  url: string;
  category: string;
  size: number;
}

export default function AdminPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("logo");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "api">("upload");

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      if (data.success) setImages(data.data);
    } catch {
      console.error("Failed to fetch images");
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: `✅ Upload berhasil! URL: ${data.data.url}` });
        fetchImages();
      } else {
        setMessage({ type: "error", text: `❌ ${data.error}` });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Upload gagal. Coba lagi." });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="section-padding bg-hinode-darker pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Admin Dashboard</h1>
              <p className="text-sm text-hinode-gray">Upload logo, gambar, dan kelola backend</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "upload"
                  ? "gradient-blue text-white"
                  : "bg-hinode-surface border border-hinode-border text-hinode-gray hover:text-hinode-white"
              }`}
            >
              📤 Upload Gambar
            </button>
            <button
              onClick={() => setActiveTab("api")}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "api"
                  ? "gradient-blue text-white"
                  : "bg-hinode-surface border border-hinode-border text-hinode-gray hover:text-hinode-white"
              }`}
            >
              🔌 API Endpoints
            </button>
          </div>
        </div>
      </section>

      {activeTab === "upload" && (
        <section className="section-padding pt-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upload Form */}
              <div className="lg:col-span-1">
                <div className="card p-6 sticky top-24">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
                    Upload Gambar
                  </h2>

                  {/* Category Select */}
                  <div className="mb-4">
                    <label className="block text-sm text-hinode-gray mb-2">Kategori</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-hinode-surface border border-hinode-border rounded-xl text-hinode-white focus:border-hinode-blue focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="logo">🏷️ Logo</option>
                      <option value="portfolio">📸 Portfolio (Foto Proyek)</option>
                      <option value="services">🔧 Services (Foto Layanan)</option>
                      <option value="blog">📝 Blog (Gambar Artikel)</option>
                      <option value="general">📁 General</option>
                    </select>
                  </div>

                  {/* Upload Area */}
                  <label className="block cursor-pointer">
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      uploading
                        ? "border-hinode-blue bg-hinode-blue/5"
                        : "border-hinode-border hover:border-hinode-blue/50 hover:bg-hinode-surface/50"
                    }`}>
                      {uploading ? (
                        <div className="animate-pulse">
                          <svg className="w-10 h-10 text-hinode-blue mx-auto mb-3 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
                          </svg>
                          <p className="text-sm text-hinode-blue">Mengupload...</p>
                        </div>
                      ) : (
                        <>
                          <svg className="w-10 h-10 text-hinode-gray mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                          <p className="text-sm text-hinode-gray mb-1">
                            Klik atau drag & drop gambar
                          </p>
                          <p className="text-xs text-hinode-gray/60">
                            JPG, PNG, WebP, SVG • Max 5MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>

                  {/* Message */}
                  {message && (
                    <div className={`mt-4 p-3 rounded-xl text-sm ${
                      message.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}>
                      {message.text}
                    </div>
                  )}

                  {/* Instructions */}
                  <div className="mt-6 p-4 bg-hinode-surface/50 rounded-xl border border-hinode-border/50">
                    <h4 className="text-sm font-semibold text-hinode-white mb-2">💡 Panduan Upload</h4>
                    <ul className="space-y-2 text-xs text-hinode-gray">
                      <li>• <strong>Logo:</strong> Upload file logo perusahaan (PNG/SVG recommended)</li>
                      <li>• <strong>Portfolio:</strong> Foto before-after proyek epoxy</li>
                      <li>• <strong>Services:</strong> Foto jenis layanan (coating, self-leveling, etc.)</li>
                      <li>• <strong>Blog:</strong> Gambar untuk artikel/blog</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                    Gambar Terupload ({images.length})
                  </h2>
                  <button
                    onClick={fetchImages}
                    className="text-sm text-hinode-blue hover:text-hinode-blue-light transition-colors"
                  >
                    🔄 Refresh
                  </button>
                </div>

                {images.length === 0 ? (
                  <div className="card p-12 text-center">
                    <svg className="w-16 h-16 text-hinode-border mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                    <p className="text-hinode-gray mb-2">Belum ada gambar</p>
                    <p className="text-sm text-hinode-gray/60">Upload gambar pertama Anda di panel kiri</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {images.map((img) => (
                      <div key={img.url} className="card overflow-hidden group">
                        <div className="aspect-square bg-hinode-surface relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.url}
                            alt={img.filename}
                            className="w-full h-full object-cover"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(img.url);
                                setMessage({ type: "success", text: `📋 URL disalin: ${img.url}` });
                              }}
                              className="px-3 py-2 bg-hinode-blue/90 rounded-lg text-xs font-medium text-white hover:bg-hinode-blue transition-colors"
                            >
                              📋 Copy URL
                            </button>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-hinode-white truncate font-medium">{img.filename}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-hinode-blue bg-hinode-blue/10 px-2 py-0.5 rounded-full">
                              {img.category}
                            </span>
                            <span className="text-[10px] text-hinode-gray">{formatSize(img.size)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "api" && (
        <section className="section-padding pt-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
              API Endpoints
            </h2>

            {[
              {
                method: "GET",
                url: "/api/articles",
                desc: "List semua artikel blog",
                example: "curl http://localhost:3000/api/articles",
                color: "text-green-400 bg-green-500/10 border-green-500/20",
              },
              {
                method: "POST",
                url: "/api/articles",
                desc: "Buat artikel baru (dari AI Writer atau manual)",
                example: `curl -X POST http://localhost:3000/api/articles \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Judul","content":"## Konten","excerpt":"Ringkasan","category":"Edukasi"}'`,
                color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
              },
              {
                method: "GET",
                url: "/api/portfolio",
                desc: "List proyek portofolio (filter: ?type=coating&location=jakarta)",
                example: "curl http://localhost:3000/api/portfolio?type=coating",
                color: "text-green-400 bg-green-500/10 border-green-500/20",
              },
              {
                method: "POST",
                url: "/api/upload",
                desc: "Upload gambar (logo, portfolio, services, blog)",
                example: `curl -X POST http://localhost:3000/api/upload \\
  -F "file=@logo.png" \\
  -F "category=logo"`,
                color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
              },
              {
                method: "GET",
                url: "/api/images",
                desc: "List semua gambar yang sudah diupload",
                example: "curl http://localhost:3000/api/images",
                color: "text-green-400 bg-green-500/10 border-green-500/20",
              },
              {
                method: "POST",
                url: "/api/leads",
                desc: "Track klik WhatsApp untuk analytics",
                example: `curl -X POST http://localhost:3000/api/leads \\
  -H "Content-Type: application/json" \\
  -d '{"source":"hero-cta","page":"/"}'`,
                color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
              },
            ].map((api) => (
              <div key={api.url + api.method} className="card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${api.color}`}>
                    {api.method}
                  </span>
                  <div>
                    <code className="text-hinode-blue text-sm font-mono">{api.url}</code>
                    <p className="text-sm text-hinode-gray mt-1">{api.desc}</p>
                  </div>
                </div>
                <div className="bg-hinode-darker rounded-lg p-4 mt-3">
                  <pre className="text-xs text-hinode-gray font-mono whitespace-pre-wrap break-all">{api.example}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
