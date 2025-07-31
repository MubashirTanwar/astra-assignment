"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({
  rows = 5,
  columns = 5,
}: { rows?: number; columns?: number } = {}) {
  return (
    <div className="px-5 w-full overflow-x-hidden">
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <motion.div
          key={rowIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: rowIndex * 0.1 }}
        >
          <div className="flex">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="flex-1 p-4">
                <Skeleton className="h-5 bg-purple-400/50" />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
