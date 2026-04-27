"use client";

import { useState } from "react";
import testimonials from "@/data/testimonials.json";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials-section" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hinode-border to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hinode-blue/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-hinode-success bg-hinode-success/10 rounded-full border border-hinode-success/20 mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Apa Kata{" "}
            <span className="gradient-text">Klien Kami</span>
          </h2>
          <p className="text-hinode-gray text-lg max-w-2xl mx-auto">
            Kepuasan klien adalah prioritas utama kami. Berikut testimoni dari klien yang telah mempercayakan proyek mereka kepada HINODE EPOXY.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-6 hover-lift">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-hinode-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-hinode-gray leading-relaxed mb-6 line-clamp-4">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-hinode-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-blue flex items-center justify-center text-white font-semibold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-hinode-white">{t.name}</div>
                    <div className="text-xs text-hinode-gray">
                      {t.role}{t.company && `, ${t.company}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div className="card p-6">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-hinode-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-hinode-gray leading-relaxed mb-6">
              &ldquo;{testimonials[active].text}&rdquo;
            </p>

            <div className="border-t border-hinode-border pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center text-white font-semibold">
                  {testimonials[active].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-hinode-white">{testimonials[active].name}</div>
                  <div className="text-sm text-hinode-gray">
                    {testimonials[active].role}
                    {testimonials[active].company && `, ${testimonials[active].company}`}
                  </div>
                  <div className="text-xs text-hinode-blue">{testimonials[active].project}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === active
                    ? "bg-hinode-blue w-8"
                    : "bg-hinode-border hover:bg-hinode-gray"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
