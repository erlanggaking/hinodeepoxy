import { getWhatsAppLink } from "@/lib/constants";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hinode-dark dot-grid" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-hinode-blue/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-hinode-gold/5 rounded-full blur-[128px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hinode-blue/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hinode-surface border border-hinode-border mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-hinode-success animate-pulse" />
          <span className="text-sm text-hinode-gray">
            Melayani Jabodetabek, Jawa Barat & Banten
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-6 animate-slide-up">
          Solusi{" "}
          <span className="gradient-text">Lantai Epoxy</span>
          <br />
          Profesional & Terpercaya
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-hinode-gray max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Aplikator lantai epoxy berpengalaman untuk industri, komersial, dan residensial.
          Kualitas premium dengan garansi hingga 5 tahun.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-cta"
            className="btn-whatsapp text-lg px-8 py-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Konsultasi Gratis
          </a>
          <Link href="/layanan" id="hero-services-cta" className="btn-secondary text-lg px-8 py-4">
            Lihat Layanan
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          {[
            { value: "500+", label: "Proyek Selesai" },
            { value: "100K+", label: "m² Terpasang" },
            { value: "8+", label: "Tahun Pengalaman" },
            { value: "99%", label: "Klien Puas" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-hinode-surface/50 border border-hinode-border/50"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text font-[family-name:var(--font-heading)]">
                {stat.value}
              </div>
              <div className="text-sm text-hinode-gray mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hinode-dark to-transparent" />
    </section>
  );
}
