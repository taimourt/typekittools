import { NextRequest, NextResponse } from "next/server";
import { adminService } from "@/lib/db/admin-service";
import { requireAdminSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("editor");
  if (errorResponse || !session) return errorResponse;

  try {
    const body = await req.json();
    const { rawJson } = body;

    if (!rawJson) {
      return NextResponse.json({ error: "rawJson string is required." }, { status: 400 });
    }

    const result = adminService.importSymbolsFromJson(
      rawJson,
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to import symbols." }, { status: 400 });
  }
}

