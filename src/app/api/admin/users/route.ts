import { NextRequest, NextResponse } from "next/server";
import { adminService } from "@/lib/db/admin-service";
import { requireAdminSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("admin");
  if (errorResponse) return errorResponse;

  const users = adminService.getUsers();
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("super_admin");
  if (errorResponse || !session) return errorResponse;

  try {
    const body = await req.json();
    const { email, name, password, role } = body;

    if (!email || !name || !password || !role) {
      return NextResponse.json(
        { error: "Email, name, password, and role are required." },
        { status: 400 }
      );
    }

    const newUser = adminService.createUser(
      { email, name, password, role },
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create user." }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("super_admin");
  if (errorResponse || !session) return errorResponse;

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const updatedUser = adminService.updateUser(
      id,
      updates,
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update user." }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { session, errorResponse } = await requireAdminSession("super_admin");
  if (errorResponse || !session) return errorResponse;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const deleted = adminService.deleteUser(
      id,
      session,
      req.headers.get("x-forwarded-for") || "127.0.0.1"
    );

    if (!deleted) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete user." }, { status: 400 });
  }
}

