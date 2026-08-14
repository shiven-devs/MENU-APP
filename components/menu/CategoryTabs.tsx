"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { CategoryPublic } from "@/lib/types";

export function CategoryTabs({ categories }: { categories: CategoryPublic[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(`category-${category.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveId(visible.target.id.replace("category-", ""));
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  if (categories.length === 0) return null;

  return (
    <nav
      className="sticky top-0 z-10 border-b bg-[oklch(0.98_0.01_80)/95] backdrop-blur-sm"
      aria-label="Menu categories"
    >
      <ul className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-4 py-2">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href={`#category-${category.id}`}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(`category-${category.id}`)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setActiveId(category.id);
              }}
              className={cn(
                "inline-block rounded-full px-3 py-1.5 text-sm whitespace-nowrap",
                activeId === category.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
