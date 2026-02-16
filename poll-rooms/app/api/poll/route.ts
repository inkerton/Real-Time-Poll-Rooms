import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { question, options } = body

    if (!question || !options || options.length < 2) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      )
    }

    const poll = await prisma.poll.create({
      data: {
        question,
        options: {
          create: options.map((text: string) => ({ text }))
        }
      }
    })

    return NextResponse.json(poll)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
