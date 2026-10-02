import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, icon, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-body-sm font-medium text-ink">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-11 w-full rounded-md border bg-surface px-4 text-body-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15",
              icon && "pr-10",
              error ? "border-danger" : "border-border",
              className,
            )}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-caption text-danger">{error}</span>
        ) : hint ? (
          <span className="text-caption text-muted">{hint}</span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <Search className="pointer-events-none absolute inset-y-0 right-3.5 my-auto size-5 text-muted" />
        <input
          ref={ref}
          type="search"
          className={cn(
            "h-11 w-full rounded-md border border-border bg-surface pr-11 pl-4 text-body-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";
