import type { HTMLAttributes, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

function combineClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Card({
  children,
  hover = false,
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={combineClasses(
        "rounded-3xl border border-slate-200 bg-white shadow-sm",
        paddingStyles[padding],
        hover &&
          "transition duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}