import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

export default function PortfolioPreview() {
  const projects = portfolioData.slice(0, 4);
  const typeLabels: Record<string, { label: string; color: string }> = {
    coating: { label: "Coating", color: "bg-h-blue-light text-h-blue" },
    "self-leveling": { label: "Self-Leveling", color: "bg-h-gold-light text-h-gold" },
    "heavy-duty": { label: "Heavy Duty", color: "bg-purple-50 text-purple-600" },
  };

  return (
    <section id="portfolio-preview" className="section-padding bg-h-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-sm font-medium text-h-gold bg-h-gold-light rounded-full mb-3">Portofolio</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-3">Proyek Terbaru Kami</h2>
          <p className="text-h-text-secondary max-w-xl mx-auto">Hasil kerja profesional di berbagai lokasi Jabodetabek.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project) => {
            const typeInfo = typeLabels[project.type] || typeLabels.coating;
            return (
              <div key={project.id} className="card overflow-hidden hover-lift">
                <div className="relative h-44 bg-h-bg-alt flex items-center justify-center">
                  <svg className="w-10 h-10 text-h-border" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                  <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 text-xs font-medium rounded-md ${typeInfo.color}`}>{typeInfo.label}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-h-text text-sm mb-1.5 font-[family-name:var(--font-heading)] line-clamp-2">{project.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-h-text-muted mb-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    {project.location}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-h-text-muted">
                    <span>{project.area}</span>
                    <span>•</span>
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/portofolio" className="btn-secondary">Lihat Semua Proyek →</Link>
        </div>
      </div>
    </section>
  );
}
