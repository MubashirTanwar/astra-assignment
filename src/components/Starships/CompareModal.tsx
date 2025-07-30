"use client"

import { useAtom } from "jotai"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Users, Rocket, Factory, Gauge } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { selectedStarshipsAtom, compareModalOpenAtom } from "@/lib/atom"

export function CompareModal() {
  const [selectedStarships] = useAtom(selectedStarshipsAtom)
  const [compareModalOpen, setCompareModalOpen] = useAtom(compareModalOpenAtom)

  const comparisonFields = [
    { key: "name", label: "Name", icon: Rocket },
    { key: "model", label: "Model", icon: Gauge },
    { key: "manufacturer", label: "Manufacturer", icon: Factory },
    { key: "hyperdrive_rating", label: "Hyperdrive Rating", icon: Zap },
    { key: "crew", label: "Crew", icon: Users },
  ]

  return (
    <Dialog open={compareModalOpen} onOpenChange={setCompareModalOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-slate-900 border-purple-500/30 !w-[80vw] ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white flex items-center gap-2">
            <Rocket className="h-6 w-6 text-purple-400" />
            Starship Comparison
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <AnimatePresence>
            {selectedStarships.map((starship, index) => (
              <motion.div
                key={starship.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-purple-400/30 h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-purple-400" />
                      {starship.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {comparisonFields.map(({ key, label, icon: Icon }) => {
                      const value = starship[key as keyof typeof starship]
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-purple-200">
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{label}:</span>
                          </div>
                          <div className="text-right">
                            {value && value !== "unknown" ? (
                              key === "hyperdrive_rating" ? (
                                <Badge
                                  variant={
                                    Number.parseFloat(value as string) < 1.0
                                      ? "default"
                                      : Number.parseFloat(value as string) <= 2.0
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  {value}
                                </Badge>
                              ) : (
                                <span className="text-white text-sm">{value}</span>
                              )
                            ) : (
                              <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                                Unknown
                              </Badge>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={() => setCompareModalOpen(false)}
            variant="outline"
            className="border-purple-500 text-purple-200 hover:bg-purple-800/50"
          >
            Close Comparison
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
