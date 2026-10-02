"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { AiBadge } from "./AiBadge";
import { AiDiscovery } from "./AiDiscovery";

/* The always-available way to ask کتابچی, from any screen (brief §17). Sits
   above the mobile tab bar and opens the full discovery journey in a sheet. */
export function FloatingAiCta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="از کتابچی بپرس"
        className="fixed bottom-24 end-4 z-[80] inline-flex items-center gap-2 rounded-full bg-tech px-4 py-3 font-bold text-white shadow-glow transition hover:bg-tech-hover active:scale-95 sm:bottom-6"
      >
        <Sparkles className="size-5" strokeWidth={2.4} />
        <span className="text-body-sm">از کتابچی بپرس</span>
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="lg"
        title={
          <span className="flex items-center gap-2">
            <AiBadge>هوش کتابچی</AiBadge>
            دنبال چی می‌گردی؟
          </span>
        }
      >
        <AiDiscovery />
      </Modal>
    </>
  );
}
