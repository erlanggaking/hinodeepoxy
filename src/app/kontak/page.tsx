import { BRAND, getWhatsAppLink } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi HINODE EPOXY untuk konsultasi gratis, survei lokasi, dan estimasi harga epoxy lantai. Kami siap melayani Anda 24 jam via WhatsApp.",
};

export default function KontakPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative bg-hinode-darker">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-hinode-success/5 rounded-full blur-[128px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 text-sm font-medium text-hinode-success bg-hinode-success/10 rounded-full border border-hinode-success/20 mb-4">
            Kontak
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Hubungi <span className="gradient-text">Kami</span>
          </h1>
          <p className="text-hinode-gray text-lg max-w-2xl mx-auto">
            Siap memulai proyek epoxy Anda? Hubungi kami untuk konsultasi gratis dan estimasi harga.
          </p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* WhatsApp - Primary CTA */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp"
                className="card p-8 hover-glow group block border-green-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-hinode-white font-[family-name:var(--font-heading)] mb-1">
                      WhatsApp (Respon Tercepat)
                    </h3>
                    <p className="text-green-400 font-medium text-lg">{BRAND.phone}</p>
                    <p className="text-sm text-hinode-gray mt-1">Klik untuk langsung chat — Respon 24 jam</p>
                  </div>
                </div>
              </a>

              {/* Phone */}
              <div className="card p-8 hover-glow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-hinode-blue/10 border border-hinode-blue/20 flex items-center justify-center text-hinode-blue flex-shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-hinode-white font-[family-name:var(--font-heading)] mb-1">
                      Telepon
                    </h3>
                    <p className="text-hinode-blue font-medium text-lg">{BRAND.phone}</p>
                    <p className="text-sm text-hinode-gray mt-1">Senin - Sabtu, 08:00 - 17:00 WIB</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card p-8 hover-glow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-hinode-gold/10 border border-hinode-gold/20 flex items-center justify-center text-hinode-gold flex-shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-hinode-white font-[family-name:var(--font-heading)] mb-1">
                      Email
                    </h3>
                    <p className="text-hinode-gold font-medium">{BRAND.email}</p>
                    <p className="text-sm text-hinode-gray mt-1">Untuk proposal dan penawaran resmi</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card p-8 hover-glow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-hinode-white font-[family-name:var(--font-heading)] mb-1">
                      Alamat
                    </h3>
                    <p className="text-purple-400 font-medium">{BRAND.address}</p>
                    <p className="text-sm text-hinode-gray mt-1">Kunjungi kami dengan appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden border border-hinode-border h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.17393878!2d106.68838!3d-6.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f946171aa003%3A0x5027a76e355e7e0!2sKalideres%2C%20Kec.%20Kalideres%2C%20Kota%20Jakarta%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi HINODE EPOXY - Kalideres, Jakarta Barat"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="section-padding bg-hinode-darker">
        <div className="max-w-3xl mx-auto">
          <div className="card p-8">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-center mb-8">
              Jam <span className="gradient-text">Operasional</span>
            </h2>
            <div className="space-y-4">
              {[
                { day: "Senin - Jumat", hours: "08:00 - 17:00 WIB", active: true },
                { day: "Sabtu", hours: "08:00 - 15:00 WIB", active: true },
                { day: "Minggu & Hari Libur", hours: "Tutup (WhatsApp tetap bisa)", active: false },
              ].map((schedule) => (
                <div
                  key={schedule.day}
                  className="flex items-center justify-between py-3 px-4 rounded-xl bg-hinode-surface/50 border border-hinode-border/50"
                >
                  <span className="text-hinode-white font-medium">{schedule.day}</span>
                  <span className={schedule.active ? "text-hinode-success" : "text-hinode-gray"}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
