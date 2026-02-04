"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockThemes } from "@/lib/mock-data"
import { Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Templates() {
  const [activeTheme, setActiveTheme] = useState(mockThemes[0].id)

  return (
    <section id="templates" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            قالب‌های آماده و زیبا
          </h2>
          <p className="text-lg text-muted-foreground">
            قالب مورد نظر خود را انتخاب کنید و به راحتی شخصی‌سازی کنید.
          </p>
        </motion.div>

        {/* Theme Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          {mockThemes.map((theme) => (
            <Button
              key={theme.id}
              variant={activeTheme === theme.id ? "default" : "outline"}
              onClick={() => setActiveTheme(theme.id)}
              className="gap-2"
            >
              {theme.name}
              {theme.isNew && (
                <Badge variant="secondary" className="text-xs">
                  جدید
                </Badge>
              )}
              {theme.isPremium && (
                <Badge variant="secondary" className="text-xs">
                  ویژه
                </Badge>
              )}
            </Button>
          ))}
        </motion.div>

        {/* Theme Preview */}
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            {mockThemes.map((theme) => (
              activeTheme === theme.id && (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                    {/* Browser Chrome */}
                    <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-destructive/60" />
                        <div className="h-3 w-3 rounded-full bg-warning/60" />
                        <div className="h-3 w-3 rounded-full bg-success/60" />
                      </div>
                      <div className="flex-1 px-4">
                        <div className="mx-auto max-w-md rounded-md bg-background px-4 py-1.5 text-center text-xs text-muted-foreground">
                          {theme.nameEn.toLowerCase().replace(/\s/g, '-')}.menusaz.ir
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        پیش‌نمایش
                      </Button>
                    </div>

                    {/* Theme Preview Content */}
                    <div 
                      className="aspect-[16/9] p-8"
                      style={{ backgroundColor: theme.colors.background }}
                    >
                      <div className="flex h-full flex-col rounded-lg border shadow-sm" style={{ borderColor: theme.colors.secondary }}>
                        {/* Mock Header */}
                        <div 
                          className="flex items-center justify-between px-6 py-4"
                          style={{ backgroundColor: theme.colors.primary }}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-10 w-10 rounded-full"
                              style={{ backgroundColor: theme.colors.accent }}
                            />
                            <div 
                              className="h-4 w-24 rounded"
                              style={{ backgroundColor: theme.colors.secondary }}
                            />
                          </div>
                          <div className="flex gap-4">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="h-3 w-16 rounded"
                                style={{ backgroundColor: theme.colors.secondary }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Mock Hero */}
                        <div 
                          className="flex flex-1 items-center justify-center"
                          style={{ backgroundColor: theme.colors.secondary }}
                        >
                          <div className="text-center">
                            <div 
                              className="mx-auto mb-3 h-8 w-64 rounded"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                            <div 
                              className="mx-auto h-4 w-48 rounded"
                              style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
                            />
                          </div>
                        </div>

                        {/* Mock Products Grid */}
                        <div 
                          className="grid grid-cols-4 gap-4 p-6"
                          style={{ backgroundColor: theme.colors.background }}
                        >
                          {[1, 2, 3, 4].map((i) => (
                            <div 
                              key={i} 
                              className="rounded-lg p-3"
                              style={{ backgroundColor: theme.colors.secondary }}
                            >
                              <div 
                                className="mb-2 aspect-square rounded"
                                style={{ backgroundColor: theme.colors.accent, opacity: 0.3 }}
                              />
                              <div 
                                className="mb-1 h-3 rounded"
                                style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
                              />
                              <div 
                                className="h-3 w-1/2 rounded"
                                style={{ backgroundColor: theme.colors.accent }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold">{theme.name}</h3>
                    <p className="text-muted-foreground">{theme.description}</p>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
