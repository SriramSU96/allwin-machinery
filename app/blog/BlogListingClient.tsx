"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import { urlForImage } from "@/lib/sanity";
import { formatDate, truncate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Search, Clock, User, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";

interface BlogListingClientProps {
  posts: BlogPost[];
  featuredPost: BlogPost | null;
  categories: string[];
}

const TRENDING_TOPICS = [
  "How to Choose the Right Motor Pump for Your Farm",
  "Best Water Sprayers for Agriculture in India",
  "Brush Cutter Buying Guide for Farmers",
  "Maintenance Tips to Increase Machine Life",
  "Benefits of Modern Agricultural Machinery",
];

export function BlogListingClient({ posts, featuredPost, categories }: BlogListingClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const filteredPosts = useMemo(() => {
    let result = posts || [];
    if (activeCategory !== "All Articles") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  return (
    <section className="py-10 bg-brand-white">
      <div className="max-w-container mx-auto px-4 md:px-6">
        {/* Search + filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search articles, topics or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-heading font-semibold transition-colors",
                  activeCategory === cat
                    ? "bg-brand-green text-white"
                    : "bg-brand-light-gray text-brand-text hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Featured article */}
            {featuredPost && activeCategory === "All Articles" && !search && (
              <div className="mb-8">
                <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-4">
                  Featured Article
                </p>
                <Link
                  href={`/blog/${featuredPost.slug.current}`}
                  className="group flex flex-col md:flex-row gap-6 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-medium transition-shadow"
                >
                  <div className="relative md:w-80 h-56 md:h-auto flex-shrink-0 bg-brand-light-gray">
                    {featuredPost.coverImage && (
                      <Image
                        src={urlForImage(featuredPost.coverImage, 640, 400)}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <span className="absolute top-4 left-4 font-heading font-bold text-[10px] uppercase tracking-widest bg-brand-gold text-white px-2.5 py-1 rounded-md">
                      {featuredPost.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <h2 className="font-heading font-black text-xl text-brand-text mb-3 group-hover:text-brand-green transition-colors line-clamp-2">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        {featuredPost.author?.name || "Allwin Team"}
                      </span>
                      <span>{featuredPost.publishedAt && formatDate(featuredPost.publishedAt)}</span>
                      {featuredPost.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {featuredPost.readTime} min read
                        </span>
                      )}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-brand-green font-heading font-bold text-sm">
                      Read Full Article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Latest articles grid */}
            <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-4">
              {search ? `Results for "${search}"` : "Latest Articles"}
            </p>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">📝</p>
                <p className="text-gray-500">No articles found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPosts.map((post, i) => (
                  <SectionReveal key={post._id} delay={i * 0.05}>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-medium transition-shadow h-full"
                    >
                      <div className="relative h-44 bg-brand-light-gray">
                        {post.coverImage && (
                          <Image
                            src={urlForImage(post.coverImage, 400, 280)}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        {post.category && (
                          <span className="absolute top-3 left-3 font-heading font-bold text-[9px] uppercase tracking-wider bg-brand-gold text-white px-2 py-1 rounded-md">
                            {post.category}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-sm text-brand-text group-hover:text-brand-green transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-gray-400">
                          <span>{post.publishedAt && formatDate(post.publishedAt)}</span>
                          {post.readTime && (
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {post.readTime} min
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
            {/* Trending */}
            <div className="bg-brand-light-gray rounded-xl p-5">
              <h3 className="font-heading font-bold text-sm text-brand-text mb-4">
                Trending Articles
              </h3>
              <ul className="space-y-3">
                {TRENDING_TOPICS.map((topic, i) => (
                  <li key={i} className="text-xs text-gray-600 hover:text-brand-green cursor-pointer flex gap-2">
                    <span className="text-brand-gold font-bold">{i + 1}.</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-heading font-bold text-sm text-brand-text mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.slice(1).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-brand-green py-1"
                  >
                    <span>{cat}</span>
                    <span className="text-xs bg-brand-light-gray px-2 py-0.5 rounded-full">
                      {posts?.filter((p) => p.category === cat).length || 0}
                    </span>
                  </button>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-brand-green rounded-xl p-5 text-white">
              <h3 className="font-heading font-bold text-sm mb-2">
                Need Help Choosing the Right Machine?
              </h3>
              <p className="text-white/70 text-xs mb-4">
                Our experts are here to guide you.
              </p>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="btn w-full bg-white text-brand-green py-2.5 text-sm text-center block mb-2"
              >
                📞 Contact Support
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full bg-[#25D366] text-white py-2.5 text-sm text-center block"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// Import for SITE_CONFIG used in sidebar
import { SITE_CONFIG } from "@/lib/utils";
