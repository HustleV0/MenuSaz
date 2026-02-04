import React from "react"
import type { Metadata, Viewport } from "next"
import { mockRestaurants } from "@/lib/mock-data"
import { ThemeProvider } from "@/components/theme-provider"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const restaurant = mockRestaurants.find(r => r.slug === slug) || mockRestaurants[0]
  return {
    title: `${restaurant.name} | منوساز`,
    description: restaurant.description,
  }
}

export async function generateViewport({ params }: { params: Promise<{ slug: string }> }): Promise<Viewport> {
  const { slug } = await params
  const restaurant = mockRestaurants.find(r => r.slug === slug) || mockRestaurants[0]
  return {
    themeColor: restaurant.settings.primaryColor,
  }
}

export default async function PreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  await params // Ensure params are available if needed, though children might use them
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
