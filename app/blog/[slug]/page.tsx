import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { sanityClient, urlForImage } from "@/lib/sanity";
import { BlogPost } from "@/types";
import { formatDate, buildWhatsAppUrl, SITE_CONFIG } from "@/lib/utils";
import { SectionReveal } from "@/components/animations/SectionReveal";
import {
  Clock, User, ChevronRight, Facebook, Linkedin,
  MessageCircle, ArrowRight, Phone,
} from "lucide-react";

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  ...,
  author->{name, image, bio},
}`;

const RELATED_QUERY = `*[_type == "blogPost" && slug.current != $slug] | order(publishedAt desc)[0..2]{
  _id, title, slug, excerpt, coverImage, category, publishedAt, readTime
}`;

export const revalidate = 3600;
export async function generateStaticParams() {
  const items = await sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "blogPost"]{ "slug": slug.current }`
  );
  return items.map((i) => ({ slug: i.slug }));
}


interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: BlogPost = await sanityClient.fetch(POST_QUERY, { slug: params.slug });
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.seo?.title || `${post.title} | Allwin Machinery Blog`,
    description: post.seo?.description || post.excerpt,
  };
}

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative my-6 rounded-xl overflow-hidden aspect-video bg-brand-light-gray">
        <Image
          src={urlForImage(value, 800, 450)}
          alt={value.alt || ""}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading font-bold text-xl md:text-2xl text-brand-green mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading font-bold text-lg text-brand-text mt-6 mb-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-[15px] leading-relaxed text-gray-600 mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-gold bg-brand-light-gray rounded-r-xl px-5 py-4 my-5 text-brand-text italic text-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 space-y-1.5 mb-4 text-sm text-gray-600">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 space-y-1.5 mb-4 text-sm text-gray-600">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-brand-text font-semibold">{children}</strong>,
    link: ({ value, children }) => (
      <a href={value?.href} className="text-brand-green underline hover:text-brand-gold" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

// Fallback content for when body is empty (since most posts may not have full content yet)
function FallbackContent({ post }: { post: BlogPost }) {
  return (
    <div className="prose-allwin">
      <p className="text-[15px] leading-relaxed text-gray-600 mb-4">{post.excerpt}</p>
      <h2 className="font-heading font-bold text-xl md:text-2xl text-brand-green mt-8 mb-3">
        Why This Matters for Your Farm
      </h2>
      <p className="text-[15px] leading-relaxed text-gray-600 mb-4">
        Choosing the right agricultural machinery can significantly improve productivity, reduce
        manual labor, and increase your overall farm output. At Allwin Machinery, we work closely
        with farmers across Tamil Nadu to understand their needs and recommend the best equipment
        for their land size, crop type, and budget.
      </p>
      <h2 className="font-heading font-bold text-xl md:text-2xl text-brand-green mt-8 mb-3">
        Key Things to Consider
      </h2>
      <ul className="list-disc pl-5 space-y-1.5 mb-4 text-sm text-gray-600">
        <li>Engine power and fuel type suited to your land size</li>
        <li>Availability of spare parts and service support nearby</li>
        <li>Warranty coverage and after-sales service quality</li>
        <li>Ease of operation and maintenance requirements</li>
        <li>Total cost of ownership, not just the purchase price</li>
      </ul>
      <blockquote className="border-l-4 border-brand-gold bg-brand-light-gray rounded-r-xl px-5 py-4 my-5 text-brand-text italic text-sm">
        &quot;The right machine, properly maintained, can serve a farmer reliably for 10+ years.&quot;
      </blockquote>
      <h2 className="font-heading font-bold text-xl md:text-2xl text-brand-green mt-8 mb-3">
        Need Personalized Advice?
      </h2>
      <p className="text-[15px] leading-relaxed text-gray-600 mb-4">
        Our team at Allwin Machinery is happy to help you choose the right product based on your
        specific requirements. Reach out via phone or WhatsApp for a free consultation.
      </p>
    </div>
  );
}

export default async function BlogDetailPage({ params }: Props) {
  const post: BlogPost = await sanityClient.fetch(POST_QUERY, { slug: params.slug });
  if (!post) notFound();

  const related: BlogPost[] = await sanityClient.fetch(RELATED_QUERY, { slug: params.slug });

  const shareUrl = `${SITE_CONFIG.url}/blog/${post.slug.current}`;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-brand-light-gray border-b border-gray-200 px-4 py-3">
        <div className="max-w-container mx-auto flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-green">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:text-brand-green">Blog</Link>
          <ChevronRight size={12} />
          <span className="text-brand-text font-medium truncate max-w-[200px]">{post.title}</span>
        </div>
      </nav>

      <article className="bg-white">
        {/* Header */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 pt-10 pb-6">
          {post.category && (
            <span className="inline-block font-heading font-bold text-[10px] uppercase tracking-widest bg-brand-gold text-white px-2.5 py-1 rounded-md mb-4">
              {post.category}
            </span>
          )}
          <h1 className="font-heading font-black text-2xl md:text-4xl text-brand-text leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <User size={13} />
              {post.author?.name || "Allwin Team"}
            </span>
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt)}</span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock size={13} /> {post.readTime} min read
              </span>
            )}
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 mb-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-light-gray">
              <Image
                src={urlForImage(post.coverImage, 1000, 560)}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Body + sidebar */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-8">
            {/* Content */}
            <div>
              {post.body && post.body.length > 0 ? (
                <div className="prose-allwin">
                  <PortableText value={post.body} components={ptComponents} />
                </div>
              ) : (
                <FallbackContent post={post} />
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-brand-light-gray text-brand-text px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author bio */}
              {post.author && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-light-gray flex-shrink-0">
                    {post.author.image ? (
                      <Image src={urlForImage(post.author.image, 96, 96)} alt={post.author.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-green text-white font-heading font-bold">
                        {post.author.name?.[0] || "A"}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-brand-text">{post.author.name}</p>
                    {post.author.bio && <p className="text-xs text-gray-500 mt-1">{post.author.bio}</p>}
                  </div>
                </div>
              )}

              {/* CTA box */}
              <div className="mt-8 bg-brand-green rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="font-heading font-bold text-white text-lg mb-1">
                    Need Help Choosing the Right Machine?
                  </h3>
                  <p className="text-white/70 text-sm">Talk to our experts — free consultation.</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a href={`tel:${SITE_CONFIG.phone}`} className="btn bg-white text-brand-green px-4 py-2.5 text-sm flex items-center gap-1.5">
                    <Phone size={14} /> Call
                  </a>
                  <a
                    href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, `Hi! I read your article "${post.title}" and have a question.`)}
                    target="_blank" rel="noopener noreferrer"
                    className="btn bg-[#25D366] text-white px-4 py-2.5 text-sm flex items-center gap-1.5"
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar — share */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-heading font-bold text-gray-400 uppercase tracking-wider mb-3">Share</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:opacity-85"
                  >
                    <MessageCircle size={16} />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-85"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-85"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related?.length > 0 && (
        <section className="bg-brand-light-gray py-14 px-4">
          <div className="max-w-container mx-auto">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-6 text-center">
              Related Articles
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <SectionReveal key={p._id} delay={i * 0.06}>
                  <Link
                    href={`/blog/${p.slug.current}`}
                    className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-medium transition-shadow h-full"
                  >
                    <div className="relative h-40 bg-brand-light-gray">
                      {p.coverImage && (
                        <Image src={urlForImage(p.coverImage, 400, 240)} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      )}
                      {p.category && (
                        <span className="absolute top-3 left-3 font-heading font-bold text-[9px] uppercase tracking-wider bg-brand-gold text-white px-2 py-1 rounded-md">
                          {p.category}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-sm text-brand-text group-hover:text-brand-green transition-colors line-clamp-2 mb-2">
                        {p.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-brand-green font-heading font-bold text-xs">
                        Read More <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
