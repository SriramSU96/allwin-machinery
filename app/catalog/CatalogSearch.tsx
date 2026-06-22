"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Download, FileText, MessageCircle } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";

interface Catalog {
  title: string;
  year: string;
  pages: string;
  size: string;
  image: string;
  downloadUrl: string;
}

interface CatalogSearchProps {
  catalogs: Catalog[];
}

export function CatalogSearch({ catalogs }: CatalogSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalogs;
    return catalogs.filter((cat) => cat.title.toLowerCase().includes(q));
  }, [catalogs, query]);

  return (
    <>
      {/* ── Search bar ── */}
      <section className="bg-brand-white py-8 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search catalog name (e.g. power weeders, sprayers, pumps)..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
            />
          </div>
        </div>
      </section>

      {/* ── Featured Catalogs ── */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-10">
            <p className="font-heading font-black text-[11px] text-brand-green uppercase tracking-[4px]">
              {query.trim() ? `${filtered.length} result${filtered.length === 1 ? "" : "s"}` : "Featured Catalogs"}
            </p>
          </SectionReveal>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-sm">
              No catalogs found matching &quot;{query}&quot;. Try a different search term.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filtered.map((cat, i) => (
                <SectionReveal key={cat.title} delay={i * 0.05}>
                  <div className="group flex h-full min-h-[345px] flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/60 hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)]">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-green text-brand-green">
                          <span className="font-heading text-[10px] font-black leading-none">A</span>
                          <span className="absolute -right-0.5 top-1 h-2 w-2 rounded-full bg-brand-green" />
                        </div>
                        <span className="font-heading text-xs font-black uppercase leading-none text-brand-text">
                          ALLWIN
                        </span>
                      </div>
                      <span className="font-heading text-xs font-black leading-none text-brand-green">
                        {cat.year}
                      </span>
                    </div>

                    <div className="min-h-[52px]">
                      <h3 className="font-heading text-base font-black uppercase leading-[1.1] text-brand-text">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="relative my-0 h-[175px] overflow-hidden rounded-lg bg-white">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-contain p-0 transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText size={14} className="text-red-500" />
                        PDF
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-400 text-[8px] leading-none">A</span>
                        {cat.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText size={14} className="text-gray-400" />
                        {cat.pages}
                      </span>
                    </div>

                    {cat.downloadUrl && cat.downloadUrl !== "#" ? (
                      <a 
                        href={cat.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-brand-green bg-white px-4 py-2.5 font-heading text-xs font-black text-brand-green transition-colors hover:bg-brand-green hover:text-white"
                      >
                        <Download size={15} /> Download PDF
                      </a>
                    ) : (
                      <a 
                        href={buildWhatsAppUrl(
                          SITE_CONFIG.whatsapp,
                          `Hi! I'd like to get the ${cat.title} catalog.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 font-heading text-xs font-black text-gray-500 transition-colors hover:border-brand-green hover:text-brand-green"
                      >
                        <MessageCircle size={15} /> Request via WhatsApp
                      </a>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}