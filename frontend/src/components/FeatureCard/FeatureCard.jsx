import React from "react";
import { Star } from "lucide-react";

const FeatureCard = ({ image, title, rating, hours }) => {
  return (
    <div
      className="max-w-sm rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl backdrop-saturate-150 p-4"
      style={{
        background: "var(--feature-card-bg)",
        border: "1px solid var(--feature-card-border)",
      }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--feature-card-border)" }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-44 object-cover aspect-[16/9]"
        />
      </div>
      <h3
        className="mt-4 text-xl font-semibold"
        style={{ color: "var(--feature-card-title)" }}
      >
        {title}
      </h3>
      <div className="mt-3 flex items-center gap-3 text-sm">
        <span
          className="flex items-center gap-1 rounded-full px-2 py-1"
          style={{
            background: "var(--feature-card-badge-bg)",
            color: "var(--feature-card-text)",
            border: "0.1px solid var(--feature-card-border)",
          }}
        >
          <Star size={14} className="text-yellow-300 fill-yellow-300" />
          {rating}
        </span>
        <span
          className="rounded-full px-2 py-1"
          style={{
            background: "var(--feature-card-badge-bg)",
            color: "var(--feature-card-text)",
            border: "0.1px solid var(--feature-card-border)",
          }}
        >
          {hours} total hours
        </span>
      </div>
    </div>
  );
};

export default FeatureCard;
