import Link from "next/link";
import articles from "@/data/articles.json";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Artikel Epoxy Lantai",
  description: "Baca artikel edukatif tentang epoxy lantai: tips perawatan, panduan jenis epoxy, harga terbaru, dan informasi teknis lainnya dari HINODE EPOXY.",
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative bg-hinode-darker">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-hinode-accent/5 rounded-full blur-[128px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 text-sm font-medium text-hinode-accent bg-hinode-accent/10 rounded-full border border-hinode-accent/20 mb-4">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Artikel & <span className="gradient-text">Panduan Epoxy</span>
          </h1>
          <p className="text-hinode-gray text-lg max-w-2xl mx-auto">
            Pelajari semua tentang epoxy lantai: dari jenis-jenis epoxy, tips perawatan, hingga panduan harga terbaru.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="card overflow-hidden group hover-lift"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-hinode-surface to-hinode-surface-light flex items-center justify-center relative overflow-hidden">
                  <svg className="w-12 h-12 text-hinode-border group-hover:text-hinode-blue/30 transition-colors" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-lg bg-hinode-blue/10 text-hinode-blue border border-hinode-blue/20">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-hinode-gray mb-3">
                    <span>{formatDate(article.date)}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-hinode-white font-[family-name:var(--font-heading)] mb-2 group-hover:text-hinode-blue transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-hinode-gray line-clamp-3">{article.excerpt}</p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-hinode-blue font-medium">
                    Baca Selengkapnya
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
