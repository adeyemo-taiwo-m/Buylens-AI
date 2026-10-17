import { NextRequest, NextResponse } from "next/server";
import { analyzeProduct } from "@/lib/ai/analyzer";
import { ProductInputSchema } from "@/lib/validation/analysis";
import { getDemoSession } from "@/lib/server/demo-auth";
import { checkAnalyzeRateLimit } from "@/lib/server/rate-limit";
import { saveDemoReport } from "@/lib/server/demo-reports";
import { getSampleById } from "@/lib/samples";
import { sampleReportToDecisionReport } from "@/lib/sample-reports";

function timeout<T>(promise: Promise<T>, milliseconds: number) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Analysis timed out.")), milliseconds);
    promise.then((value) => { clearTimeout(timer); resolve(value); }, (error) => { clearTimeout(timer); reject(error); });
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getDemoSession();
    if (!session) return NextResponse.json({ error: "Please sign in with the demo account to analyze a purchase." }, { status: 401 });

    const rate = checkAnalyzeRateLimit(session.visitorId);
    if (!rate.allowed) return NextResponse.json({ error: "You've reached the demo limit. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } });

    const body = await req.json();
    const parsed = ProductInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid input parameters",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const sample = getSampleById(parsed.data.sampleId);
    let report;
    try {
      report = await timeout(analyzeProduct(parsed.data, { throwOnAiFailure: Boolean(process.env.AI_API_KEY) }), 25_000);
      if (sample && !process.env.AI_API_KEY) report = sampleReportToDecisionReport(sample, report.id);
    } catch (error) {
      if (!sample) throw error;
      report = sampleReportToDecisionReport(sample);
    }

    if (sample && report.sampleId !== sample.id) report = { ...report, sampleId: sample.id };
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(report.id)) report = { ...report, id: globalThis.crypto.randomUUID() };
    await saveDemoReport(report, session);
    return NextResponse.json(report, { status: 200 });
  } catch (err) {
    console.error("API /api/analyze execution error:", err);
    return NextResponse.json(
      { error: "Internal server error occurred while analyzing the product quotation." },
      { status: 500 }
    );
  }
}
