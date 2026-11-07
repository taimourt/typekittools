import { NextResponse } from "next/server";
import { getCurrentAdminSession, isAuthorized } from "@/lib/auth/session";
import { runSeoAudit } from "@/lib/seo/validator";

export async function GET() {
  const session = await getCurrentAdminSession();
  if (!session || !isAuthorized(session.role, "viewer")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = runSeoAudit();
  return NextResponse.json(report);
}

