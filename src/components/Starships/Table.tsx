"use client"

import type React from "react"

import { useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAtom } from "jotai"
import { toast } from "sonner"
import type { StarshipType } from "@/lib/types"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table"
import { TableSkeleton } from "@/components/Starships/TableSkeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, ArrowUp, ArrowDown, Zap, Users, Rocket } from "lucide-react"
import { selectedStarshipsAtom, tableStateAtom } from "@/lib/atom"

const columnHelper = createColumnHelper<StarshipType>()

interface StarshipDataTableProps {
  flatData: StarshipType[]
  status: "pending" | "error" | "success"
  isFetchingNextPage: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
  scrollRef: React.Ref<HTMLDivElement>
  inView: boolean
  error: unknown
}

export function StarshipDataTable({
  flatData,
  status,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  scrollRef,
  inView,
  error,
}: StarshipDataTableProps) {
  const [selectedStarships, setSelectedStarships] = useAtom(selectedStarshipsAtom)
  const [tableState, setTableState] = useAtom(tableStateAtom)

  const handleStarshipSelect = (starship: StarshipType, checked: boolean) => {
    if (checked) {
      if (selectedStarships.length >= 3) {
        toast.error("Maximum 3 starships can be selected for comparison")
        return
      }
      setSelectedStarships([...selectedStarships, starship])
      toast.success(`${starship.name} added to comparison`)
    } else {
      setSelectedStarships(selectedStarships.filter((s) => s.name !== starship.name))
      toast.info(`${starship.name} removed from comparison`)
    }
  }

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center space-x-2">
          </div>
        ),
        cell: ({ row }) => {
          const starship = row.original
          const isSelected = selectedStarships.some((s) => s.name === starship.name)
          return (
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => handleStarshipSelect(starship, !!checked)}
                aria-label="Select row"
                className="border-purple-300 data-[state=checked]:bg-purple-600"
              />
            </div>
          )
        },
        enableSorting: false,
        enableHiding: false,
      }),
      columnHelper.accessor("name", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold text-purple-100 hover:text-white hover:bg-purple-800/50"
          >
            <Rocket className="mr-2 h-4 w-4" />
            Starship Name
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ getValue }) => <div className="font-medium text-white text-lg">{getValue()}</div>,
      }),
      columnHelper.accessor("model", {
        header: "Model",
        cell: ({ getValue }) => <div className="text-purple-200">{getValue() || "Unknown Model"}</div>,
      }),
      columnHelper.accessor("manufacturer", {
        header: "Manufacturer",
        maxSize: 100,
        cell: ({ getValue }) => <div className="text-purple-200">{getValue() || "Unknown Manufacturer"}</div>,
      }),
      columnHelper.accessor("hyperdrive_rating", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold text-purple-100 hover:text-white hover:bg-purple-800/50"
          >
            <Zap className="mr-2 h-4 w-4" />
            Hyperdrive
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ getValue }) => {
          const rating = getValue()
          if (!rating || rating === "unknown") {
            return (
              <Badge variant="secondary" className="bg-gray-600 text-gray-200">
                Unknown
              </Badge>
            )
          }
          const numRating = Number.parseFloat(rating)
          return (
            <Badge
              variant={numRating < 1.0 ? "default" : numRating <= 2.0 ? "secondary" : "destructive"}
              className={
                numRating < 1.0
                  ? "bg-green-600 text-green-100 hover:bg-green-700"
                  : numRating <= 2.0
                    ? "bg-yellow-600 text-yellow-100 hover:bg-yellow-700"
                    : "bg-red-600 text-red-100 hover:bg-red-700"
              }
            >
              {rating}
            </Badge>
          )
        },
      }),
      columnHelper.accessor("crew", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="h-auto p-0 font-semibold text-purple-100 hover:text-white hover:bg-purple-800/50"
          >
            <Users className="mr-2 h-4 w-4" />
            Crew
          </Button>
        ),
        cell: ({ getValue }) => {
          const crew = getValue()
          if (!crew || crew === "unknown") {
            return (
              <Badge variant="outline" className="border-purple-400 text-purple-200">
                Unknown
              </Badge>
            )
          }
          return <Badge className="bg-purple-600 text-purple-100 hover:bg-purple-700">{crew}</Badge>
        },
      }),
    ],
    [selectedStarships, setSelectedStarships],
  )

  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: tableState.sorting,
      columnFilters: tableState.columnFilters,
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(tableState.sorting) : updater
      setTableState((prev) => ({ ...prev, sorting: newSorting }))
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === "function" ? updater(tableState.columnFilters) : updater
      setTableState((prev) => ({ ...prev, columnFilters: newFilters }))
    },
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load starships:`)
    }
  }, [error])

  if (status === "pending") {
    return <TableSkeleton />
  }

  return (
    <div className="space-y-4 py-2">
      {/* Results Summary */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-purple-200">
        Showing {flatData.length} starships
        {hasNextPage && " (scroll down for more)"}
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-purple-500/30 hover:bg-purple-900/20">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="whitespace-nowrap bg-slate-900/50">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row, index) => (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-purple-500/20 hover:bg-purple-900/30 transition-colors duration-200"
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="whitespace-nowrap">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center text-purple-200">
                          No starships found in the database.
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Infinite Scroll Trigger */}
      <div ref={scrollRef} className="flex justify-center py-4">
        <AnimatePresence>
          {isFetchingNextPage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-purple-200"
            >
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
              <span>Loading more starships...</span>
            </motion.div>
          ) : hasNextPage ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                className="border-purple-500 text-purple-200 hover:bg-purple-800/50"
              >
                Load More
              </Button>
            </motion.div>
          ) : flatData.length > 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-purple-300">
              All starships loaded
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
