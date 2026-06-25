"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Suggestion {
  label: string;
  sublabel?: string;
}

interface SearchWithDropdownProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: Suggestion[];
  placeholder?: string;
  className?: string;
}

export function SearchWithDropdown({
  value,
  onChange,
  suggestions,
  placeholder = "Search...",
  className,
}: SearchWithDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = value.trim()
    ? suggestions.filter((s) =>
        s.label.toLowerCase().includes(value.toLowerCase())
      )
    : [];

  const showDropdown = open && filtered.length > 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (label: string) => {
    onChange(label);
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = useCallback(() => {
    onChange("");
    setOpen(false);
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white transition-colors outline-none",
          "focus-within:border-brand-green",
          showDropdown && "rounded-b-none border-b-transparent"
        )}
      >
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400 min-w-0"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="text-gray-400 hover:text-gray-600 shrink-0 transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showDropdown && (
        <ul
          role="listbox"
          className={cn(
            "absolute z-50 left-0 right-0 bg-white border border-brand-green/30 border-t-0",
            "rounded-b-xl shadow-large max-h-56 overflow-y-auto",
            "animate-in fade-in-0 slide-in-from-top-1 duration-100"
          )}
        >
          {filtered.slice(0, 8).map((s, i) => (
            <li
              key={i}
              role="option"
              aria-selected={value === s.label}
              onClick={() => handleSelect(s.label)}
              className="flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-brand-light-gray transition-colors"
            >
              <Search size={12} className="text-gray-400 shrink-0" />
              <span className="text-sm text-brand-text truncate">{s.label}</span>
              {s.sublabel && (
                <span className="text-xs text-gray-400 ml-auto shrink-0">{s.sublabel}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
