"use client"

import { useAtom } from "jotai"
import { motion, AnimatePresence } from "framer-motion"
import { X, Zap, Users, ContrastIcon as Compare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { selectedStarshipsAtom, compareModalOpenAtom } from "@/lib/atom"
import { toast } from "sonner"

export function SelectedShips() {
  const [selectedStarships, setSelectedStarships] = useAtom(selectedStarshipsAtom)
  const [, setCompareModalOpen] = useAtom(compareModalOpenAtom)

  const removeStarship = (name: string) => {
    setSelectedStarships((prev) => prev.filter((s) => s.name !== name))
    toast.info("Starship removed from comparison")
  }

  const openCompareModal = () => {
    if (selectedStarships.length < 2) {
      toast.error("Select at least 2 starships to compare")
      return
    }
    setCompareModalOpen(true)
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Compare className="h-5 w-5 text-purple-400" />
            Selected for Comparison ({selectedStarships.length}/3)
          </CardTitle>
          <Button
            onClick={openCompareModal}
            disabled={selectedStarships.length < 3}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Compare Ships
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {selectedStarships.map((starship, index) => (
              <motion.div
                key={starship.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="bg-slate-900/50 border-purple-400/30 hover:border-purple-400/50 transition-colors">
                  <CardContent className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStarship(starship.name)}
                      className="absolute top-2 right-2 h-6 w-6 p-0 text-purple-300 hover:text-white hover:bg-red-600/50"
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white text-sm truncate pr-8">{starship.name}</h4>
                      <p className="text-xs text-purple-200 truncate">{starship.model || "Unknown Model"}</p>

                      <div className="flex flex-wrap gap-1">
                        {starship.hyperdrive_rating && starship.hyperdrive_rating !== "unknown" && (
                          <Badge variant="secondary" className="text-xs bg-purple-600/50 text-purple-100">
                            <Zap className="h-3 w-3 mr-1" />
                            {starship.hyperdrive_rating}
                          </Badge>
                        )}
                        {starship.crew && starship.crew !== "unknown" && (
                          <Badge variant="secondary" className="text-xs bg-blue-600/50 text-blue-100">
                            <Users className="h-3 w-3 mr-1" />
                            {starship.crew}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
