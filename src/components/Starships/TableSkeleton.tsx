"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton(
    { rows = 5, columns = 5 }: { rows?: number; columns?: number } = {}
) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="px-5 w-full overflow-x-hidden">
              {/* Header */}
              <div className="bg-slate-900/50 border-b border-purple-500/30">
                <div className="flex">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex-1 p-4">
                      <Skeleton className="h-6 bg-purple-400/20" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rows */}
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: rowIndex * 0.1 }}
                  className="border-b border-purple-500/20"
                >
                  <div className="flex">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                      <div key={colIndex} className="flex-1 p-4">
                        <Skeleton className="h-5 bg-slate-700/50" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
