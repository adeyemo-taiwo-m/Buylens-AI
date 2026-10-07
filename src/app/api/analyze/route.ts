import { NextRequest, NextResponse } from "next/server";
import { analyzeProduct } from "@/lib/ai/analyzer";
import { ProductInputSchema } from "@/lib/validation/analysis";

export async function POST(req: NextRequest) {
  try {
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

    const report = await analyzeProduct(parsed.data);
    return NextResponse.json(report, { status: 200 });
  } catch (err) {
    console.error("API /api/analyze execution error:", err);
    return NextResponse.json(
      { error: "Internal server error occurred while analyzing the product quotation." },
      { status: 500 }
    );
  }
}
