"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { mockRestaurants } from "@/lib/mock-data"
import { MinimalCafe } from "@/components/templates/MinimalCafe"
import { TraditionalIranian } from "@/components/templates/TraditionalIranian"
import { ModernRestaurant } from "@/components/templates/ModernRestaurant"
import { MinimalCafeSkeleton } from "@/components/templates/MinimalCafeSkeleton"
import { ModernRestaurantSkeleton } from "@/components/templates/ModernRestaurantSkeleton"
import { TraditionalIranianSkeleton } from "@/components/templates/TraditionalIranianSkeleton"
import Loading from "@/app/loading"

export default function PreviewPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [loadingStage, setLoadingStage] = useState<"initial" | "skeleton" | "ready">("initial")
  
  useEffect(() => {
    // Stage 1: Initial Loading Screen
    const timer1 = setTimeout(() => {
      setLoadingStage("skeleton")
    }, 1500)

    // Stage 2: Skeleton Loader
    const timer2 = setTimeout(() => {
      setLoadingStage("ready")
    }, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const restaurant = mockRestaurants.find(r => r.slug === slug) || mockRestaurants[0]
  const themeId = restaurant.settings.themeId

  if (loadingStage === "initial") {
    return <Loading />
  }

  if (loadingStage === "skeleton") {
    switch (themeId) {
      case "minimal-cafe":
        return <MinimalCafeSkeleton />
      case "traditional-persian":
        return <TraditionalIranianSkeleton />
      case "modern-restaurant":
        return <ModernRestaurantSkeleton />
      default:
        return <MinimalCafeSkeleton />
    }
  }

  switch (themeId) {
    case "minimal-cafe":
      return <MinimalCafe restaurant={restaurant} />
    case "traditional-persian":
      return <TraditionalIranian restaurant={restaurant} />
    case "modern-restaurant":
      return <ModernRestaurant restaurant={restaurant} />
    default:
      return <MinimalCafe restaurant={restaurant} />
  }
}
