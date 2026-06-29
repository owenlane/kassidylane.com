"use client";

import { useState } from "react";
import { reviews as allReviews, reviewSegments, type ReviewSegment } from "@/content/reviews";
import { ReviewCard } from "@/components/ReviewCard";

export function ReviewsExplorer() {
  const [active, setActive] = useState<ReviewSegment | "all">("all");
  const filtered =
    active === "all" ? allReviews : allReviews.filter((r) => r.segments.includes(active));

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter reviews">
        {reviewSegments.map((seg) => {
          const isActive = active === seg.id;
          return (
            <button
              key={seg.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(seg.id)}
              className={`min-h-[40px] rounded-full border px-4 text-sm font-medium transition-colors ${
                isActive
                  ? "border-ink bg-ink text-bone"
                  : "border-line bg-paper text-ink hover:border-ink/40"
              }`}
            >
              {seg.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {filtered.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
