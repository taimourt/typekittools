import crypto from "node:crypto";

export const ADMIN_COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE || "tkt_admin_session";
const SECRET_KEY =
  process.env.ADMIN_SECRET_KEY || "typekit-tools-default-development-secret-32-chars";

export type AdminRole = "super_admin" | "admin" | "editor" | "author" | "viewer";

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number; // Unix timestamp in seconds
}

/**
 * Sign a payload into a base64url HMAC-SHA256 session token
 */
export function signSessionToken(payload: AdminSessionPayload): string {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verify and decode an HMAC-SHA256 session token
 */
export function verifySessionToken(token: string): AdminSessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "utf-8"),
        Buffer.from(expectedSignature, "utf-8")
      )
    ) {
      return null;
    }

    const payload: AdminSessionPayload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8")
    );

    // Verify expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Read the current session in Server Components or Route Handlers
 */
export async function getCurrentAdminSession(): Promise<AdminSessionPayload | null> {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Role hierarchy checker
 * Super Admin (5) > Admin (4) > Editor (3) > Author (2) > Viewer (1)
 */
export function isAuthorized(
  userRole: AdminRole,
  minimumRole: AdminRole
): boolean {
  const levels: Record<AdminRole, number> = {
    viewer: 1,
    author: 2,
    editor: 3,
    admin: 4,
    super_admin: 5,
  };

  return (levels[userRole] || 0) >= (levels[minimumRole] || 0);
}

/**
 * Server-side RBAC guard for API route handlers
 */
export async function requireAdminSession(
  minimumRole: AdminRole = "viewer"
): Promise<{ session: AdminSessionPayload | null; errorResponse?: Response }> {
  const session = await getCurrentAdminSession();
  if (!session) {
    return {
      session: null,
      errorResponse: new Response(
        JSON.stringify({ error: "Unauthorized. Admin authentication required." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  if (!isAuthorized(session.role, minimumRole)) {
    return {
      session: null,
      errorResponse: new Response(
        JSON.stringify({
          error: `Forbidden. Requires minimum '${minimumRole}' permission.`,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  return { session };
}
