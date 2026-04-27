import { BRAND, getWhatsAppLink } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali HINODE EPOXY lebih dekat. Aplikator lantai epoxy profesional dengan pengalaman 8+ tahun melayani Jabodetabek, Jawa Barat, dan Banten.",
};

export default function TentangPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative bg-hinode-darker">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-hinode-blue/5 rounded-full blur-[128px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 text-sm font-medium text-hinode-blue bg-hinode-blue/10 rounded-full border border-hinode-blue/20 mb-4">
            Tentang Kami
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Kenali <span className="gradient-text">HINODE EPOXY</span>
          </h1>
          <p className="text-hinode-gray text-lg max-w-2xl mx-auto">
            Komitmen kami adalah memberikan solusi lantai epoxy terbaik dengan kualitas premium dan layanan profesional.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-medium text-hinode-blue uppercase tracking-wider">Cerita Kami</span>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-6">
                Lebih dari Sekedar <span className="gradient-text">Aplikator Epoxy</span>
              </h2>
              <div className="space-y-4 text-hinode-gray leading-relaxed">
                <p>
                  HINODE EPOXY didirikan dengan satu misi: menyediakan solusi lantai epoxy berkualitas tinggi yang terjangkau untuk industri, komersial, dan residensial di Indonesia.
                </p>
                <p>
                  Dengan pengalaman lebih dari 8 tahun dan ratusan proyek yang telah selesai, kami memahami bahwa setiap lantai memiliki kebutuhan unik. Tim ahli kami selalu memastikan setiap proyek dikerjakan dengan standar kualitas tertinggi.
                </p>
                <p>
                  Dari gudang farmasi hingga showroom mewah, dari pabrik otomotif hingga cafe modern — kami telah membuktikan keahlian kami di berbagai sektor.
                </p>
              </div>
            </div>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-hinode-surface to-hinode-surface-light border border-hinode-border flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-hinode-border mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                <p className="text-sm text-hinode-gray">Foto Tim HINODE EPOXY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-hinode-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-4">
              Mengapa <span className="gradient-text">Memilih Kami?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: "Garansi Resmi",
                desc: "Garansi hingga 5 tahun untuk setiap proyek. Jaminan kualitas dan kepuasan klien.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
                title: "Tim Profesional",
                desc: "Aplikator bersertifikat dengan pelatihan reguler untuk menjaga standar kualitas.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "On-Time Delivery",
                desc: "Tepat waktu adalah prioritas. Kami berkomitmen menyelesaikan proyek sesuai jadwal.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                ),
                title: "Harga Kompetitif",
                desc: "Harga terbaik tanpa mengorbankan kualitas. Gratis survei dan estimasi.",
              },
            ].map((val) => (
              <div key={val.title} className="card p-6 hover-lift text-center">
                <div className="w-14 h-14 rounded-xl bg-hinode-blue/10 border border-hinode-blue/20 flex items-center justify-center text-hinode-blue mx-auto mb-4">
                  {val.icon}
                </div>
                <h3 className="text-lg font-semibold text-hinode-white font-[family-name:var(--font-heading)] mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-hinode-gray">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Area <span className="gradient-text">Layanan</span>
          </h2>
          <p className="text-hinode-gray mb-10">
            Kami melayani seluruh wilayah Jabodetabek, Jawa Barat, dan Banten.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Jakarta Barat", "Jakarta Pusat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara",
              "Bogor", "Depok", "Tangerang", "Tangerang Selatan", "Bekasi",
              "Cikarang", "Karawang", "Bandung", "Serang", "Cilegon",
            ].map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-xl bg-hinode-surface border border-hinode-border text-sm text-hinode-gray hover:border-hinode-blue/30 hover:text-hinode-blue transition-all cursor-default"
              >
                📍 {area}
              </span>
            ))}
          </div>

          <div className="mt-12">
            <a
              href={getWhatsAppLink("Halo HINODE EPOXY, saya ingin tahu apakah area saya termasuk jangkauan layanan. Lokasi saya di: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Cek Jangkauan Area Anda
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
