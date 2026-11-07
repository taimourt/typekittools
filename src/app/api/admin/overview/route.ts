import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { adminService } from "@/lib/db/admin-service";

export async function GET() {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const overview = adminService.getOverview();
  return NextResponse.json(overview);
}

