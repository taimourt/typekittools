import { NextRequest, NextResponse } from "next/server";
import { adminService } from "@/lib/db/admin-service";
import { requireAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdminSession("viewer");
  if (errorResponse) return errorResponse;

  const links = adminService.getInternalLinks();
  return NextResponse.json({ links });
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("editor");
  if (errorResponse || !session) return errorResponse;

  try {
    const body = await req.json();
    const { anchorText, targetUrl, category, description } = body;

    if (!anchorText || !targetUrl || !category) {
      return NextResponse.json(
        { error: "anchorText, targetUrl, and category are required." },
        { status: 400 }
      );
    }

    const created = adminService.createInternalLink(
      { anchorText, targetUrl, category, description },
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    return NextResponse.json({ link: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create link." }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("editor");
  if (errorResponse || !session) return errorResponse;

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Link ID is required." }, { status: 400 });
    }

    const updated = adminService.updateInternalLink(
      id,
      updates,
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    if (!updated) {
      return NextResponse.json({ error: "Link not found." }, { status: 404 });
    }

    return NextResponse.json({ link: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update link." }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("editor");
  if (errorResponse || !session) return errorResponse;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Link ID is required." }, { status: 400 });
    }

    const deleted = adminService.deleteInternalLink(
      id,
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    if (!deleted) {
      return NextResponse.json({ error: "Link not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete link." }, { status: 400 });
  }
}

