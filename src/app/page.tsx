"use client"

import Starship from "@/components/Starships"
import { Suspense } from "react"

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-300 via-purple-400 to-slate-400 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        <div className="container mx-auto py-8 px-4">
          <Suspense>
            <Starship />
          </Suspense>
        </div>
      </div>
    </>
  )
}
