"use client"

import { useEffect, useState } from "react"
import Pusher from "pusher-js"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface PollOption {
  id: string
  text: string
  voteCount: number
}

interface PollProps {
  poll?: {
    id: string
    question: string
    options: PollOption[]
  }
}

export default function PollClient({ poll }: PollProps) {
  if (!poll) {
    return <div>Loading...</div>
  }

  const [options, setOptions] = useState<PollOption[]>(poll.options || [])
  const [selected, setSelected] = useState<string | null>(null)

  const totalVotes = options.reduce((acc, o) => acc + o.voteCount, 0)

  const fetchUpdatedPoll = async () => {
    const res = await fetch(`/api/poll?id=${poll.id}`)
    const data = await res.json()
    setOptions(data.options)
  }

  const handleVote = async () => {
    if (!selected) return

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pollId: poll.id,
        optionId: selected
      })
    })

    if (res.ok) {
      document.cookie = `voted_${poll.id}=true; path=/; max-age=31536000`
    }
  }

  // 🔥 REAL-TIME LISTENER GOES HERE
  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_KEY!,
      { cluster: "ap2" }
    )

    const channel = pusher.subscribe(`poll-${poll.id}`)

    channel.bind("new-vote", () => {
      fetchUpdatedPoll()
    })

    return () => {
      pusher.unsubscribe(`poll-${poll.id}`)
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-[500px] space-y-6">
        <h2 className="text-xl font-bold">{poll.question}</h2>

        <RadioGroup onValueChange={setSelected}>
          {options.map(option => (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} />
                <span>{option.text}</span>
              </div>

              <Progress
                value={
                  totalVotes === 0
                    ? 0
                    : (option.voteCount / totalVotes) * 100
                }
              />
              <p className="text-sm text-muted-foreground">
                {option.voteCount} votes
              </p>
            </div>
          ))}
        </RadioGroup>

        <Button onClick={handleVote}>Vote</Button>

        <p className="text-sm text-muted-foreground">
          Total Votes: {totalVotes}
        </p>

        <a
          href={`/viewVotes/${poll.id}`}
          className="text-blue-500 underline"
        >
          View Results
        </a>

      </div>
    </div>
  )
}
