import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

export default function PortfolioPreview() {
  const projects = portfolioData.slice(0, 4);

  const typeLabels: Record<string, { label: string; color: string }> = {
    coating: { label: "Coating", color: "bg-hinode-blue/10 text-hinode-blue border-hinode-blue/20" },
    "self-leveling": { label: "Self-Leveling", color: "bg-hinode-gold/10 text-hinode-gold border-hinode-gold/20" },
    "heavy-duty": { label: "Heavy Duty", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  };

  return (
    <section id="portfolio-preview" className="section-padding relative bg-hinode-darker">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hinode-border to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-hinode-gold bg-hinode-gold/10 rounded-full border border-hinode-gold/20 mb-4">
            Portofolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Proyek{" "}
            <span className="gradient-text">Terbaru Kami</span>
          </h2>
          <p className="text-hinode-gray text-lg max-w-2xl mx-auto">
            Lihat hasil kerja kami di berbagai lokasi di Jabodetabek dan sekitarnya.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => {
            const typeInfo = typeLabels[project.type] || typeLabels.coating;
            return (
              <div
                key={project.id}
                className="card overflow-hidden group hover-lift"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-hinode-surface to-hinode-surface-light overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-hinode-border mx-auto mb-2 group-hover:text-hinode-blue/30 transition-colors" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                      <span className="text-xs text-hinode-gray">Foto Proyek</span>
                    </div>
                  </div>
                  {/* Type Badge */}
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-lg border ${typeInfo.color}`}>
                    {typeInfo.label}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-hinode-white mb-2 font-[family-name:var(--font-heading)] line-clamp-2 group-hover:text-hinode-blue transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-hinode-gray mb-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {project.location}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-hinode-gray">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                      {project.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/portofolio" className="btn-secondary">
            Lihat Semua Proyek
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
