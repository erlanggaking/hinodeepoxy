"use client";

import { useState } from "react";
import testimonials from "@/data/testimonials.json";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials-section" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-sm font-medium text-h-green bg-h-green-light rounded-full mb-3">Testimoni</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-3">Apa Kata Klien Kami</h2>
          <p className="text-h-text-secondary max-w-xl mx-auto">Kepuasan klien adalah prioritas utama kami.</p>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-5 hover-lift">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sm text-h-text-secondary leading-relaxed mb-5 line-clamp-4">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-h-border pt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-blue flex items-center justify-center text-white font-semibold text-sm">{t.name.charAt(0)}</div>
                <div>
                  <div className="text-sm font-semibold text-h-text">{t.name}</div>
                  <div className="text-xs text-h-text-muted">{t.role}{t.company && `, ${t.company}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="card p-6">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-h-text-secondary leading-relaxed mb-5">&ldquo;{testimonials[active].text}&rdquo;</p>
            <div className="border-t border-h-border pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-blue flex items-center justify-center text-white font-semibold">{testimonials[active].name.charAt(0)}</div>
              <div>
                <div className="font-semibold text-h-text">{testimonials[active].name}</div>
                <div className="text-sm text-h-text-muted">{testimonials[active].role}{testimonials[active].company && `, ${testimonials[active].company}`}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-h-blue w-6" : "bg-h-border hover:bg-h-text-muted"}`} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
