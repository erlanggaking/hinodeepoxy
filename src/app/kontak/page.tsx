import { BRAND, getWhatsAppLink } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi HINODE EPOXY untuk konsultasi gratis, survei lokasi, dan estimasi harga epoxy lantai.",
};

export default function KontakPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-h-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-h-green bg-h-green-light rounded-full mb-3">Kontak</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">Hubungi <span className="gradient-text">Kami</span></h1>
          <p className="text-h-text-secondary text-lg max-w-2xl mx-auto">Siap memulai proyek epoxy Anda? Konsultasi gratis dan estimasi harga.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="card p-6 block hover-glow group border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-h-green-light flex items-center justify-center text-h-green flex-shrink-0 text-xl group-hover:scale-105 transition-transform">💬</div>
                <div><h3 className="font-semibold font-[family-name:var(--font-heading)] mb-0.5">WhatsApp (Respon Tercepat)</h3><p className="text-h-green font-semibold text-lg">{BRAND.phone}</p><p className="text-sm text-h-text-muted mt-0.5">Klik untuk langsung chat — Respon 24 jam</p></div>
              </div>
            </a>
            <div className="card p-6"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-h-blue-light flex items-center justify-center text-h-blue flex-shrink-0 text-xl">📞</div><div><h3 className="font-semibold font-[family-name:var(--font-heading)] mb-0.5">Telepon</h3><p className="text-h-blue font-semibold">{BRAND.phone}</p><p className="text-sm text-h-text-muted mt-0.5">Senin - Sabtu, 08:00 - 17:00 WIB</p></div></div></div>
            <div className="card p-6"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-h-gold-light flex items-center justify-center text-h-gold flex-shrink-0 text-xl">✉️</div><div><h3 className="font-semibold font-[family-name:var(--font-heading)] mb-0.5">Email</h3><p className="text-h-gold font-semibold">{BRAND.email}</p><p className="text-sm text-h-text-muted mt-0.5">Untuk proposal dan penawaran resmi</p></div></div></div>
            <div className="card p-6"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0 text-xl">📍</div><div><h3 className="font-semibold font-[family-name:var(--font-heading)] mb-0.5">Alamat</h3><p className="text-purple-600 font-medium">{BRAND.address}</p><p className="text-sm text-h-text-muted mt-0.5">Kunjungi kami dengan appointment</p></div></div></div>
          </div>
          <div className="rounded-xl overflow-hidden border border-h-border h-[400px] lg:h-full min-h-[400px] shadow-sm">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.17393878!2d106.68838!3d-6.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f946171aa003%3A0x5027a76e355e7e0!2sKalideres%2C%20Kec.%20Kalideres%2C%20Kota%20Jakarta%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi HINODE EPOXY" />
          </div>
        </div>
      </section>
      <section className="section-padding bg-h-bg">
        <div className="max-w-3xl mx-auto card p-8 text-center">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Jam <span className="gradient-text">Operasional</span></h2>
          <div className="space-y-3">
            {[{ day: "Senin - Jumat", hours: "08:00 - 17:00 WIB", on: true }, { day: "Sabtu", hours: "08:00 - 15:00 WIB", on: true }, { day: "Minggu & Hari Libur", hours: "Tutup (WhatsApp tetap aktif)", on: false }].map((s) => (
              <div key={s.day} className="flex items-center justify-between py-3 px-4 rounded-lg bg-h-bg border border-h-border/50">
                <span className="font-medium">{s.day}</span>
                <span className={s.on ? "text-h-green font-medium" : "text-h-text-muted"}>{s.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
