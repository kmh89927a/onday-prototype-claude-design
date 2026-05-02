import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-120 outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:brightness-95 disabled:bg-[hsl(220_30%_84%)] disabled:text-white",
        outline:
          "bg-surface text-ink border border-card-border hover:bg-surface-soft disabled:opacity-50",
        ghost:
          "bg-transparent text-ink-2 hover:bg-surface-soft disabled:opacity-50",
        destructive:
          "bg-danger text-white hover:brightness-95 disabled:opacity-50",
        secondary:
          "bg-secondary text-secondary-foreground hover:brightness-95 disabled:opacity-50",
        kakao:
          "bg-oauth-kakao text-oauth-kakao-ink hover:brightness-95 disabled:opacity-50",
        naver:
          "bg-oauth-naver text-oauth-naver-ink hover:brightness-95 disabled:opacity-50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // default: 52px / radius 14px / px 18px / 16px-700 — design-tokens §6.1
        default: "h-[52px] rounded-2xl px-[18px] text-base",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-[60px] rounded-2xl px-s-6 text-lg",
        // single-foot: 44px / radius 12px / px 14px / 13px-700 + card border + shadow
        "single-foot":
          "h-11 rounded-lg px-3.5 text-[13px] border border-card-border bg-surface text-ink shadow-card",
        icon: "size-[52px] rounded-2xl",
        "icon-sm": "size-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
