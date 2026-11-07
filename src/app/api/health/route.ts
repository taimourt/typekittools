import { NextResponse } from "next/server";
import { adminService } from "@/lib/db/admin-service";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "healthy";

  try {
    // Verify admin store / database readability
    const overview = adminService.getOverview();
    if (!overview || typeof overview.kpi.totalTools !== "number") {
      dbStatus = "degraded";
    }
  } catch (err) {
    dbStatus = "unhealthy";
  }

  const memoryUsage = process.memoryUsage();
  const uptimeSeconds = Math.floor(process.uptime());

  const responseTimeMs = Date.now() - startTime;
  const isHealthy = dbStatus !== "unhealthy";

  return NextResponse.json(
    {
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "production",
      uptime: {
        seconds: uptimeSeconds,
        human: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${uptimeSeconds % 60}s`,
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
      },
      memory: {
        heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
      },
      services: {
        database: dbStatus,
        apiLatencyMs: responseTimeMs,
      },
    },
    {
      status: isHealthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}

