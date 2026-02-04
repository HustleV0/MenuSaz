"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockThemes, mockRestaurant } from "@/lib/mock-data"
import { Check, Eye, Lock, Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

export default function ThemesPage() {
  const [selectedTheme, setSelectedTheme] = useState(mockRestaurant.settings.themeId)
  const [isApplying, setIsApplying] = useState(false)
  const [previewTheme, setPreviewTheme] = useState<typeof mockThemes[0] | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleApply = () => {
    setIsApplying(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false)
      const theme = mockThemes.find(t => t.id === selectedTheme)
      toast.success(`قالب ${theme?.name} با موفقیت اعمال شد.`)
      
      // In a real app, you would refresh the session or state here
      mockRestaurant.settings.themeId = selectedTheme
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">انتخاب قالب</h1>
          <p className="text-muted-foreground">
            قالب مورد نظر خود را انتخاب کنید
          </p>
        </div>
        <Button 
          onClick={handleApply} 
          disabled={selectedTheme === mockRestaurant.settings.themeId || isApplying}
        >
          {isApplying && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          اعمال قالب
        </Button>
      </div>

      {/* Themes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockThemes.map((theme) => {
          const isSelected = selectedTheme === theme.id
          const isCurrent = mockRestaurant.settings.themeId === theme.id

          return (
            <Card
              key={theme.id}
              className={`cursor-pointer overflow-hidden transition-all ${
                isSelected
                  ? "ring-2 ring-primary"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedTheme(theme.id)}
            >
              {/* Theme Preview */}
              <div className="relative aspect-[4/3]" style={{ backgroundColor: theme.colors.background }}>
                {/* Mock Preview Content */}
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    <div
                      className="h-4 w-16 rounded"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-2 w-8 rounded"
                          style={{ backgroundColor: theme.colors.secondary, opacity: 0.7 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div
                      className="mx-auto mb-3 h-4 w-32 rounded"
                      style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded"
                          style={{ backgroundColor: theme.colors.secondary }}
                        >
                          <div
                            className="m-2 h-1/2 rounded"
                            style={{ backgroundColor: theme.colors.accent, opacity: 0.5 }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute right-2 top-2 flex flex-col gap-1">
                  {theme.isNew && (
                    <Badge variant="default" className="text-xs">
                      جدید
                    </Badge>
                  )}
                  {theme.isPremium && (
                    <Badge variant="secondary" className="text-xs">
                      <Lock className="ml-1 h-3 w-3" />
                      ویژه
                    </Badge>
                  )}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>

              {/* Theme Info */}
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{theme.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {theme.description}
                    </p>
                  </div>
                  {isCurrent && (
                    <Badge variant="outline">فعال</Badge>
                  )}
                </div>

                {/* Color Palette */}
                <div className="mt-4 flex gap-2">
                  {Object.entries(theme.colors).slice(0, 4).map(([name, color]) => (
                    <div
                      key={name}
                      className="h-6 w-6 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                      title={name}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Dialog open={isPreviewOpen && previewTheme?.id === theme.id} onOpenChange={(open) => {
                    setIsPreviewOpen(open)
                    if (open) setPreviewTheme(theme)
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-1 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewTheme(theme)
                          setIsPreviewOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        پیش‌نمایش
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] md:max-w-2xl p-0 overflow-hidden sm:rounded-2xl flex flex-col max-h-[85vh]">
                      <DialogHeader className="p-6 pb-2 border-b">
                        <DialogTitle className="text-xl">{previewTheme?.name}</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/20">
                        <div 
                          className="w-full relative rounded-lg border overflow-hidden shadow-sm bg-background"
                        >
                          {previewTheme?.thumbnail ? (
                            <img 
                              src={previewTheme.thumbnail} 
                              alt={previewTheme.name}
                              className="w-full h-auto object-cover max-h-[50vh]"
                            />
                          ) : (
                            <div className="aspect-video flex items-center justify-center">
                              <p className="text-muted-foreground">تصویری برای پیش‌نمایش یافت نشد</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-4 border-t flex justify-end gap-3 bg-background">
                        <DialogClose asChild>
                          <Button variant="outline" size="sm">بستن</Button>
                        </DialogClose>
                        <Button size="sm" onClick={() => {
                          setSelectedTheme(theme.id)
                          setIsPreviewOpen(false)
                        }}>انتخاب این قالب</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button
                    size="sm"
                    className="flex-1"
                    variant={isSelected ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedTheme(theme.id)
                    }}
                  >
                    {isSelected ? "انتخاب شده" : "انتخاب"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
