import { BRAND, getWhatsAppLink } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali HINODE EPOXY lebih dekat. Aplikator lantai epoxy profesional dengan pengalaman 8+ tahun.",
};

export default function TentangPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-h-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-h-blue bg-h-blue-light rounded-full mb-3">Tentang Kami</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">Kenali <span className="gradient-text">HINODE EPOXY</span></h1>
          <p className="text-h-text-secondary text-lg max-w-2xl mx-auto">Komitmen kami adalah memberikan solusi lantai epoxy terbaik dengan kualitas premium.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-medium text-h-blue uppercase tracking-wider">Cerita Kami</span>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-5">Lebih dari Sekedar Aplikator</h2>
            <div className="space-y-4 text-h-text-secondary leading-relaxed">
              <p>HINODE EPOXY didirikan dengan misi menyediakan solusi lantai epoxy berkualitas tinggi yang terjangkau untuk industri, komersial, dan residensial di Indonesia.</p>
              <p>Dengan pengalaman lebih dari 8 tahun dan ratusan proyek selesai, kami memahami bahwa setiap lantai memiliki kebutuhan unik. Tim ahli kami memastikan standar kualitas tertinggi di setiap proyek.</p>
              <p>Dari gudang farmasi hingga showroom mewah, dari pabrik otomotif hingga cafe modern — kami telah membuktikan keahlian di berbagai sektor.</p>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-h-bg-alt border border-h-border flex items-center justify-center">
            <div className="text-center text-h-text-muted"><svg className="w-14 h-14 mx-auto mb-2 text-h-border" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg><p className="text-sm">Foto Tim HINODE EPOXY</p></div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-h-bg">
        <div className="max-w-7xl mx-auto"><h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-center mb-10">Mengapa <span className="gradient-text">Memilih Kami?</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🛡️", title: "Garansi Resmi", desc: "Garansi hingga 5 tahun untuk setiap proyek." },
              { icon: "👷", title: "Tim Profesional", desc: "Aplikator bersertifikat dengan pelatihan reguler." },
              { icon: "⏱️", title: "On-Time Delivery", desc: "Komitmen menyelesaikan proyek sesuai jadwal." },
              { icon: "💰", title: "Harga Kompetitif", desc: "Harga terbaik tanpa mengorbankan kualitas." },
            ].map((v) => (
              <div key={v.title} className="card p-6 hover-lift text-center">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-1.5">{v.title}</h3>
                <p className="text-sm text-h-text-secondary">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-4">Area <span className="gradient-text">Layanan</span></h2>
          <p className="text-h-text-secondary mb-8">Kami melayani seluruh Jabodetabek, Jawa Barat, dan Banten.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {["Jakarta Barat", "Jakarta Pusat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara", "Bogor", "Depok", "Tangerang", "Tangerang Selatan", "Bekasi", "Cikarang", "Karawang", "Bandung", "Serang", "Cilegon"].map((a) => (
              <span key={a} className="px-3.5 py-2 rounded-lg bg-h-bg border border-h-border text-sm text-h-text-secondary">📍 {a}</span>
            ))}
          </div>
          <div className="mt-10">
            <a href={getWhatsAppLink("Halo HINODE EPOXY, saya ingin tahu apakah area saya terjangkau.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Cek Jangkauan Area</a>
          </div>
        </div>
      </section>
    </div>
  );
}
