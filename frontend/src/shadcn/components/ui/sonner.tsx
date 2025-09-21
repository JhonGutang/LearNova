"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

// Use a type that allows arbitrary CSS variables
type CSSVarStyle = React.CSSProperties & { [key: `--${string}`]: string }

const variantStyles: Record<string, CSSVarStyle> = {
  success: {
    ["--normal-bg"]: "var(--green-100, #dcfce7)",
    ["--normal-text"]: "var(--green-900, #166534)",
    ["--normal-border"]: "var(--green-300, #86efac)",
  },
  error: {
    ["--normal-bg"]: "var(--red-100, #fee2e2)",
    ["--normal-text"]: "var(--red-900, #7f1d1d)",
    ["--normal-border"]: "var(--red-300, #fca5a5)",
  },
  warning: {
    ["--normal-bg"]: "var(--yellow-100, #fef9c3)",
    ["--normal-text"]: "var(--yellow-900, #713f12)",
    ["--normal-border"]: "var(--yellow-300, #fde68a)",
  },
  info: {
    ["--normal-bg"]: "var(--blue-100, #dbeafe)",
    ["--normal-text"]: "var(--blue-900, #1e3a8a)",
    ["--normal-border"]: "var(--blue-300, #93c5fd)",
  },
  default: {
    ["--normal-bg"]: "var(--popover)",
    ["--normal-text"]: "var(--popover-foreground)",
    ["--normal-border"]: "var(--border)",
  },
}

type ExtendedToasterProps = ToasterProps & {
  variant?: "success" | "error" | "warning" | "info" | "default"
}

const Toaster = ({ variant = "default", ...props }: ExtendedToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={`toaster group ${variant ? `toaster-${variant}` : ""}`}
      style={
        {
          ...(variantStyles[variant] ?? variantStyles.default),
        }
      }
      {...props}
    />
  )
}

export { Toaster }
