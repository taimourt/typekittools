import { NextResponse } from "next/server";
import { getCurrentAdminSession, ADMIN_COOKIE_NAME } from "@/lib/auth/session";
import { adminService } from "@/lib/db/admin-service";

export async function POST(request: Request) {
  try {
    const session = await getCurrentAdminSession();
    if (session) {
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";
      adminService.logAudit(
        session,
        "USER_LOGOUT",
        "AUTH",
        session.userId,
        { email: session.email },
        ip
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: "",
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

