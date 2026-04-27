"use client";

import { useState, useEffect, useRef } from "react";
import { getWhatsAppLink } from "@/lib/constants";
import Link from "next/link";

function AnimatedNumber({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}{suffix}</span>;
}

export default function HeroSection() {
  const [showPromo, setShowPromo] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const timer = setInterval(() => {
      const diff = end.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const painPoints = [
    "Lantai pabrik Anda berdebu & sulit dibersihkan?",
    "Lantai gudang retak dan tidak aman untuk forklift?",
    "Ingin lantai showroom yang glossy dan premium?",
    "Butuh lantai anti bakteri untuk area steril?",
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % painPoints.length), 3500);
    return () => clearInterval(t);
  }, [painPoints.length]);

  return (
    <>
      {/* Promo Banner */}
      {showPromo && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-h-blue text-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm">
            <span className="font-semibold hidden sm:inline">Promo Terbatas</span>
            <span className="font-bold text-white/90">
              Diskon <span className="text-yellow-300 font-extrabold">30%</span> untuk 5 klien pertama
            </span>
            <span className="text-white/50 hidden sm:inline">•</span>
            <span className="font-mono font-bold bg-white/15 px-2 py-0.5 rounded text-xs tabular-nums hidden sm:inline">
              {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <button onClick={() => setShowPromo(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-lg leading-none" aria-label="Close">×</button>
          </div>
        </div>
      )}

      <section id="hero-section" className={`relative overflow-hidden ${showPromo ? "pt-10" : ""}`}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-h-blue-50 via-white to-h-bg" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-h-blue/[0.04] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-h-blue/[0.03] rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 sm:pb-28">
          {/* Pain Point Rotator */}
          <div className="text-center mb-5 h-8 flex items-center justify-center overflow-hidden">
            <div key={currentSlide} className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-h-red-light border border-red-200 text-h-red text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-h-red animate-pulse" />
                {painPoints[currentSlide]}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-heading)] leading-[1.08] mb-5 text-h-text animate-slide-up">
              Kami Ubah Lantai Lama Anda
              <br />
              Jadi <span className="gradient-text">Sekelas Showroom</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-h-text-secondary max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Dalam <strong className="text-h-text">3–7 hari</strong> tanpa bongkar lantai lama.
              Garansi hingga <strong className="text-h-text">5 tahun</strong>.
              Melayani seluruh Jabodetabek & Jawa Barat.
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-h-border text-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-h-text-secondary"><strong className="text-h-text">12 orang</strong> sedang melihat</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-h-gold-light border border-yellow-200 text-sm">
              <span className="text-h-gold font-semibold">Sisa 3 slot promo bulan ini</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <a
              href={getWhatsAppLink("Halo HINODE EPOXY! Saya mau klaim DISKON 30% untuk proyek epoxy lantai. Bisa survei gratis?")}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-cta"
              className="btn-whatsapp text-base sm:text-lg px-8 py-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Klaim Diskon 30%
            </a>
            <Link href="/layanan" className="btn-secondary text-base px-8 py-4">
              Lihat Harga & Paket →
            </Link>
          </div>
          <p className="text-center text-sm text-h-text-muted mb-16 animate-slide-up" style={{ animationDelay: "0.25s" }}>
            ✓ Gratis Survei &nbsp;&middot;&nbsp; ✓ Gratis Estimasi &nbsp;&middot;&nbsp; ✓ Tanpa DP
          </p>

          {/* Before/After */}
          <div className="max-w-3xl mx-auto animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="card p-1 shadow-lg shadow-black/[0.04]">
              <div className="grid grid-cols-2 gap-1">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-l-2xl flex items-center justify-center">
                  <div className="text-center"><div className="text-4xl sm:text-5xl mb-2 grayscale">🏚️</div><div className="text-sm font-medium text-h-text-secondary">Sebelum</div><div className="text-xs text-h-text-muted">Berdebu, retak, kusam</div></div>
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-red-500 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">Before</div>
                </div>
                <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-r-2xl flex items-center justify-center">
                  <div className="text-center"><div className="text-4xl sm:text-5xl mb-2">✨</div><div className="text-sm font-medium text-h-blue">Epoxy HINODE</div><div className="text-xs text-h-text-muted">Glossy, anti debu, premium</div></div>
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-h-green rounded-md text-[10px] font-bold text-white uppercase tracking-wider">After</div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full gradient-blue flex items-center justify-center text-white font-bold text-xs shadow-md border-2 border-white">VS</div>
              </div>
              <div className="bg-h-bg px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-b-2xl">
                <p className="text-sm text-h-text-secondary"><strong className="text-h-text">500+ lantai</strong> sudah kami transformasi</p>
                <Link href="/portofolio" className="text-sm text-h-blue font-medium hover:underline">Lihat Portofolio →</Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { target: 500, suffix: "+", label: "Proyek Selesai", icon: "🏗️" },
              { target: 100000, suffix: "+", label: "m² Terpasang", icon: "📐" },
              { target: 8, suffix: "+", label: "Tahun Pengalaman", icon: "🏆" },
              { target: 99, suffix: "%", label: "Klien Puas", icon: "⭐" },
            ].map((stat, i) => (
              <div key={stat.label} className="p-4 rounded-xl bg-white border border-h-border text-center shadow-sm animate-slide-up" style={{ animationDelay: `${0.4 + i * 0.08}s` }}>
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-h-blue font-[family-name:var(--font-heading)]">
                  <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-h-text-muted mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
