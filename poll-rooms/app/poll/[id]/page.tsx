import { prisma } from "@/lib/prisma"
import PollClient from "./PollClient"

interface Props {
  params: Promise<{ id: string }> // 1. Change to Promise
}

export default async function PollPage({ params }: Props) {
  // 2. Await the params object
  const { id } = await params;

  const poll = await prisma.poll.findUnique({
    where: { id: id }, // 3. Use the awaited id
    include: {
      options: {
        include: { votes: true }
      }
    }
  })

  if (!poll) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl font-semibold">Poll not found</h1>
      </div>
    )
  }

  const formattedPoll = {
    id: poll.id,
    question: poll.question,
    options: poll.options.map(option => ({
      id: option.id,
      text: option.text,
      voteCount: option.votes.length
    }))
  }

  return <PollClient poll={formattedPoll} />
}