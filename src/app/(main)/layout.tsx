import { Navbar } from "@/components/Navbar";
import { MobileHeader, MobileNavbar } from "@/components/MobileNavbar";
import { FloatingAiCta } from "@/components/ai/FloatingAiCta";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MobileHeader />
      <main className="container-app min-h-[calc(100vh-4rem)] pb-24 pt-4 md:pb-12 md:pt-6">
        {children}
      </main>
      <FloatingAiCta />
      <MobileNavbar />
    </>
  );
}
