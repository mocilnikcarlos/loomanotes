import { NextResponse } from "next/server";
import { openApiDocument } from "@/lib/openapi/generator";

export async function GET(req: Request) {
  const url = new URL(req.url);

  if (url.pathname === "/api/swagger/swagger.json") {
    return NextResponse.json(openApiDocument);
  }

  return NextResponse.json({ message: "Not Found" }, { status: 404 });
}
