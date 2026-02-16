// import { prisma } from "@/lib/prisma"
// import Link from "next/link"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu"
// import { MoreVertical } from "lucide-react"

// export default async function DashboardPage() {
//   const polls = await prisma.poll.findMany({
//     orderBy: { createdAt: "desc" },
//     include: {
//       options: {
//         include: { votes: true }
//       }
//     }
//   })

//   const totalPolls = polls.length

//   return (
//     <div className="p-10 space-y-2">
//       <h1 className="text-3xl font-bold">
//         Dashboard
//       </h1>

//       <p className="text-muted-foreground">
//         Total Polls: {totalPolls}
//       </p>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {polls.map(poll => {
//           const totalVotes = poll.options.reduce(
//             (sum, o) => sum + o.votes.length,
//             0
//           )

//           return (
//             <Card key={poll.id} className="relative">
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <CardTitle className="text-lg">
//                     {poll.question}
//                   </CardTitle>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                       >
//                         <MoreVertical size={18} />
//                       </Button>
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem
//                         onClick={() =>
//                           navigator.clipboard.writeText(
//                             `${process.env.NEXT_PUBLIC_BASE_URL}/poll/${poll.id}`
//                           )
//                         }
//                       >
//                         Copy Poll Link
//                       </DropdownMenuItem>

//                       <DropdownMenuItem asChild>
//                         <Link href={`/poll/${poll.id}`}>
//                           Open Poll
//                         </Link>
//                       </DropdownMenuItem>

//                       <DropdownMenuItem asChild>
//                         <Link href={`/viewVotes/${poll.id}`}>
//                           View Results
//                         </Link>
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </CardHeader>

//               <CardContent>
//                 <p className="text-sm text-muted-foreground">
//                   Total Votes: {totalVotes}
//                 </p>

//                 <Link
//                   href={`/viewVotes/${poll.id}`}
//                   className="block mt-4 text-blue-500 underline"
//                 >
//                   View Results
//                 </Link>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>
//     </div>
//   )
// }


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
