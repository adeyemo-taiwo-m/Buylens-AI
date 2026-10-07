"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { UploadDropzone } from "@/components/ui/UploadDropzone";
import { ProductCategory } from "@/types/analysis";
import { saveStoredReport } from "@/lib/storage/reports";
import { useToast } from "@/components/ui/Toast";
import { ArrowRight, AlertCircle, Info } from "lucide-react";

export default function AppAnalyzePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("solar_power");
  const [price, setPrice] = useState("");
  const currency = "NGN";
  const [productUrl, setProductUrl] = useState("");
  const [platform, setPlatform] = useState("whatsapp");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !description.trim()) {
      setError("Add a product description or title before continuing.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // Direct to analysis loading screen with query state or submit directly
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Proposed Purchase Item",
          category,
          price: price ? parseFloat(price) : undefined,
          currency,
          sellerPlatform: platform,
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to complete analysis. Please verify details.");
      }

      const report = await response.json();
      saveStoredReport(report);
      toast("Purchase analysis complete", "success");
      router.push(`/app/report/${report.id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong while connecting. Please retry."
      );
      setLoading(false);
    }
  };

  const handleFillSolarSample = () => {
    setName("5kVA Hybrid Inverter + 5kWh Lithium LiFePO4 Battery System");
    setCategory("solar_power");
    setPrice("850000");
    setPlatform("whatsapp");
    setDescription(
      "WhatsApp seller quoted ₦850,000 for 5kVA pure sine wave inverter and 5kWh battery. Mentions free breakers. Does not specify cycle life or installation scope."
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E4E7EC] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
            Analyze a purchase
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Give BuyLens enough information to understand what you&apos;re considering.
          </p>
        </div>

        <button
          type="button"
          onClick={handleFillSolarSample}
          className="text-xs font-semibold text-[#0B1220] hover:underline shrink-0"
        >
          Fill sample solar quotation
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-[12px] bg-[#FEF3F2] border border-[#FECDCA] text-xs sm:text-sm text-[#B42318] flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card variant="default" padding="lg" className="space-y-5">
          {/* Describe It (Primary) */}
          <Textarea
            label="Describe it *"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste the product description, specifications, price, or anything the seller sent you..."
            hint="You can paste messy WhatsApp quotes, bulleted spec sheets, or warranty claims."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Product Title / Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 5kVA Solar Inverter + Lithium Battery"
            />

            <Select
              label="Product Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              options={[
                { value: "solar_power", label: "Solar & Power Systems" },
                { value: "generators", label: "Generators" },
                { value: "computing", label: "Laptops & Workstations" },
                { value: "smartphones", label: "Smartphones & Tablets" },
                { value: "appliances", label: "Home Appliances" },
                { value: "other", label: "Other High-Value Item" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Quoted Price (₦ NGN)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 850000"
              hint="Leave blank if price is still being negotiated."
            />

            <Select
              label="Seller Channel / Platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              options={[
                { value: "whatsapp", label: "WhatsApp Quotation" },
                { value: "jiji", label: "Jiji Listing" },
                { value: "instagram", label: "Instagram Vendor" },
                { value: "physical_store", label: "Physical Store (Alaba / Computer Village)" },
                { value: "other", label: "Other Marketplace" },
              ]}
            />
          </div>

          {/* Product URL Input (Optional) */}
          <Input
            label="Product URL (Optional)"
            type="url"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            placeholder="https://..."
            hint="For MVP, the URL will be attached to the decision record."
          />

          {/* Upload Listing Screenshot Dropzone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#101828] mb-1.5">
              Upload Listing or Screenshot (Optional)
            </label>
            <UploadDropzone />
          </div>
        </Card>

        {/* Disclaimer Note per Section 48 */}
        <div className="p-3.5 rounded-[10px] bg-[#F2F4F0] text-xs text-[#667085] flex items-start gap-2">
          <Info className="h-4 w-4 shrink-0 text-[#101828] mt-0.5" />
          <span>
            BuyLens provides AI-assisted decision support, not professional financial, technical, or legal advice. Verify important information independently before purchasing.
          </span>
        </div>

        {/* Submit Button per Section 26 */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading || (!name.trim() && !description.trim())}
          className="w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Preparing analysis...</span>
          ) : (
            <>
              <span>Analyze with BuyLens</span>
              <ArrowRight className="h-4 w-4 text-[#B8F34A]" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
