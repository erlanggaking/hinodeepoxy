import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function ServicesPreview() {
  const services = Object.values(SERVICES);

  return (
    <section id="services-preview" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-sm font-medium text-h-blue bg-h-blue-light rounded-full mb-3">Layanan Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-3">
            3 Paket Solusi Epoxy
          </h2>
          <p className="text-h-text-secondary max-w-xl mx-auto">
            Pilih paket yang paling sesuai dengan kebutuhan dan budget Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={service.id} className={`card p-7 hover-lift relative ${index === 1 ? "border-h-blue ring-1 ring-h-blue/20" : ""}`}>
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 gradient-blue rounded-full text-xs font-semibold text-white">Paling Populer</div>
              )}
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-1">{service.name}</h3>
              <p className="text-sm text-h-text-muted mb-5">{service.shortDesc}</p>
              <div className="mb-5 pb-5 border-b border-h-border">
                <span className="text-xs text-h-text-muted">Mulai dari</span>
                <div className="text-2xl font-bold text-h-blue font-[family-name:var(--font-heading)]">
                  {formatCurrency(service.pricePerM2)}<span className="text-sm text-h-text-muted font-normal"> /m²</span>
                </div>
              </div>
              <ul className="space-y-2.5 mb-7">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-h-text-secondary">
                    <svg className="w-4 h-4 text-h-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/layanan" className={`block w-full text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${index === 1 ? "btn-primary justify-center w-full" : "btn-secondary justify-center w-full"}`}>
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
