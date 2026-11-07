import { NextResponse } from "next/server";
import { getCurrentAdminSession, isAuthorized } from "@/lib/auth/session";
import { adminService } from "@/lib/db/admin-service";

export async function GET() {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = adminService.getCategories();
  return NextResponse.json(categories);
}

export async function PATCH(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session || !isAuthorized(session.role, "editor")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const updated = adminService.updateCategory(id, updates, session, ip);
    if (!updated) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

