import type { ReactNode } from "react";
import Button from "@/components/ui/Button";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  amharic?: string;
  actionHref?: string;
  actionLabel?: string;
  actionIcon?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

function combineClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  amharic,
  actionHref,
  actionLabel,
  actionIcon,
  align = "left",
  light = false,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={combineClasses(
        "mb-10 flex flex-col gap-5",
        centered
          ? "items-center text-center"
          : "items-start justify-between md:flex-row md:items-end",
        className,
      )}
    >
      <div className={combineClasses(centered && "mx-auto max-w-3xl")}>
        {eyebrow ? (
          <p
            className={combineClasses(
              "font-bold uppercase tracking-wider",
              light ? "text-yellow-300" : "text-[#087531]",
            )}
          >
            {eyebrow}
          </p>
        ) : null}

        <h2
          className={combineClasses(
            "mt-2 text-3xl font-black sm:text-4xl",
            light ? "text-white" : "text-[#064d2b]",
          )}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={combineClasses(
              "mt-3",
              centered ? "max-w-3xl" : "max-w-2xl",
              light ? "text-green-50" : "text-slate-600",
            )}
          >
            {description}
          </p>
        ) : null}

        {amharic ? (
          <p
            className={combineClasses(
              "mt-2 font-semibold",
              light ? "text-yellow-200" : "text-[#087531]",
            )}
          >
            {amharic}
          </p>
        ) : null}
      </div>

      {actionHref && actionLabel ? (
        <Button
          href={actionHref}
          variant={light ? "secondary" : "primary"}
          size="md"
          className="shrink-0"
        >
          {actionLabel}
          {actionIcon ?? <span aria-hidden="true">→</span>}
        </Button>
      ) : null}
    </div>
  );
}