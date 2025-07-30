"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAtom } from "jotai"
import { tableStateAtom, compareModalOpenAtom } from "@/lib/atom"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function useUrlSync() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tableState, setTableState] = useAtom(tableStateAtom)
  const [compareModalOpen, setCompareModalOpen] = useAtom(compareModalOpenAtom)

  // sync url params to state on mount
  useEffect(() => {
    const search = searchParams.get("search") || ""
    const hyperdriveFilter = searchParams.get("hyperdrive") || "all"
    const crewFilter = searchParams.get("crew") || "all"
    const sortField = searchParams.get("sort") || "none"
    const sortOrder = (searchParams.get("order") as "asc" | "desc") || "asc"
    const modalOpen = searchParams.get("compare") === "true"

    setTableState((prev) => ({
      ...prev,
      search,
      hyperdriveFilter,
      crewFilter,
      sortField,
      sortOrder,
    }))

    setCompareModalOpen(modalOpen)
  }, [searchParams, setTableState, setCompareModalOpen])

  useEffect(() => {
    const params = new URLSearchParams()

    if (tableState.search) params.set("search", tableState.search)
    if (tableState.hyperdriveFilter !== "all") params.set("hyperdrive", tableState.hyperdriveFilter)
    if (tableState.crewFilter !== "all") params.set("crew", tableState.crewFilter)
    if (tableState.sortField !== "none") params.set("sort", tableState.sortField)
    if (tableState.sortOrder !== "asc") params.set("order", tableState.sortOrder)
    if (compareModalOpen) params.set("compare", "true")
    else params.delete("compare")

    const newUrl = params.toString() ? `?${params.toString()}` : "/"
    router.replace(newUrl, { scroll: false })
  }, [tableState, compareModalOpen, router])
}


export function removeUrlSyncState(
    router: AppRouterInstance
) {
  const params = new URLSearchParams(window.location.search)

  // Remove all relevant params
  params.delete("search")
  params.delete("hyperdrive")
  params.delete("crew")
  params.delete("sort")
  params.delete("order")
  params.delete("compare")

  const newUrl = params.toString() ? `?${params.toString()}` : "/"
  router.push(newUrl, { scroll: false })
}