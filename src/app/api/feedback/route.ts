import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rating, message, page } = body;

    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "評価は1-5の数値で指定してください" },
        { status: 400 }
      );
    }

    const feedback = {
      rating,
      message: message || "",
      page: page || "/",
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "",
    };

    console.log("[Feedback]", JSON.stringify(feedback));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "フィードバックの送信に失敗しました" },
      { status: 500 }
    );
  }
}
