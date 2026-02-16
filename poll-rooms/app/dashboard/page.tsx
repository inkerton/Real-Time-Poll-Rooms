
export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"
import PollCard from "./PollCard"

export default async function DashboardPage() {
  const polls = await prisma.poll.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      options: {
        include: { votes: true }
      }
    }
  })

  const totalPolls = polls.length

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Total Polls: {totalPolls}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map(poll => {
          const totalVotes = poll.options.reduce(
            (sum, o) => sum + o.votes.length,
            0
          )

          return (
            <PollCard
              key={poll.id}
              id={poll.id}
              question={poll.question}
              totalVotes={totalVotes}
            />
          )
        })}
      </div>
    </div>
  )
}
