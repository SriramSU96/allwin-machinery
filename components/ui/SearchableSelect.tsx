"use client";

import { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  count?: number;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  className,
  disabled,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-left",
          "hover:border-brand-green focus:outline-none transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          open && "border-brand-green"
        )}
      >
        <span className={cn("flex-1 truncate", selected ? "text-brand-text" : "text-gray-400")}>
          {selected ? selected.label : placeholder}
        </span>
        {value && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear selection"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                handleSelect("");
              }
            }}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X size={13} />
          </span>
        )}
        <ChevronDown
          size={15}
          className={cn("text-gray-400 shrink-0 transition-transform", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-large overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <Search size={13} className="text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Options list */}
          <ul
            role="listbox"
            className="max-h-52 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No results found</li>
            ) : (
              filtered.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors",
                    option.value === value
                      ? "bg-brand-green text-white"
                      : "text-brand-text hover:bg-brand-light-gray"
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {option.count !== undefined && (
                    <span
                      className={cn(
                        "ml-2 text-xs shrink-0",
                        option.value === value ? "text-white/70" : "text-gray-400"
                      )}
                    >
                      {option.count}
                    </span>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
