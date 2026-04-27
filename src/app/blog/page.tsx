import Link from "next/link";
import articles from "@/data/articles.json";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Artikel Epoxy Lantai",
  description: "Baca artikel edukatif tentang epoxy lantai: tips perawatan, panduan jenis epoxy, harga terbaru.",
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-h-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-h-blue bg-h-blue-light rounded-full mb-3">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">Artikel & <span className="gradient-text">Panduan Epoxy</span></h1>
          <p className="text-h-text-secondary text-lg max-w-2xl mx-auto">Pelajari semua tentang epoxy lantai: dari jenis-jenis, tips perawatan, hingga panduan harga terbaru.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article: any) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="card overflow-hidden hover-lift group">
              <div className="h-48 bg-h-bg-alt relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={article.featuredImage || article.image || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800"} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-xs font-medium rounded-md bg-h-blue text-white shadow-sm">{article.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-h-text-muted mb-2"><span>{formatDate(article.date)}</span><span>•</span><span>{article.readTime}</span></div>
                <h2 className="font-semibold text-h-text font-[family-name:var(--font-heading)] mb-2 group-hover:text-h-blue transition-colors line-clamp-2">{article.title}</h2>
                <p className="text-sm text-h-text-muted line-clamp-3">{article.excerpt}</p>
                <div className="mt-3 text-sm text-h-blue font-medium group-hover:underline">Baca Selengkapnya →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
