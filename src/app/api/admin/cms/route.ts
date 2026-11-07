import { NextResponse } from "next/server";
import { getCurrentAdminSession, isAuthorized } from "@/lib/auth/session";
import { adminService } from "@/lib/db/admin-service";

export async function GET(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const publishedOnly = searchParams.get("publishedOnly") === "true";

  const articles = adminService.getCmsArticles(!publishedOnly);
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const session = await getCurrentAdminSession();
  if (!session || !isAuthorized(session.role, "editor")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, slug, contentMarkdown, seoTitle, seoDescription } = body;

    if (!title || !slug || !contentMarkdown) {
      return NextResponse.json(
        { error: "Title, slug, and content are required." },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const article = adminService.createCmsArticle(body, session, ip);
    return NextResponse.json({ success: true, article });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
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
      return NextResponse.json({ error: "Article ID is required." }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const updated = adminService.updateCmsArticle(id, updates, session, ip);
    if (!updated) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, article: updated });
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
      return NextResponse.json({ error: "Article ID is required." }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const deleted = adminService.deleteCmsArticle(id, session, ip);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

