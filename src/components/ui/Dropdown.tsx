"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className={cn("flex flex-col gap-1.5", className)} ref={ref}>
      {label && <span className="text-body-sm font-medium">{label}</span>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 w-full items-center justify-between rounded-md border border-border bg-surface px-4 text-body-sm transition hover:border-primary/40"
        >
          <span>{selected?.label ?? "انتخاب کنید"}</span>
          <ChevronDown
            className={cn(
              "size-4 text-muted transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        {open && (
          <div className="absolute inset-x-0 top-[calc(100%+6px)] z-30 animate-scale-in overflow-hidden rounded-md border border-border bg-surface p-1.5 shadow-pop">
            {options.map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full rounded-sm px-3 py-2 text-right text-body-sm transition",
                  o.value === value
                    ? "bg-primary-soft font-bold text-primary"
                    : "hover:bg-background",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
