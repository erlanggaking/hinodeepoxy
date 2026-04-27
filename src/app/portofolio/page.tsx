"use client";
import { useState } from "react";
import portfolioData from "@/data/portfolio.json";

const typeLabels: Record<string, { label: string; color: string }> = {
  coating: { label: "Coating", color: "bg-h-blue-light text-h-blue" },
  "self-leveling": { label: "Self-Leveling", color: "bg-h-gold-light text-h-gold" },
  "heavy-duty": { label: "Heavy Duty", color: "bg-purple-50 text-purple-600" },
};

export default function PortfolioPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? portfolioData : portfolioData.filter((p) => p.type === filter);

  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-h-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-h-gold bg-h-gold-light rounded-full mb-3">Portofolio</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">Galeri <span className="gradient-text">Proyek Kami</span></h1>
          <p className="text-h-text-secondary text-lg max-w-2xl mx-auto">Lihat hasil kerja profesional kami di berbagai lokasi.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {[{ value: "all", label: "Semua" }, { value: "coating", label: "Coating" }, { value: "self-leveling", label: "Self-Leveling" }, { value: "heavy-duty", label: "Heavy Duty" }].map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${filter === f.value ? "gradient-blue text-white shadow-sm" : "bg-h-bg border border-h-border text-h-text-secondary hover:border-h-blue/30"}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project) => {
              const typeInfo = typeLabels[project.type] || typeLabels.coating;
              return (
                <div key={project.id} className="card overflow-hidden hover-lift">
                  <div className="relative h-48 bg-h-bg-alt flex items-center justify-center">
                    <svg className="w-10 h-10 text-h-border" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                    <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 text-xs font-medium rounded-md ${typeInfo.color}`}>{typeInfo.label}</span>
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-xs font-medium rounded-md bg-h-bg text-h-text-muted border border-h-border">{project.year}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-h-text font-[family-name:var(--font-heading)] mb-2">{project.title}</h3>
                    <p className="text-sm text-h-text-muted mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-h-text-muted">
                      <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-h-blue" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>{project.location}</span>
                      <span>{project.area}</span>
                      <span>{project.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && <div className="text-center py-16 text-h-text-muted">Belum ada proyek untuk kategori ini.</div>}
        </div>
      </section>
    </div>
  );
}
