import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import type { StarshipType } from "@/lib/types"
import type { SortingState, ColumnFiltersState } from "@tanstack/react-table"

export interface TableState {
  search: string
  hyperdriveFilter: string
  crewFilter: string
  sortField: string
  sortOrder: "asc" | "desc"
  sorting: SortingState
  columnFilters: ColumnFiltersState
}

export const selectedStarshipsAtom = atomWithStorage<StarshipType[]>("selectedStarships", [])

export const tableStateAtom = atom<TableState>({
  search: "",
  hyperdriveFilter: "all",
  crewFilter: "all",
  sortField: "none",
  sortOrder: "asc",
  sorting: [],
  columnFilters: [],
})

export const compareModalOpenAtom = atom<boolean>(false)
