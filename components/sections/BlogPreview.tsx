import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import { urlForImage } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { Clock, ArrowRight } from "lucide-react";

interface BlogPreviewProps {
  featuredPost: BlogPost | null;
  recentPosts: BlogPost[];
}

export function BlogPreview({ featuredPost, recentPosts }: BlogPreviewProps) {
  if (!featuredPost && !recentPosts?.length) return null;

  return (
    <section className="bg-brand-light-gray py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionReveal>
            <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-2">
              From The Blog
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[30px] lg:text-[40px] text-brand-text">
              Agriculture Tips &amp; Guides
            </h2>
          </SectionReveal>
          <Link
            href="/blog"
            className="btn border-2 border-brand-green text-brand-green px-5 py-2.5 text-sm hover:bg-brand-green hover:text-white self-start md:self-end flex-shrink-0"
          >
            View All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured post */}
          {featuredPost && (
            <SectionReveal className="md:col-span-2">
              <Link
                href={`/blog/${featuredPost.slug.current}`}
                className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-medium transition-shadow h-full"
              >
                <div className="relative h-56 md:h-72 bg-brand-light-gray">
                  {featuredPost.coverImage && (
                    <Image
                      src={urlForImage(featuredPost.coverImage, 800, 400)}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <span className="absolute top-4 left-4 font-heading font-bold text-[10px] uppercase tracking-widest bg-brand-gold text-brand-dark px-2.5 py-1 rounded-md">
                    {featuredPost.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-brand-text mb-2 group-hover:text-brand-green transition-colors line-clamp-2">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{featuredPost.publishedAt && formatDate(featuredPost.publishedAt)}</span>
                    {featuredPost.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {featuredPost.readTime} min read
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </SectionReveal>
          )}

          {/* Recent posts */}
          <div className="flex flex-col gap-4">
            {recentPosts?.map((post, i) => (
              <SectionReveal key={post._id} delay={i * 0.1}>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="group flex gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-soft transition-shadow"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-brand-light-gray">
                    {post.coverImage && (
                      <Image
                        src={urlForImage(post.coverImage, 200, 200)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-heading font-bold text-[9px] uppercase tracking-widest text-[#8B6914]">
                      {post.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-brand-text group-hover:text-brand-green transition-colors line-clamp-2 mt-0.5 mb-1">
                      {post.title}
                    </h4>
                    {post.readTime && (
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime} min
                      </span>
                    )}
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
