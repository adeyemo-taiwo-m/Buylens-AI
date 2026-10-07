"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ProgressSteps, StepItem } from "@/components/ui/ProgressSteps";
import { DEMO_SOLAR_REPORT } from "@/data/demo";

export default function AnalysisLoadingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const initialSteps: StepItem[] = [
    { id: "1", label: "Understanding the product", status: "current" },
    { id: "2", label: "Extracting specifications", status: "upcoming" },
    { id: "3", label: "Evaluating price", status: "upcoming" },
    { id: "4", label: "Identifying risks", status: "upcoming" },
    { id: "5", label: "Preparing recommendation", status: "upcoming" },
  ];

  const [steps, setSteps] = useState(initialSteps);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSteps((s) => [
        { ...s[0], status: "complete" },
        { ...s[1], status: "current" },
        s[2],
        s[3],
        s[4],
      ]);
    }, 600);

    const timer2 = setTimeout(() => {
      setSteps((s) => [
        { ...s[0], status: "complete" },
        { ...s[1], status: "complete" },
        { ...s[2], status: "current" },
        s[3],
        s[4],
      ]);
    }, 1200);

    const timer3 = setTimeout(() => {
      setSteps((s) => [
        { ...s[0], status: "complete" },
        { ...s[1], status: "complete" },
        { ...s[2], status: "complete" },
        { ...s[3], status: "current" },
        s[4],
      ]);
    }, 1800);

    const timer4 = setTimeout(() => {
      setSteps((s) => [
        { ...s[0], status: "complete" },
        { ...s[1], status: "complete" },
        { ...s[2], status: "complete" },
        { ...s[3], status: "complete" },
        { ...s[4], status: "current" },
      ]);
    }, 2400);

    const timer5 = setTimeout(() => {
      router.push(`/app/report/${DEMO_SOLAR_REPORT.id}`);
    }, 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [router]);

  return (
    <div className="max-w-xl mx-auto py-16 text-center space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
          Analyzing your purchase
        </h1>
        <p className="text-sm text-[#667085]">
          BuyLens is reviewing the information you provided.
        </p>
      </div>

      <Card variant="default" padding="lg" className="bg-white/80 backdrop-blur-sm shadow-xs">
        <ProgressSteps steps={steps} />
      </Card>

      <p className="text-xs text-[#98A2B3]">
        Checking against verified Nigerian market price databases...
      </p>
    </div>
  );
}
