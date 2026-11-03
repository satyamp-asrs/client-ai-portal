import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const website = await prisma.website.findFirst();

    if (!website) {
      return NextResponse.json([]);
    }

    const baseUrl = website.domain.replace(/\/$/, "");

    const token = Buffer.from(
      `${website.wpUsername}:${website.wpAppPassword}`
    ).toString("base64");

    const response = await fetch(
      `${baseUrl}/wp-json/wp/v2/knowledge?per_page=100`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    console.log("Knowledge count:", data.length);

    return NextResponse.json(data);
  } catch (error) {
    console.error("KNOWLEDGE ERROR:", error);

    return NextResponse.json([]);
  }
}