"use client";

import {
  typographyTokens,
  typographyGroups,
  type TypographyKey,
} from "@/lib/typography";

const weightLabel: Record<number, string> = {
  400: "Regular",
  500: "Medium",
  600: "SemiBold",
  700: "Bold",
};

function TokenRow({ tokenKey }: { tokenKey: TypographyKey }) {
  const t = typographyTokens[tokenKey];
  return (
    <div className="flex flex-col gap-1 py-4 border-b border-[#E4E7EC] last:border-b-0">
      {/* Meta line */}
      <div className="flex flex-wrap items-center gap-3 text-caption text-[#667085]">
        <code className="px-1.5 py-0.5 rounded bg-[#F2F4F0] text-[11px] font-mono text-[#101828]">
          {t.className}
        </code>
        <span>{t.fontSizePx}px / {t.fontSize}</span>
        <span>line-height: {t.lineHeight}</span>
        <span>weight: {t.fontWeight} ({weightLabel[t.fontWeight] ?? t.fontWeight})</span>
      </div>
      {/* Preview */}
      <p className={t.className} style={{ color: "#101828" }}>
        {t.name} — The quick brown fox jumps over the lazy dog
      </p>
    </div>
  );
}

export default function TypographyPreviewPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <div>
        <h1 className="text-h2-bold text-[#101828]">Typography System</h1>
        <p className="text-body text-[#667085] mt-2">
          All text styles from Figma, rendered with Inter. Compare each row against
          Figma to verify size, weight, and line-height.
        </p>
      </div>

      {typographyGroups.map((group) => (
        <section key={group.group}>
          <h2 className="text-title-6-semibold text-[#667085] uppercase tracking-wider mb-2">
            {group.group}
          </h2>
          <div className="bg-white rounded-[14px] border border-[#E4E7EC] px-5">
            {group.keys.map((key) => (
              <TokenRow key={key} tokenKey={key} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
