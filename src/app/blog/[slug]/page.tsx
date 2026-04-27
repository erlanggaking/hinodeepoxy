import { notFound } from "next/navigation";
import Link from "next/link";
import articles from "@/data/articles.json";
import { formatDate } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/constants";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  return { title: article.title, description: article.excerpt, openGraph: { title: article.title, description: article.excerpt, type: "article", publishedTime: article.date } };
}

export async function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  const renderContent = (content: string) => content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) return <h2 key={i} className="text-xl font-bold font-[family-name:var(--font-heading)] mt-8 mb-3">{block.replace("## ", "")}</h2>;
    if (block.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold font-[family-name:var(--font-heading)] mt-5 mb-2">{block.replace("### ", "")}</h3>;
    if (block.startsWith("- ")) { const items = block.split("\n").filter((l) => l.startsWith("- ")); return <ul key={i} className="space-y-2 my-4">{items.map((item, j) => <li key={j} className="flex items-start gap-2 text-h-text-secondary"><svg className="w-4 h-4 text-h-blue mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{item.replace("- ", "")}</li>)}</ul>; }
    return <p key={i} className="text-h-text-secondary leading-relaxed my-3">{block}</p>;
  });

  return (
    <div className="pt-20">
      <article className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-h-text-muted mb-6">
            <Link href="/" className="hover:text-h-blue transition-colors">Beranda</Link><span>/</span>
            <Link href="/blog" className="hover:text-h-blue transition-colors">Blog</Link><span>/</span>
            <span className="text-h-text truncate">{article.title}</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-h-blue-light text-h-blue">{article.category}</span>
            <span className="text-sm text-h-text-muted">{formatDate(article.date)} • {article.readTime}</span>
          </div>

          <div className="mb-8 rounded-2xl overflow-hidden aspect-video shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.featuredImage || article.image || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800"} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-5 leading-tight">{article.title}</h1>
          <p className="text-lg text-h-text-secondary border-l-4 border-h-blue pl-4 mb-8">{article.excerpt}</p>
          <div>{renderContent(article.content)}</div>
          <div className="card p-7 mt-10 text-center bg-h-bg">
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2">Butuh Konsultasi?</h3>
            <p className="text-h-text-secondary mb-5">Tim HINODE EPOXY siap menjawab pertanyaan Anda.</p>
            <a href={getWhatsAppLink(`Halo, saya baru baca "${article.title}" dan ingin konsultasi.`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Konsultasi via WhatsApp</a>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section-padding bg-h-bg">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-center">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="card p-5 hover-lift group">
                  <span className="text-xs text-h-blue">{a.category}</span>
                  <h3 className="font-semibold mt-1.5 mb-1.5 font-[family-name:var(--font-heading)] group-hover:text-h-blue transition-colors line-clamp-2">{a.title}</h3>
                  <p className="text-sm text-h-text-muted line-clamp-2">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
