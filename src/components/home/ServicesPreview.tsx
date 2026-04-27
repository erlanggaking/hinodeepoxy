import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function ServicesPreview() {
  const services = Object.values(SERVICES);

  const icons = [
    // Coating
    <svg key="coating" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>,
    // Self-Leveling
    <svg key="self-leveling" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>,
    // Heavy Duty
    <svg key="heavy-duty" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M20.49 5.51a12 12 0 01-14.97 14.97M4.93 19.07a12 12 0 0114.97-14.97M15.17 11.42l-5.1-5.1" />
    </svg>,
  ];

  const tagColors = [
    "bg-hinode-blue/10 text-hinode-blue border-hinode-blue/20",
    "bg-hinode-gold/10 text-hinode-gold border-hinode-gold/20",
    "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ];

  return (
    <section id="services-preview" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hinode-border to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-hinode-blue bg-hinode-blue/10 rounded-full border border-hinode-blue/20 mb-4">
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            3 Paket Solusi{" "}
            <span className="gradient-text">Epoxy Premium</span>
          </h2>
          <p className="text-hinode-gray text-lg max-w-2xl mx-auto">
            Setiap proyek memiliki kebutuhan unik. Pilih paket yang paling sesuai dengan kebutuhan Anda.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`card p-8 hover-lift glossy-overlay group ${
                index === 1 ? "md:-translate-y-4 border-hinode-blue/30" : ""
              }`}
            >
              {/* Popular Badge */}
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-blue rounded-full text-sm font-semibold text-white">
                  Paling Populer
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${tagColors[index]} border flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                {icons[index]}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-hinode-white mb-2">
                {service.name}
              </h3>
              <p className="text-hinode-gray text-sm mb-6">{service.shortDesc}</p>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-hinode-border">
                <span className="text-sm text-hinode-gray">Mulai dari</span>
                <div className="text-2xl font-bold gradient-text font-[family-name:var(--font-heading)]">
                  {formatCurrency(service.pricePerM2)}
                  <span className="text-sm text-hinode-gray font-normal"> /m²</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-hinode-gray">
                    <svg className="w-4 h-4 text-hinode-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/layanan"
                className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                  index === 1
                    ? "btn-primary w-full justify-center"
                    : "btn-secondary w-full justify-center"
                }`}
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
