import { NextRequest, NextResponse } from "next/server";
import { adminService } from "@/lib/db/admin-service";
import { requireAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdminSession("viewer");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;

  const symbols = adminService.getCustomSymbols(category);
  return NextResponse.json({ symbols });
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("editor");
  if (errorResponse || !session) return errorResponse;

  try {
    const body = await req.json();
    const { character, name, codepoint, category, keywords, isPublished } = body;

    if (!character || !name || !codepoint || !category) {
      return NextResponse.json(
        { error: "character, name, codepoint, and category are required." },
        { status: 400 }
      );
    }

    const created = adminService.createCustomSymbol(
      { character, name, codepoint, category, keywords: keywords || [], isPublished },
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    return NextResponse.json({ symbol: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create symbol." }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("editor");
  if (errorResponse || !session) return errorResponse;

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Symbol ID is required." }, { status: 400 });
    }

    const updated = adminService.updateCustomSymbol(
      id,
      updates,
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    if (!updated) {
      return NextResponse.json({ error: "Symbol not found." }, { status: 404 });
    }

    return NextResponse.json({ symbol: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update symbol." }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("editor");
  if (errorResponse || !session) return errorResponse;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Symbol ID is required." }, { status: 400 });
    }

    const deleted = adminService.deleteCustomSymbol(
      id,
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    if (!deleted) {
      return NextResponse.json({ error: "Symbol not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete symbol." }, { status: 400 });
  }
}

