"use client";

import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tableStateAtom } from "@/lib/atom";
import {
  CREW_FILTERS,
  HYPERDRIVE_FILTERS,
  SORT_OPTIONS,
} from "@/lib/constants";
import { removeUrlSyncState, useUrlSync } from "@/hooks/useUrlSync";
import { useRouter } from "next/navigation";

export function StarshipFilters() {
  const [tableState, setTableState] = useAtom(tableStateAtom);
  const router = useRouter();

  const clearFilters = () => {
    // Remove url sync state if applicable
    removeUrlSyncState(router);
    setTableState({
      search: "",
      hyperdriveFilter: "all",
      crewFilter: "all",
      sortField: "none",
      sortOrder: "asc",
      sorting: [],
      columnFilters: [],
    });
  };

  const hasActiveFilters =
    tableState.search !== "" ||
    tableState.hyperdriveFilter !== "all" ||
    tableState.crewFilter !== "all" ||
    tableState.sortField !== "none";

  return (
    <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Search & Filter</h3>
          {hasActiveFilters && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-purple-300 hover:text-white hover:bg-purple-800/50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </div>

        {/* Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            <Input
              placeholder="Search starships..."
              value={tableState.search}
              onChange={(e) =>
                setTableState((prev) => ({ ...prev, search: e.target.value }))
              }
              className="pl-10 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-400"
            />
          </div>

          {/* Hyperdrive Filter */}
          <Select
            value={tableState.hyperdriveFilter}
            onValueChange={(value) =>
              setTableState((prev) => ({ ...prev, hyperdriveFilter: value }))
            }
          >
            <SelectTrigger className="bg-slate-900/50 border-purple-500/30 text-white">
              <SelectValue placeholder="Hyperdrive Rating" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-purple-500/30">
              <SelectItem value="all">All Ratings</SelectItem>
              {HYPERDRIVE_FILTERS.map((filter) => (
                <SelectItem
                  key={filter.value}
                  value={filter.value}
                  className="text-white hover:bg-purple-800/50"
                >
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Crew Filter */}
          <Select
            value={tableState.crewFilter}
            onValueChange={(value) =>
              setTableState((prev) => ({ ...prev, crewFilter: value }))
            }
          >
            <SelectTrigger className="bg-slate-900/50 border-purple-500/30 text-white">
              <SelectValue placeholder="Crew Size" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-purple-500/30">
              <SelectItem value="all">All Sizes</SelectItem>
              {CREW_FILTERS.map((filter) => (
                <SelectItem
                  key={filter.value}
                  value={filter.value}
                  className="text-white hover:bg-purple-800/50"
                >
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          {/* Failed Implementation of sort */}
          {/* <div className="flex gap-2">
            <Select
              value={tableState.sortField}
              onValueChange={(value) => setTableState((prev) => ({ ...prev, sortField: value }))}
            >
              <SelectTrigger className="bg-slate-900/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-purple-500/30">
                <SelectItem value="none">No sorting</SelectItem>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-purple-800/50">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={tableState.sortOrder}
              onValueChange={(value: "asc" | "desc") => setTableState((prev) => ({ ...prev, sortOrder: value }))}
            >
              <SelectTrigger className="w-32 bg-slate-900/50 border-purple-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-purple-500/30">
                <SelectItem value="asc" className="text-white hover:bg-purple-800/50">
                  Ascending
                </SelectItem>
                <SelectItem value="desc" className="text-white hover:bg-purple-800/50">
                  Descending
                </SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
