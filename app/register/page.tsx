"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"

const steps = [
  { id: 1, title: "اطلاعات شخصی" },
  { id: 2, title: "اطلاعات رستوران" },
  { id: 3, title: "رمز عبور" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    restaurantName: "",
    password: "",
    confirmPassword: "",
  })

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 3) {
      handleNext()
      return
    }

    setIsLoading(true)
    
    // Mock registration - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-sm">
          {/* Back Link */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به خانه
          </Link>

          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">م</span>
            </div>
            <span className="text-2xl font-bold">منوساز</span>
          </Link>

          {/* Header */}
          <h1 className="text-2xl font-bold">ایجاد حساب کاربری</h1>
          <p className="mt-2 text-muted-foreground">
            حساب کاربری دارید؟{" "}
            <Link href="/login" className="text-primary hover:underline">
              وارد شوید
            </Link>
          </p>

          {/* Steps */}
          <div className="mt-8 flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 w-8 transition-colors ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {steps[currentStep - 1].title}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="علی محمدی"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">شماره موبایل</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    dir="ltr"
                    className="text-left"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Restaurant Info */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">نام رستوران یا کافه</Label>
                  <Input
                    id="restaurantName"
                    type="text"
                    placeholder="کافه لذت"
                    value={formData.restaurantName}
                    onChange={(e) =>
                      setFormData({ ...formData, restaurantName: e.target.value })
                    }
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  این نام در آدرس وبسایت شما نمایش داده می‌شود:
                  <br />
                  <span className="font-mono text-foreground" dir="ltr">
                    {formData.restaurantName
                      ? formData.restaurantName
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
                      : "your-restaurant"}
                    .menusaz.ir
                  </span>
                </p>
              </div>
            )}

            {/* Step 3: Password */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="حداقل ۸ کاراکتر"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      minLength={8}
                      dir="ltr"
                      className="pl-10 text-left"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="تکرار رمز عبور"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required
                    dir="ltr"
                    className="text-left"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 bg-transparent"
                >
                  قبلی
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading
                  ? "در حال ثبت‌نام..."
                  : currentStep === 3
                    ? "ثبت‌نام"
                    : "بعدی"}
              </Button>
            </div>

            {currentStep === 3 && (
              <p className="text-center text-xs text-muted-foreground">
                با ثبت‌نام، شما{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  شرایط استفاده
                </Link>{" "}
                و{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  سیاست حریم خصوصی
                </Link>{" "}
                را می‌پذیرید.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden flex-1 bg-primary lg:flex lg:items-center lg:justify-center">
        <div className="max-w-md p-12 text-primary-foreground">
          <h2 className="text-3xl font-bold">
            وبسایت رستوران خود را در چند دقیقه بسازید
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            با منوساز، به سادگی وبسایت حرفه‌ای برای رستوران یا کافه خود بسازید و
            مشتریان بیشتری جذب کنید.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                <span className="text-sm font-bold">۱</span>
              </div>
              <span>ثبت‌نام و ایجاد حساب</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                <span className="text-sm font-bold">۲</span>
              </div>
              <span>انتخاب قالب و شخصی‌سازی</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                <span className="text-sm font-bold">۳</span>
              </div>
              <span>افزودن محصولات و منو</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                <span className="text-sm font-bold">۴</span>
              </div>
              <span>انتشار و شروع فروش!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
