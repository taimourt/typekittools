import { NextResponse } from "next/server";
import { getCurrentAdminSession, isAuthorized } from "@/lib/auth/session";
import { adminService } from "@/lib/db/admin-service";

export async function GET() {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redirects = adminService.getRedirects();
  return NextResponse.json(redirects);
}

export async function POST(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session || !isAuthorized(session.role, "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { sourcePath, targetPath, statusCode } = body;
    if (!sourcePath || !targetPath) {
      return NextResponse.json(
        { error: "Source and target paths are required" },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const newRedirect = adminService.createRedirect(
      { sourcePath, targetPath, statusCode },
      session,
      ip
    );

    return NextResponse.json({ success: true, redirect: newRedirect });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session || !isAuthorized(session.role, "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "Redirect ID is required" }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const toggled = adminService.toggleRedirect(id, session, ip);
    if (!toggled) {
      return NextResponse.json({ error: "Redirect not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, redirect: toggled });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session || !isAuthorized(session.role, "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Redirect ID is required" }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const deleted = adminService.deleteRedirect(id, session, ip);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

