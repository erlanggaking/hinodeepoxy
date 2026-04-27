"use client";

import { useState } from "react";
import { SERVICES, getWhatsAppLink } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

function PriceCalculator() {
  const [area, setArea] = useState<number>(100);
  const [selectedPackage, setSelectedPackage] = useState<string>("coating");
  const service = SERVICES[selectedPackage as keyof typeof SERVICES];
  const estimate = area * service.pricePerM2;

  return (
    <div id="price-calculator" className="card p-8 border-h-blue/20 shadow-lg">
      <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-h-text mb-1">Kalkulator Estimasi Harga</h3>
      <p className="text-sm text-h-text-muted mb-7">Masukkan luas area dan pilih paket untuk estimasi harga.</p>

      <div className="mb-5">
        <label className="block text-sm font-medium text-h-text-secondary mb-2">Pilih Paket</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {Object.values(SERVICES).map((s) => {
            const key = s.id === "self-leveling" ? "selfLeveling" : s.id === "heavy-duty" ? "heavyDuty" : "coating";
            return (
              <button key={s.id} onClick={() => setSelectedPackage(key)}
                className={`p-3.5 rounded-xl border text-left transition-all ${service.id === s.id ? "border-h-blue bg-h-blue-50 ring-1 ring-h-blue/20" : "border-h-border bg-white hover:border-h-blue/30"}`}>
                <div className="font-semibold text-sm text-h-text">{s.name}</div>
                <div className="text-xs text-h-text-muted mt-0.5">{formatCurrency(s.pricePerM2)}/m²</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-7">
        <label className="block text-sm font-medium text-h-text-secondary mb-2">Luas Area (m²)</label>
        <div className="flex items-center gap-3">
          <input type="range" min={10} max={5000} step={10} value={area} onChange={(e) => setArea(parseInt(e.target.value))}
            className="flex-1 h-2 bg-h-bg-alt rounded-lg appearance-none cursor-pointer accent-h-blue" />
          <div className="flex items-center gap-1">
            <input type="number" value={area} onChange={(e) => setArea(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-20 px-3 py-2 bg-h-bg border border-h-border rounded-lg text-h-text text-center text-sm focus:border-h-blue focus:outline-none" />
            <span className="text-sm text-h-text-muted">m²</span>
          </div>
        </div>
      </div>

      <div className="bg-h-bg rounded-xl p-5 border border-h-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm text-h-text-muted">Estimasi Harga Total</div>
            <div className="text-3xl font-bold text-h-blue font-[family-name:var(--font-heading)]">{formatCurrency(estimate)}</div>
            <div className="text-xs text-h-text-muted mt-0.5">{service.name} • {area} m² × {formatCurrency(service.pricePerM2)}/m²</div>
          </div>
          <a href={getWhatsAppLink(`Halo HINODE EPOXY, saya tertarik paket ${service.name} untuk ${area}m². Estimasi: ${formatCurrency(estimate)}. Info lebih lanjut?`)}
            target="_blank" rel="noopener noreferrer" className="btn-whatsapp whitespace-nowrap">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Minta Penawaran
          </a>
        </div>
      </div>
      <p className="text-xs text-h-text-muted mt-3 text-center">* Harga estimasi. Aktual tergantung kondisi lantai, lokasi, dan spesifikasi.</p>
    </div>
  );
}

export default function LayananPage() {
  const services = Object.values(SERVICES);
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-h-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-h-blue bg-h-blue-light rounded-full mb-3">Layanan</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">Solusi <span className="gradient-text">Epoxy Lantai</span> untuk Setiap Kebutuhan</h1>
          <p className="text-h-text-secondary text-lg max-w-2xl mx-auto">Dari coating ringan hingga heavy duty industrial. Kami menyediakan 3 paket layanan yang disesuaikan.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto space-y-10">
          {services.map((service, i) => (
            <div key={service.id} className={`card p-8 lg:p-10 ${i === 1 ? "border-h-blue/20" : ""}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  {i === 1 && <span className="inline-block px-3 py-1 text-xs font-semibold gradient-blue text-white rounded-full mb-3">Paling Populer</span>}
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">{service.name}</h2>
                  <p className="text-h-text-secondary mb-5">{service.shortDesc}</p>
                  <div className="mb-5"><span className="text-sm text-h-text-muted">Mulai dari </span><span className="text-3xl font-bold text-h-blue font-[family-name:var(--font-heading)]">{formatCurrency(service.pricePerM2)}</span><span className="text-h-text-muted"> /m²</span></div>
                  <ul className="space-y-2.5 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-h-text-secondary">
                        <svg className="w-4 h-4 text-h-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-h-text-muted mb-5"><strong className="text-h-text">Ideal untuk:</strong> {service.ideal}</p>
                  <a href={getWhatsAppLink(`Halo, saya tertarik dengan paket ${service.name}. Bisa info lebih lanjut?`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Konsultasi Paket {service.name}</a>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-video rounded-xl bg-h-bg-alt border border-h-border flex items-center justify-center">
                    <div className="text-center text-h-text-muted"><svg className="w-14 h-14 mx-auto mb-2 text-h-border" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg><p className="text-sm">Foto {service.name}</p></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section-padding bg-h-bg"><div className="max-w-3xl mx-auto"><PriceCalculator /></div></section>
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-center mb-10">Perbandingan <span className="gradient-text">Paket Layanan</span></h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-h-border"><th className="text-left py-3 px-4 text-h-text-muted font-medium">Fitur</th><th className="text-center py-3 px-4 font-semibold">Coating</th><th className="text-center py-3 px-4 text-h-blue font-semibold">Self-Leveling</th><th className="text-center py-3 px-4 font-semibold">Heavy Duty</th></tr></thead>
              <tbody className="divide-y divide-h-border/50">
                {[
                  { f: "Ketebalan", v: ["0.3-0.5mm", "1-3mm", "3-5mm"] },{ f: "Daya Tahan", v: ["3-5 tahun", "5-10 tahun", "10+ tahun"] },
                  { f: "Anti Debu", v: ["✓", "✓", "✓"] },{ f: "Anti Bakteri", v: ["—", "✓", "✓"] },{ f: "Anti Slip", v: ["—", "✓", "✓"] },
                  { f: "Tahan Forklift", v: ["—", "—", "✓"] },{ f: "Garansi", v: ["2 tahun", "3 tahun", "5 tahun"] },
                  { f: "Harga/m²", v: [formatCurrency(150000), formatCurrency(350000), formatCurrency(550000)] },
                ].map((r) => (
                  <tr key={r.f} className="hover:bg-h-bg/50 transition-colors"><td className="py-3 px-4 text-h-text-secondary">{r.f}</td>
                    {r.v.map((v, i) => <td key={i} className={`text-center py-3 px-4 ${i === 1 ? "text-h-blue font-medium" : "text-h-text-secondary"}`}>{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
