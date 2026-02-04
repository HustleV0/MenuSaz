"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockRestaurant } from "@/lib/mock-data"
import { Upload, Globe, Instagram, Send, Phone, Loader2, ExternalLink } from "lucide-react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    name: mockRestaurant.name,
    description: mockRestaurant.description || "",
    address: mockRestaurant.address || "",
    phone: mockRestaurant.phone || "",
    email: mockRestaurant.email || "",
    instagram: mockRestaurant.socialLinks?.instagram || "",
    telegram: mockRestaurant.socialLinks?.telegram || "",
    whatsapp: mockRestaurant.socialLinks?.whatsapp || "",
    primaryColor: mockRestaurant.settings.primaryColor,
    showPrices: mockRestaurant.settings.showPrices,
    isPublished: mockRestaurant.settings.isPublished,
  })

  const handleSave = () => {
    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast.success("تنظیمات با موفقیت ذخیره شد")
      // In a real app, update global state or context here
    }, 1200)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">تنظیمات وبسایت</h1>
        <p className="text-muted-foreground">
          اطلاعات و تنظیمات وبسایت خود را مدیریت کنید
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6" dir="rtl">
        <TabsList className="w-full justify-start md:w-auto">
          <TabsTrigger value="general">اطلاعات کلی</TabsTrigger>
          <TabsTrigger value="social">شبکه‌های اجتماعی</TabsTrigger>
          <TabsTrigger value="appearance">ظاهر</TabsTrigger>
          <TabsTrigger value="domain">دامنه</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات کلی</CardTitle>
              <CardDescription>
                اطلاعات اصلی رستوران یا کافه خود را وارد کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-right">
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label className="text-right block">لوگو</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-lg border border-dashed border-border bg-muted">
                    {mockRestaurant.logo ? (
                      <img
                        src={mockRestaurant.logo || "/placeholder.svg"}
                        alt="Logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.info("بخش آپلود لوگو در نسخه دمو فعال نیست")}
                    >
                      آپلود لوگو
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground">
                      PNG, JPG یا SVG (حداکثر ۲ مگابایت)
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block">نام رستوران</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) =>
                    setSettings({ ...settings, name: e.target.value })
                  }
                  className="text-right"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-right block">توضیحات</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) =>
                    setSettings({ ...settings, description: e.target.value })
                  }
                  rows={3}
                  placeholder="توضیح کوتاهی درباره رستوران خود بنویسید..."
                  className="text-right"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-right block">آدرس</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  rows={2}
                  className="text-right"
                />
              </div>

              {/* Contact */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 text-right">
                  <Label htmlFor="phone" className="text-right block">تلفن</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) =>
                      setSettings({ ...settings, phone: e.target.value })
                    }
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="space-y-2 text-right">
                  <Label htmlFor="email" className="text-right block">ایمیل</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    dir="ltr"
                    className="text-left"
                  />
                </div>
              </div>

              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                ذخیره تغییرات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Links */}
        <TabsContent value="social">
          <Card>
            <CardHeader className="text-right">
              <CardTitle>شبکه‌های اجتماعی</CardTitle>
              <CardDescription>
                لینک شبکه‌های اجتماعی خود را وارد کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-right">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2 justify-end">
                  اینستاگرام
                  <Instagram className="h-4 w-4" />
                </Label>
                <div className="flex items-center gap-2" dir="ltr">
                  <span className="text-sm text-muted-foreground">
                    instagram.com/
                  </span>
                  <Input
                    id="instagram"
                    value={settings.instagram}
                    onChange={(e) =>
                      setSettings({ ...settings, instagram: e.target.value })
                    }
                    className="text-left"
                    placeholder="your_username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram" className="flex items-center gap-2 justify-end">
                  تلگرام
                  <Send className="h-4 w-4" />
                </Label>
                <div className="flex items-center gap-2" dir="ltr">
                  <span className="text-sm text-muted-foreground">
                    t.me/
                  </span>
                  <Input
                    id="telegram"
                    value={settings.telegram}
                    onChange={(e) =>
                      setSettings({ ...settings, telegram: e.target.value })
                    }
                    className="text-left"
                    placeholder="your_channel"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="flex items-center gap-2 justify-end">
                  واتساپ
                  <Phone className="h-4 w-4" />
                </Label>
                <Input
                  id="whatsapp"
                  value={settings.whatsapp}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsapp: e.target.value })
                  }
                  dir="ltr"
                  className="text-left"
                  placeholder="09121234567"
                />
              </div>

              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                ذخیره تغییرات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader className="text-right">
              <CardTitle>ظاهر وبسایت</CardTitle>
              <CardDescription>
                رنگ‌ها و تنظیمات ظاهری وبسایت خود را تغییر دهید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-right">
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-right block">رنگ اصلی</Label>
                <div className="flex items-center gap-3 justify-end">
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) =>
                      setSettings({ ...settings, primaryColor: e.target.value })
                    }
                    dir="ltr"
                    className="w-32 text-left font-mono"
                  />
                  <input
                    type="color"
                    id="primaryColor"
                    value={settings.primaryColor}
                    onChange={(e) =>
                      setSettings({ ...settings, primaryColor: e.target.value })
                    }
                    className="h-10 w-20 cursor-pointer rounded-lg border border-border p-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4 text-right">
                <div className="flex-1">
                  <p className="font-medium">نمایش قیمت‌ها</p>
                  <p className="text-sm text-muted-foreground">
                    قیمت محصولات در وبسایت نمایش داده شود
                  </p>
                </div>
                <Switch
                  checked={settings.showPrices}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showPrices: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4 text-right">
                <div className="flex-1">
                  <p className="font-medium">انتشار وبسایت</p>
                  <p className="text-sm text-muted-foreground">
                    وبسایت برای عموم قابل مشاهده باشد
                  </p>
                </div>
                <Switch
                  checked={settings.isPublished}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, isPublished: checked })
                  }
                />
              </div>

              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                ذخیره تغییرات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Domain */}
        <TabsContent value="domain">
          <Card>
            <CardHeader className="text-right">
              <CardTitle>تنظیمات دامنه</CardTitle>
              <CardDescription>
                آدرس وبسایت خود را مدیریت کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-right">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">زیردامنه رایگان</p>
                      <p className="text-sm text-muted-foreground" dir="ltr">
                        {mockRestaurant.slug}.menusaz.ir
                      </p>
                    </div>
                    <Globe className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2" asChild>
                    <a href={`/r/${mockRestaurant.slug}`} target="_blank" rel="noopener noreferrer">
                      مشاهده منو
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-border p-6 text-center">
                <Globe className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 font-medium">دامنه اختصاصی</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  برای اتصال دامنه اختصاصی، به پلن حرفه‌ای ارتقا دهید
                </p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  ارتقا پلن
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
