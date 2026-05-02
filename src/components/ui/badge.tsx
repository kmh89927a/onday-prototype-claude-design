import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// design-tokens §6.4 Badge / Pill
//   gap 4 / py 4 / px 8 / radius 6 / 11px-700 (caption)
//   variants: default(primary-soft), solid, ok, neutral, danger, grade-A~D
const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-s-2 py-s-1 text-caption-xs font-bold leading-tight whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-primary/40 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        // primary-soft 기본 (badge default — diagnosis/result/share)
        default: "bg-primary-soft text-primary",
        solid: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ok: "bg-success-soft text-success",
        info: "bg-info-soft text-info",
        warning: "bg-warning-soft text-warning",
        neutral: "bg-bg text-ink-2",
        danger: "bg-danger-soft text-danger",
        destructive: "bg-danger-soft text-danger",
        outline: "border-card-border text-ink-2 bg-surface",
        // 야간 안전 등급 — letter+label+color 3중 표기 (color 단독 금지)
        "grade-a": "bg-[hsl(152_76%_90%)] text-[hsl(161_94%_24%)]",
        "grade-b": "bg-[hsl(213_97%_87%)] text-[hsl(224_76%_48%)]",
        "grade-c": "bg-[hsl(48_96%_89%)] text-[hsl(35_92%_33%)]",
        "grade-d": "bg-[hsl(0_93%_94%)] text-[hsl(0_74%_42%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(badgeVariants({ variant }), className) },
      props,
    ),
    render,
    state: { slot: "badge", variant },
  });
}

export { Badge, badgeVariants };
