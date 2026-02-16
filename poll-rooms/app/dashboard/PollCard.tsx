"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"

interface PollCardProps {
  id: string
  question: string
  totalVotes: number
}

export default function PollCard({
  id,
  question,
  totalVotes
}: PollCardProps) {

  const copyLink = () => {
    const url = `${window.location.origin}/poll/${id}`
    navigator.clipboard.writeText(url)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {question}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={copyLink}>
                Copy Poll Link
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/poll/${id}`}>
                  Open Poll
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/viewVotes/${id}`}>
                  View Results
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Total Votes: {totalVotes}
        </p>

        {/* ✅ View Results Link on Card */}
        <Link
          href={`/viewVotes/${id}`}
          className="inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          View Results →
        </Link>
      </CardContent>
    </Card>
  )
}
