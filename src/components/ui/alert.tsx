import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { AlertCircle, CheckCheck } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive",
        success:
          "text-success-foreground border-success/50 dark:border-success-foreground [&>svg]:text-success-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertMessage = ({ message, variant = "destructive" }:
  {
    message: string,
    variant: 'destructive' | 'success'
  }) => {
  return (
    <>
      {
        message &&
        <>
          {
            variant === 'destructive' ?
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Une erreur c'est produite.</AlertTitle>
                <AlertDescription>
                  {message}
                </AlertDescription>
              </Alert>
              :
              <Alert variant="success">
                <CheckCheck />
                <AlertTitle>{message}</AlertTitle>
              </Alert>
          }
        </>
      }
    </>
  )
}

export { AlertMessage }
