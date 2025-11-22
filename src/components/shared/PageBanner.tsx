"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  heading: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageBanner({
  heading,
  breadcrumbs,
}: PageBannerProps) {
  return (
    <div
      className="w-full h-36 flex flex-col items-center justify-center bg-[#F8F7ED] text-center px-5"
    >
      <h1 className="text-2xl md:text-4xl font-bold text-[#2C2C2C]">
        {heading}
      </h1>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mt-2 flex-wrap text-sm md:text-base">
        {breadcrumbs.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="text-primary hover:text-[#2C2C2C] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-muted-foreground">{item.label}</span>
            )}

            {idx !== breadcrumbs.length - 1 && (
              <span className="text-primary">{" | "}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
