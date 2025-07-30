"use client"

import Starship from "@/components/Starships"

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        <div className="container mx-auto py-8 px-4">
          <Starship />
        </div>
      </div>
    </>
  )
}
