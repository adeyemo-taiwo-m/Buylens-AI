"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Link2, Search } from "lucide-react";
import { saveStoredReport } from "@/lib/storage/reports";
import { CtaButton } from "@/components/ui/CtaButton";
import { DecorativeArc } from "@/components/ui/DecorativeArc";
import { FormField } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";
import { CategorySelect } from "./CategorySelect";
import { ImageDropzone } from "./ImageDropzone";
import { ANALYZE_COPY, API_CATEGORY_BY_ANALYZE_CATEGORY, type AnalyzeCategory, type AnalyzePriority } from "./analyze.data";
import { PriceInput } from "./PriceInput";
import { PriorityCheckboxes } from "./PriorityCheckboxes";
import { UsageTextarea } from "./UsageTextarea";

type AnalyzeErrors = Partial<Record<"product" | "price" | "budget" | "link" | "usage" | "image", string>>;

export function AnalyzeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [budget, setBudget] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState<AnalyzeCategory>("");
  const [usage, setUsage] = useState("");
  const [priorities, setPriorities] = useState<AnalyzePriority[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [errors, setErrors] = useState<AnalyzeErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // The query values arrive after the Suspense boundary resolves; this is intentionally a one-time prefill.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const queryProduct = searchParams.get("product");
    const queryPrice = searchParams.get("price");
    const queryLink = searchParams.get("link");
    if (queryProduct !== null) setProduct(queryProduct);
    if (queryPrice !== null) setPrice(queryPrice.replace(/[^0-9]/g, ""));
    if (queryLink !== null) setLink(queryLink);
  }, [searchParams]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const validate = (): AnalyzeErrors => {
    const nextErrors: AnalyzeErrors = {};
    const trimmedProduct = product.trim();
    const trimmedLink = link.trim();

    if (!trimmedProduct && !trimmedLink) nextErrors.product = ANALYZE_COPY.requiredError;
    if (trimmedLink) {
      try {
        const parsed = new URL(trimmedLink);
        if (!/^https?:$/.test(parsed.protocol)) throw new Error("invalid");
      } catch {
        nextErrors.link = ANALYZE_COPY.linkError;
      }
    }
    if (price && Number(price) <= 0) nextErrors.price = ANALYZE_COPY.priceError;
    if (budget && Number(budget) <= 0) nextErrors.budget = ANALYZE_COPY.priceError;
    if (usage.length > 300) nextErrors.usage = ANALYZE_COPY.usageError;
    if (imageError) nextErrors.image = imageError;
    return nextErrors;
  };

  const validateAfterBlur = () => {
    if (submitted) setErrors(validate());
  };

  const clearError = (key: keyof AnalyzeErrors) => {
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const focusFirstInvalid = (nextErrors: AnalyzeErrors) => {
    const firstInvalidId = nextErrors.product ? "analyze-product" : nextErrors.link ? "analyze-link" : nextErrors.price ? "analyze-price" : nextErrors.budget ? "analyze-budget" : nextErrors.usage ? "analyze-usage" : "analyze-image";
    requestAnimationFrame(() => document.getElementById(firstInvalidId)?.focus());
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setSubmitted(true);
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const apiCategory = category ? API_CATEGORY_BY_ANALYZE_CATEGORY[category] : "other";
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: product.trim(),
          name: product.trim() || "Product from link",
          price: price ? Number(price) : undefined,
          budget: budget ? Number(budget) : undefined,
          link: link.trim() || undefined,
          category: apiCategory,
          categoryLabel: category,
          usage: usage.trim() || undefined,
          priorities,
          image: image ? { name: image.name, size: image.size, type: image.type } : undefined,
          description: [usage.trim(), link.trim() ? `Product link: ${link.trim()}` : ""].filter(Boolean).join("\n\n") || undefined,
        }),
      });
      if (!response.ok) throw new Error("Unable to complete analysis. Please try again.");
      const report = await response.json();
      saveStoredReport(report);
      router.push(`/report/${report.id}`);
    } catch (error) {
      setLoading(false);
      setSubmitError(error instanceof Error ? error.message : "Unable to complete analysis. Please try again.");
    }
  };

  return (
    <section className="analyze-form-card relative overflow-hidden rounded-[24px] bg-white px-5 py-6 sm:min-h-[788px] sm:px-[26px] sm:py-7">
      <DecorativeArc gradientId="analyze-arc-gradient" />
      <form noValidate onSubmit={submit} className="relative z-10">
        <fieldset disabled={loading} className="min-w-0 border-0 p-0">
          <div className="space-y-[26px]">
            <FormField label={ANALYZE_COPY.productLabel} htmlFor="analyze-product" error={errors.product}>
              <div className="relative">
                <Search aria-hidden="true" strokeWidth={1.75} className="pointer-events-none absolute left-[14px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#7B8494]" />
                <input id="analyze-product" name="product" autoComplete="off" value={product} onChange={(event) => { setProduct(event.target.value); clearError("product"); }} onBlur={validateAfterBlur} placeholder={ANALYZE_COPY.productPlaceholder} aria-describedby={errors.product ? "analyze-product-error" : undefined} aria-invalid={Boolean(errors.product)} className={cn("dashboard-input dashboard-input-with-icon", errors.product && "analyze-input-error")} />
              </div>
            </FormField>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-x-10">
              <FormField label={ANALYZE_COPY.priceLabel} htmlFor="analyze-price" error={errors.price}>
                <PriceInput id="analyze-price" name="price" inputMode="numeric" placeholder={ANALYZE_COPY.pricePlaceholder} value={price} onValueChange={(value) => { setPrice(value); clearError("price"); }} onBlur={validateAfterBlur} invalid={Boolean(errors.price)} aria-describedby={errors.price ? "analyze-price-error" : undefined} />
              </FormField>
              <FormField label={ANALYZE_COPY.budgetLabel} htmlFor="analyze-budget" error={errors.budget}>
                <PriceInput id="analyze-budget" name="budget" inputMode="numeric" placeholder={ANALYZE_COPY.budgetPlaceholder} value={budget} onValueChange={(value) => { setBudget(value); clearError("budget"); }} onBlur={validateAfterBlur} invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "analyze-budget-error" : undefined} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-x-10">
              <FormField label={ANALYZE_COPY.linkLabel} htmlFor="analyze-link" error={errors.link}>
                <div className="relative">
                  <Link2 aria-hidden="true" strokeWidth={1.75} className="pointer-events-none absolute left-[14px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#7B8494]" />
                  <input id="analyze-link" name="link" type="url" value={link} onChange={(event) => { setLink(event.target.value); clearError("link"); }} onBlur={validateAfterBlur} placeholder={ANALYZE_COPY.linkPlaceholder} aria-describedby={errors.link ? "analyze-link-error" : undefined} aria-invalid={Boolean(errors.link)} className={cn("dashboard-input dashboard-input-with-icon", errors.link && "analyze-input-error")} />
                </div>
              </FormField>
              <FormField label={ANALYZE_COPY.categoryLabel} htmlFor="analyze-category">
                <CategorySelect value={category} onValueChange={setCategory} disabled={loading} />
              </FormField>
            </div>

            <FormField label={ANALYZE_COPY.usageLabel} htmlFor="analyze-usage" error={errors.usage}>
              <UsageTextarea value={usage} onValueChange={(value) => { setUsage(value); clearError("usage"); }} onBlur={validateAfterBlur} invalid={Boolean(errors.usage)} disabled={loading} describedBy={errors.usage ? "analyze-usage-error" : undefined} />
            </FormField>

            <ImageDropzone file={image} onFileChange={setImage} onErrorChange={(error) => { setImageError(error); if (error) setErrors((current) => ({ ...current, image: error })); else clearError("image"); }} disabled={loading} />

            <fieldset className="border-0 p-0">
              <legend className="analyze-label">{ANALYZE_COPY.prioritiesLabel}</legend>
              <PriorityCheckboxes value={priorities} onValueChange={setPriorities} disabled={loading} />
            </fieldset>

            <div className="flex justify-end pt-0">
              <CtaButton type="submit" variant="primary" loading={loading} trailingIcon={<ArrowRight className="h-5 w-5" />} className="h-[49px] min-w-[218px] whitespace-nowrap">{ANALYZE_COPY.analyzeButton}</CtaButton>
            </div>
          </div>
        </fieldset>
        <div aria-live="polite" className="sr-only">{Object.keys(errors).length > 0 ? ANALYZE_COPY.errorSummary(Object.keys(errors).length) : submitError || ""}</div>
      </form>
    </section>
  );
}
