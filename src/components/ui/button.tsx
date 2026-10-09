import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        success:
          "bg-success text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-[#C0392B] text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 font-medium",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        disabledSquare:
          "border bg-[#D9D9D9] shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 font-medium",

        //rounded-linear
        green:
          "bg-gradient-to-t from-[#009135] to-[#00CB60] w-full text-white rounded-[50px] !h-[50px] text-[20px] font-medium",
        red: "bg-gradient-to-t from-[#C80000] to-[#FF2020] w-full text-white rounded-[50px] !h-[50px] text-[20px] font-medium",
        blue: "bg-gradient-to-t from-[#1DD5E6] to-[#46AEF7] w-full text-white rounded-[50px] !h-[50px] text-[20px] font-medium",
        yellow:
          "bg-gradient-to-t from-[#FFEA00] to-[#FFC600] w-full text-white rounded-[50px] !h-[50px] text-[20px] font-medium",
        outlineGreen:
          "bg-white w-full text-white rounded-[50px] !h-[50px] text-[20px] font-medium border-[#00A24A] border-2 text-[#00A24A]",
        outlineWhite:
          "bg-transparent w-full text-white rounded-[50px] !h-[50px] text-[20px] font-medium border-[#FFF] border-2 text-[#FFF]",
        disable:
          "bg-[#D9D9D9] w-full text-white rounded-[50px] !h-[50px] text-[20px] font-medium",

        //flat-not-rounded
        flatGreen:
          "bg-[#00A24A] w-full text-white rounded-[10px] !h-[50px] text-[20px] font-medium",
        flatRed:
          "bg-[#FF2020] w-full text-white rounded-[10px] !h-[50px] text-[20px] font-medium",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  const finalVariant =
    disabled && variant !== "disabledSquare" ? "disable" : variant;

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant: finalVariant, size, className }))}
      disabled={disabled}
      {...props}
    />
  );
}

export { Button, buttonVariants };
