import { NextRequest, NextResponse } from "next/server";
import { adminService } from "@/lib/db/admin-service";
import { requireAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdminSession("viewer");
  if (errorResponse) return errorResponse;

  const placements = adminService.getAdPlacements();
  return NextResponse.json({ placements });
}

export async function PUT(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("admin");
  if (errorResponse || !session) return errorResponse;

  try {
    const body = await req.json();
    const { zoneKey, ...updates } = body;

    if (!zoneKey) {
      return NextResponse.json({ error: "zoneKey is required." }, { status: 400 });
    }

    const updated = adminService.updateAdPlacement(
      zoneKey,
      updates,
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    if (!updated) {
      return NextResponse.json({ error: `Placement '${zoneKey}' not found.` }, { status: 404 });
    }

    return NextResponse.json({ placement: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update ad placement." }, { status: 400 });
  }
}

