import { prisma } from "@/lib/prisma"

export default async function ViewVotesPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return <div className="p-10">Invalid Poll ID</div>
  }

  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      options: {
        include: {
          votes: true
        }
      }
    }
  })

  if (!poll) {
    return <div className="p-10">Poll not found</div>
  }

  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes.length,
    0
  )

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-[600px] space-y-6">
        <h1 className="text-2xl font-bold">{poll.question}</h1>

        {poll.options.map(option => {
          const voteCount = option.votes.length
          const percentage =
            totalVotes === 0
              ? 0
              : ((voteCount / totalVotes) * 100).toFixed(1)

          return (
            <div key={option.id} className="space-y-1 border p-4 rounded">
              <div className="flex justify-between">
                <span className="font-medium">{option.text}</span>
                <span>{voteCount} votes</span>
              </div>

              <div className="text-sm text-gray-500">
                {percentage}%
              </div>
            </div>
          )
        })}

        <div className="pt-4 border-t">
          <strong>Total Votes: {totalVotes}</strong>
        </div>
      </div>
    </div>
  )
}
