import { getCurrentAdminSession } from "@/lib/auth/session";
import { AdminNav } from "./admin-nav";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata = {
  title: "Admin Command Center | TypeKitTools",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";

  // Allow login page without auth check
  const session = await getCurrentAdminSession();

  // If user is accessing login, don't wrap with dashboard shell
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased">
      {session && <AdminNav user={session} />}
      <main className="flex-1 min-w-0 bg-slate-900/60 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

