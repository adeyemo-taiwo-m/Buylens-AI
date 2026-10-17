import { cn } from "@/lib/utils";

export type VerdictTone = "success" | "caution" | "risk";

type VerdictPillProps = {
  tone: VerdictTone;
  size?: "sm" | "md";
  label: string;
  className?: string;
};

const tones: Record<VerdictTone, string> = {
  success: "bg-[#DCF7E6] text-[#187A45] [&>i]:bg-[#22A55A]",
  caution: "bg-[#FDF1C9] text-[#9A6200] [&>i]:bg-[#F5B731]",
  risk: "bg-[#FDE8E8] text-[#A61B1B] [&>i]:bg-[#DC2626]",
};

export function VerdictPill({ tone, size = "md", label, className }: VerdictPillProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full font-medium leading-none",
        size === "md" ? "h-[31px] px-[14px] text-sm" : "h-5 px-2 text-xs",
        tones[tone],
        className
      )}
    >
      <i aria-hidden="true" className={cn("rounded-full", size === "md" ? "h-[7px] w-[7px]" : "h-[5px] w-[5px]")} />
      {label}
    </span>
  );
}
