"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function CreatePollPage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [loading, setLoading] = useState(false)

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options]
    updated[index] = value
    setOptions(updated)
  }

  const addOption = () => {
    setOptions([...options, ""])
  }

  const handleSubmit = async () => {
    if (!question || options.filter(o => o.trim() !== "").length < 2) {
      alert("Please enter a question and at least 2 options")
      return
    }

    setLoading(true)

    const res = await fetch("/api/poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        options: options.filter(o => o.trim() !== "")
      })
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      router.push(`/poll/${data.id}`)
    } else {
      alert("Error creating poll")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create a Poll</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {options.map((option, index) => (
            <Input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(index, e.target.value)
              }
            />
          ))}

          <Button variant="outline" onClick={addOption}>
            Add Option
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Poll"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
