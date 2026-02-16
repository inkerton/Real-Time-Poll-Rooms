import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { pusher } from "@/lib/pusher"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { pollId, optionId } = body

  // ✅ Next 16 requires await
  const headersList = await headers()

  const ip =
    headersList.get("x-forwarded-for") ??
    headersList.get("x-real-ip") ??
    "unknown"

  const userAgent =
    headersList.get("user-agent") ?? "unknown"

  try {
    await prisma.vote.create({
      data: {
        pollId,
        optionId,
        ipAddress: ip,
        userAgent
      }
    })

    await pusher.trigger(`poll-${pollId}`, "new-vote", {})

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Already voted" },
      { status: 400 }
    )
  }
}
