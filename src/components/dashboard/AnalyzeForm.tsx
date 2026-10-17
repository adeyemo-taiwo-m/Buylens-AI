"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Link2, Search } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";

const formatNaira = (value: string) => value ? new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(Number(value)) : "";

export function AnalyzeForm() {
  const router = useRouter();
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [priceFocused, setPriceFocused] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedProduct = product.trim();
    const trimmedLink = link.trim();
    if (!trimmedProduct && !trimmedLink) {
      setError("Add a product name or link to continue.");
      return;
    }
    if (trimmedLink) {
      try {
        const parsed = new URL(trimmedLink);
        if (!/^https?:$/.test(parsed.protocol)) throw new Error("invalid");
      } catch {
        setError("Enter a valid link.");
        return;
      }
    }

    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedProduct || "Product from link",
          price: price ? Number(price) : undefined,
          description: trimmedLink,
          link: trimmedLink,
          category: "other",
        }),
      });
      if (!response.ok) throw new Error("Unable to complete analysis. Please try again.");
      const report = await response.json();
      router.push(`/report/${report.id}`);
    } catch (submitError) {
      setLoading(false);
      setError(submitError instanceof Error ? submitError.message : "Unable to complete analysis. Please try again.");
    }
  };

  return (
    <section className="dashboard-form-card relative overflow-hidden rounded-[24px] bg-white px-5 py-6 sm:px-[26px] sm:py-7">
      <svg aria-hidden="true" className="pointer-events-none absolute -right-[18px] -top-[67px] h-[290px] w-[290px]" viewBox="0 0 290 290" fill="none">
        <defs><linearGradient id="dashboard-arc-gradient" x1="43" y1="35" x2="255" y2="260" gradientUnits="userSpaceOnUse"><stop stopColor="#2563EB" /><stop offset="1" stopColor="#2563EB" stopOpacity="0" /></linearGradient></defs>
        <circle cx="145" cy="145" r="137" stroke="url(#dashboard-arc-gradient)" strokeWidth="16" />
      </svg>
      <div className="relative z-10">
        <h2 className="text-[22px] font-semibold leading-[1.25] text-[#333333] sm:text-[28px]">What are you thinking of buying?</h2>
        <p className="mt-[7px] text-[11px] leading-[1.4] text-[#5F6B7A] sm:text-[12px]">Get a clearer picture of the value, risks, and details to verify before you pay.</p>
        <form onSubmit={submit} className="mt-6">
          <fieldset disabled={loading} className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-7">
            <Field label="Product" htmlFor="dashboard-product" error={error && !product.trim() && !link.trim() ? error : null}>
              <div className="relative"><Search className="pointer-events-none absolute left-[14px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#7B8494]" /><input id="dashboard-product" name="product" autoComplete="off" value={product} onChange={(event) => { setProduct(event.target.value); if (error) setError(null); }} placeholder="e.g. Samsung Galaxy A56 5G 256GB" className="dashboard-input pl-11" aria-describedby={error && !product.trim() && !link.trim() ? "dashboard-form-error" : undefined} aria-invalid={Boolean(error && !product.trim() && !link.trim())} /></div>
            </Field>
            <Field label="Price" htmlFor="dashboard-price">
              <input id="dashboard-price" name="price" inputMode="numeric" value={priceFocused ? price : formatNaira(price)} onFocus={() => setPriceFocused(true)} onBlur={() => setPriceFocused(false)} onChange={(event) => setPrice(event.target.value.replace(/[^0-9]/g, ""))} placeholder="e.g. ₦650,000" className="dashboard-input" />
            </Field>
            <Field label="Product link" htmlFor="dashboard-link" error={error === "Enter a valid link." ? error : null} className="lg:col-span-1">
              <div className="relative"><Link2 className="pointer-events-none absolute left-[14px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#7B8494]" /><input id="dashboard-link" name="link" type="url" value={link} onChange={(event) => { setLink(event.target.value); if (error) setError(null); }} placeholder="e.g. https://example.com/product-page" className="dashboard-input pl-11" aria-describedby={error === "Enter a valid link." ? "dashboard-form-error" : undefined} aria-invalid={error === "Enter a valid link."} /></div>
            </Field>
            <div className="flex items-end lg:justify-end"><CtaButton type="submit" variant="primary" loading={loading} trailingIcon={<ArrowRight className="h-5 w-5" />} className="h-[49px] w-full lg:w-[219px]">Analyze a purchase</CtaButton></div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, error, className, children }: { label: string; htmlFor: string; error?: string | null; className?: string; children: React.ReactNode }) {
  return <div className={className}><label htmlFor={htmlFor} className="mb-2 block text-sm text-[#6B7280]">{label}</label>{children}{error && <p id="dashboard-form-error" role="alert" className="mt-2 text-xs font-medium text-[#B42318]">{error}</p>}</div>;
}
