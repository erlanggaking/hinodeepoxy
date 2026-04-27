"use client";

import { useState } from "react";
import portfolioData from "@/data/portfolio.json";
import { Metadata } from "next";

const typeLabels: Record<string, { label: string; color: string }> = {
  coating: { label: "Coating", color: "bg-hinode-blue/10 text-hinode-blue border-hinode-blue/20" },
  "self-leveling": { label: "Self-Leveling", color: "bg-hinode-gold/10 text-hinode-gold border-hinode-gold/20" },
  "heavy-duty": { label: "Heavy Duty", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>("all");
  
  const filtered = filter === "all"
    ? portfolioData
    : portfolioData.filter((p) => p.type === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative bg-hinode-darker">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-hinode-gold/5 rounded-full blur-[128px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 text-sm font-medium text-hinode-gold bg-hinode-gold/10 rounded-full border border-hinode-gold/20 mb-4">
            Portofolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Galeri <span className="gradient-text">Proyek Kami</span>
          </h1>
          <p className="text-hinode-gray text-lg max-w-2xl mx-auto">
            Lihat hasil kerja profesional kami di berbagai lokasi. Setiap proyek dikerjakan dengan standar kualitas tertinggi.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {[
              { value: "all", label: "Semua" },
              { value: "coating", label: "Coating" },
              { value: "self-leveling", label: "Self-Leveling" },
              { value: "heavy-duty", label: "Heavy Duty" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                id={`filter-${f.value}`}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === f.value
                    ? "gradient-blue text-white shadow-lg shadow-hinode-blue/20"
                    : "bg-hinode-surface border border-hinode-border text-hinode-gray hover:border-hinode-blue/30 hover:text-hinode-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => {
              const typeInfo = typeLabels[project.type] || typeLabels.coating;
              return (
                <div
                  key={project.id}
                  className="card overflow-hidden group hover-lift"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-gradient-to-br from-hinode-surface to-hinode-surface-light overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 text-hinode-border mx-auto mb-2 group-hover:text-hinode-blue/30 transition-colors" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                        <span className="text-xs text-hinode-gray">Before & After</span>
                      </div>
                    </div>
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-lg border ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-lg bg-hinode-dark/80 text-hinode-gray border border-hinode-border">
                      {project.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-hinode-white font-[family-name:var(--font-heading)] mb-2 group-hover:text-hinode-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-hinode-gray mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-hinode-gray">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-hinode-blue" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-hinode-blue" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        {project.area}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-hinode-blue" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-hinode-gray">
              <p>Belum ada proyek untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
