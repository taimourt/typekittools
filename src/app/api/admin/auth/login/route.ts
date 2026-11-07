import { NextResponse } from "next/server";
import { adminService } from "@/lib/db/admin-service";
import { signSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { user, error } = await adminService.authenticate(email, password);
    if (!user || error) {
      return NextResponse.json(
        { error: error || "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = signSessionToken(user);
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    adminService.logAudit(user, "USER_LOGIN", "AUTH", user.userId, { email: user.email }, ip);

    const response = NextResponse.json({
      success: true,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Authentication error." },
      { status: 500 }
    );
  }
}

