import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const websites =
      await prisma.website.findMany({
        select: {
          id: true,
          name: true,
          domain: true,
        },
      });

    return NextResponse.json(
      websites
    );

  } catch (error) {

    return NextResponse.json(
      {
        message: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}
