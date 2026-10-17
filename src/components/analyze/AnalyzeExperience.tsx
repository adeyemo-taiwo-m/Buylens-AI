"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { type Sample } from "@/lib/samples";
import { AnalyzeForm } from "./AnalyzeForm";
import { AnalyzeHeader } from "./AnalyzeHeader";
import { SampleModal } from "./SampleModal";

type SampleRequest = { sample: Sample; key: number } | null;

export function AnalyzeExperience() {
  const { toast } = useToast();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [sampleRequest, setSampleRequest] = useState<SampleRequest>(null);
  const [loadedSample, setLoadedSample] = useState<Sample | null>(null);
  const [clearSignal, setClearSignal] = useState(0);

  useEffect(() => {
    void fetch("/api/auth/session", { cache: "no-store" }).then((response) => response.json()).then((body) => {
      const key = `buylens-sample-modal-seen:${body.visitorId || "current"}`;
      try {
        if (window.localStorage.getItem(key) === "1") return;
        window.localStorage.setItem(key, "1");
        setOpen(true);
      } catch { setOpen(true); }
    }).catch(() => setOpen(true));
  }, []);

  const selectSample = (sample: Sample) => {
    setSampleRequest({ sample, key: Date.now() });
    setOpen(false);
  };

  const clearSample = () => {
    setLoadedSample(null);
    setSampleRequest(null);
    setClearSignal((value) => value + 1);
  };

  const handleSampleApplied = useCallback((sample: Sample) => {
    setLoadedSample(sample);
    toast("Sample loaded. You can edit before analyzing", "success");
  }, [toast]);

  return (
    <>
      <AnalyzeHeader onTrySample={() => setOpen(true)} triggerRef={triggerRef} />
      {loadedSample && <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-2 text-sm text-primary-700"><span className="truncate">Sample loaded: <strong>{loadedSample.title}</strong></span><button type="button" onClick={clearSample} aria-label="Clear loaded sample" className="shrink-0 rounded-full px-1.5 py-0.5 font-medium text-primary-600 hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1">Clear <span aria-hidden="true">×</span></button></div>}
      <div className="mt-6"><AnalyzeForm sampleRequest={sampleRequest} clearSignal={clearSignal} onSampleApplied={handleSampleApplied} /></div>
      <SampleModal open={open} triggerRef={triggerRef} onClose={() => setOpen(false)} onSelect={selectSample} />
    </>
  );
}
