import type { ReactNode } from "react";

type SectionTone = "white" | "soft" | "transparent" | "green";

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  id?: string;
};

const toneStyles: Record<SectionTone, string> = {
  white: "bg-white",
  soft: "bg-[#f7f8f5]",
  transparent: "bg-transparent",
  green: "bg-[#064d2b] text-white",
};

function combineClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Section({
  children,
  tone = "white",
  className,
  containerClassName,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={combineClasses(toneStyles[tone], className)}
    >
      <div
        className={combineClasses(
          "mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}