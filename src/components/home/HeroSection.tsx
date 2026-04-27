"use client";

import { useState, useEffect, useRef } from "react";
import { getWhatsAppLink } from "@/lib/constants";
import Link from "next/link";

// Animated counter component
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}{suffix}</span>;
}

export default function HeroSection() {
  const [showPromo, setShowPromo] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Countdown timer
  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
      } else {
        setTimeLeft({
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide pain points
  const painPoints = [
    "Lantai pabrik Anda berdebu & kotor? 😤",
    "Forklift merusak lantai beton Anda? 🏭",
    "Lantai gudang licin saat hujan? ⚠️",
    "Malu dengan lantai garasi yang kusam? 😕",
    "Lantai showroom tidak mencerminkan brand Anda? 💎",
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % painPoints.length);
    }, 3000);
    return () => clearInterval(slideTimer);
  }, [painPoints.length]);

  return (
    <>
      {/* TOP PROMO BANNER - Urgency Hook */}
      {showPromo && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm sm:text-base">
            <span className="animate-pulse text-lg">🔥</span>
            <span className="font-bold hidden sm:inline">PROMO TERBATAS!</span>
            <span className="font-medium">
              <span className="hidden sm:inline">Diskon </span>
              <span className="font-extrabold text-yellow-200 text-base sm:text-lg">30% OFF</span>
              <span className="hidden md:inline"> untuk 5 klien pertama bulan ini</span>
            </span>
            <span className="mx-1">•</span>
            <span className="font-mono font-bold bg-black/20 px-2 py-0.5 rounded text-yellow-200 tabular-nums">
              {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1"
              aria-label="Close promo"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <section
        id="hero-section"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${showPromo ? "pt-10" : ""}`}
      >
        {/* === BACKGROUND EFFECTS === */}
        <div className="absolute inset-0 bg-hinode-dark" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-hinode-blue/15 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-hinode-gold/8 rounded-full blur-[150px] animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hinode-accent/5 rounded-full blur-[200px]" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-hinode-blue/20 to-transparent animate-scan-line" />
        </div>

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hinode-blue/50 to-transparent" />

        {/* ============ MAIN CONTENT ============ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          
          {/* === ROTATING PAIN POINT HOOK === */}
          <div className="text-center mb-6 h-10 flex items-center justify-center overflow-hidden">
            <div 
              className="transition-all duration-500 ease-out"
              key={currentSlide}
              style={{ animation: "slide-up 0.5s ease-out" }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm sm:text-base font-medium">
                {painPoints[currentSlide]}
              </span>
            </div>
          </div>

          {/* === MAIN HEADLINE - THE HOOK === */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold font-[family-name:var(--font-heading)] leading-[1.05] mb-6 animate-slide-up">
              <span className="block text-hinode-white">Kami Ubah Lantai</span>
              <span className="block text-hinode-white">Jelek Anda Jadi</span>
              <span className="block relative">
                <span className="gradient-text">Semahal Showroom</span>
                {/* Sparkle decorations */}
                <svg className="absolute -top-4 -right-2 sm:-right-8 w-8 h-8 text-hinode-gold animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 15.4l-6.18 3.25L7 11.67 2 6.8l6.91-1.01L12 0z" />
                </svg>
                <svg className="absolute -bottom-2 -left-2 sm:-left-6 w-6 h-6 text-hinode-blue animate-pulse" style={{ animationDelay: "0.5s" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 15.4l-6.18 3.25L7 11.67 2 6.8l6.91-1.01L12 0z" />
                </svg>
              </span>
            </h1>

            {/* Sub-hook */}
            <p className="text-lg sm:text-xl md:text-2xl text-hinode-gray max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              Dalam <span className="text-hinode-white font-bold">3-7 hari</span> saja. 
              Tanpa bongkar lantai lama. 
              <span className="text-hinode-gold font-semibold"> Garansi hingga 5 tahun.</span>
            </p>
          </div>

          {/* === SOCIAL PROOF BAR === */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            {/* Live indicator */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-hinode-surface/80 border border-hinode-border text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-hinode-gray">
                <span className="text-hinode-white font-semibold">12 orang</span> sedang melihat
              </span>
            </div>
            
            {/* Slots remaining */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-sm">
              <span className="text-orange-400">⚡</span>
              <span className="text-orange-300 font-medium">
                Sisa <span className="font-bold text-orange-200">3 slot</span> promo bulan ini
              </span>
            </div>
          </div>

          {/* === CTA BUTTONS === */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <a
              href={getWhatsAppLink("Halo HINODE EPOXY! Saya mau klaim DISKON 30% untuk proyek epoxy lantai saya. Bisa survei gratis?")}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-cta"
              className="group relative btn-whatsapp text-lg px-10 py-5 animate-pulse-glow overflow-hidden"
            >
              {/* Shimmer effect on button */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="relative z-10">Klaim Diskon 30% Sekarang</span>
            </a>
            <Link href="/layanan" id="hero-services-cta" className="btn-secondary text-lg px-8 py-5 group">
              Lihat Harga & Paket
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* === TRUST LINE === */}
          <p className="text-center text-sm text-hinode-gray mb-14 animate-slide-up" style={{ animationDelay: "0.25s" }}>
            ✅ Gratis Survei &nbsp;•&nbsp; ✅ Gratis Estimasi &nbsp;•&nbsp; ✅ Tanpa DP Langsung Kerja
          </p>

          {/* === BEFORE-AFTER VISUAL HOOK === */}
          <div className="max-w-4xl mx-auto animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="card p-1 overflow-hidden">
              <div className="grid grid-cols-2 gap-1 relative">
                {/* Before */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-l-xl overflow-hidden group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl mb-3">😩</div>
                      <div className="text-sm sm:text-base text-gray-300 font-medium">Lantai Lama</div>
                      <div className="text-xs text-gray-400 mt-1">Berdebu, retak, kusam</div>
                    </div>
                  </div>
                  {/* BEFORE label */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-red-500/90 rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                    Before
                  </div>
                </div>

                {/* After */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-cyan-900 via-blue-800 to-indigo-900 rounded-r-xl overflow-hidden group">
                  {/* Glossy reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl mb-3">✨</div>
                      <div className="text-sm sm:text-base text-cyan-100 font-medium">Epoxy HINODE</div>
                      <div className="text-xs text-cyan-200/70 mt-1">Glossy, anti debu, premium</div>
                    </div>
                  </div>
                  {/* AFTER label */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-green-500/90 rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                    After
                  </div>
                  {/* Sparkle animations */}
                  <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
                  <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-ping" style={{ animationDuration: "3s", animationDelay: "1s" }} />
                </div>

                {/* Center divider with VS */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-hinode-blue/30 border-2 border-hinode-dark">
                    VS
                  </div>
                </div>
              </div>

              {/* Bottom banner */}
              <div className="bg-gradient-to-r from-hinode-blue/10 via-hinode-surface to-hinode-gold/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-hinode-gray text-center sm:text-left">
                  <span className="text-hinode-white font-semibold">500+ lantai</span> sudah kami transformasi di Jabodetabek
                </p>
                <Link href="/portofolio" className="text-sm text-hinode-blue font-medium hover:text-hinode-blue-light transition-colors flex items-center gap-1">
                  Lihat Portofolio
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* === STATS WITH ANIMATED COUNTERS === */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 max-w-4xl mx-auto">
            {[
              { target: 500, suffix: "+", label: "Proyek Selesai", icon: "🏗️" },
              { target: 100000, suffix: "+", label: "m² Terpasang", icon: "📐" },
              { target: 8, suffix: "+", label: "Tahun Pengalaman", icon: "⏱️" },
              { target: 99, suffix: "%", label: "Klien Puas", icon: "⭐" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-4 sm:p-5 rounded-xl bg-hinode-surface/60 border border-hinode-border/50 text-center hover-glow animate-slide-up"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text font-[family-name:var(--font-heading)]">
                  <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-hinode-gray mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* === TRUSTED BY === */}
          <div className="mt-14 text-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <p className="text-xs text-hinode-gray/60 uppercase tracking-widest mb-4">Dipercaya oleh berbagai industri</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["🏭 Pabrik", "🏥 Rumah Sakit", "🏬 Mall", "🏢 Kantor", "🍽️ Restoran", "🏠 Residensial"].map((industry) => (
                <span
                  key={industry}
                  className="px-4 py-2 rounded-full bg-hinode-surface/40 border border-hinode-border/30 text-sm text-hinode-gray hover:text-hinode-white hover:border-hinode-blue/30 transition-all"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hinode-dark to-transparent" />
      </section>
    </>
  );
}
