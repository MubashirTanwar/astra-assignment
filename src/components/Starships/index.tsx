"use client"

import { useInfiniteStarships } from "@/hooks/tanstack/useStarships"
import { useInView } from "react-intersection-observer"
import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAtom } from "jotai"
import { StarshipFilters } from "@/components/Starships/Filters"
import { SelectedShips } from "@/components/Starships/SelectedShips"
import { CompareModal } from "@/components/Starships/CompareModal"
import { StarshipDataTable } from "@/components/Starships/Table"
import { ThemeToggle } from "@/components/ui/theme-toggler"
import { selectedStarshipsAtom, tableStateAtom } from "@/lib/atom"
import { useUrlSync } from "@/hooks/useUrlSync"

export default function StarshipTable() {
  const { ref, inView } = useInView()
  const [selectedStarships] = useAtom(selectedStarshipsAtom)
  const [tableState] = useAtom(tableStateAtom)

  // Sync URL with table state
  useUrlSync()

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteStarships({
    search: tableState.search,
    "filters.hdr": tableState.hyperdriveFilter,
    "filters.crew": tableState.crewFilter,
    sort: tableState.sortField,
    order: tableState.sortOrder,
  })

  const flatData = useMemo(() => {
    return data?.pages.flatMap((page) => page.body.results) || []
  }, [data])


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 font-starwars tracking-wider leading-tight">
            imperial starship database</h1>
          <p className="text-purple-200 font-starwars">Explore the galaxy's most powerful vessels</p>
        </div>
        <ThemeToggle />
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <StarshipFilters />
      </motion.div>

      {/* Selected Ships */}
      <AnimatePresence>
        {selectedStarships.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SelectedShips />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <StarshipDataTable
          flatData={flatData}
          status={status}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          scrollRef={ref}
          inView={inView}
          error={error}
        />
      </motion.div>

      {/* Compare Modal */}
      <CompareModal />
    </motion.div>
  )
}
