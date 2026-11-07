import { NextResponse } from "next/server";
import { getCurrentAdminSession, isAuthorized } from "@/lib/auth/session";
import { adminService } from "@/lib/db/admin-service";

export async function GET(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session || !isAuthorized(session.role, "viewer")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100", 10);

  const logs = adminService.getAuditLogs(limit);
  return NextResponse.json(logs);
}

