import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const website =
      await prisma.website.findFirst();

    if (!website) {
      return NextResponse.json(
        {
          message:
            "No website connected",
        },
        {
          status: 404,
        }
      );
    }

    const baseUrl =
      website.domain.replace(
        /\/$/,
        ""
      );

    const token = Buffer.from(
      `${website.wpUsername}:${website.wpAppPassword}`
    ).toString("base64");

    const response = await fetch(
      `${baseUrl}/wp-json/wp/v2/knowledge_hub?per_page=100`,
      {
        headers: {
          Authorization:
            `Basic ${token}`,
        },
      }
    );

    const data =
      await response.json();

    return NextResponse.json(
      data
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed To Fetch Hubs",
      },
      {
        status: 500,
      }
    );
  }
}