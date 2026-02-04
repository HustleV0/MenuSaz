"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockUser } from "@/lib/mock-data"
import { User, Mail, Phone, Lock, Upload } from "lucide-react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: "۰۹۱۲۳۴۵۶۷۸۹", // Mock phone
  })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsLoading(false)
    toast.success("اطلاعات پروفایل با موفقیت به‌روزرسانی شد")
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.info("لینک تغییر رمز عبور به ایمیل شما ارسال شد")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">پروفایل کاربری</h1>
        <p className="text-muted-foreground">اطلاعات شخصی خود را مدیریت کنید</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>اطلاعات حساب</CardTitle>
            <CardDescription>نام و ایمیل خود را ویرایش کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-border">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={mockUser.avatar || ""} />
                  <AvatarFallback className="text-2xl">{mockUser.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" type="button" onClick={() => toast.info("بخش آپلود در نسخه دمو فعال نیست")}>
                    <Upload className="ml-2 h-4 w-4" />
                    تغییر آواتار
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG یا PNG. حداکثر ۱ مگابایت</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="pr-10" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      disabled
                      className="pr-10 bg-muted" 
                      dir="ltr"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">ایمیل قابل تغییر نیست</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">شماره تماس</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="pr-10" 
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>امنیت</CardTitle>
              <CardDescription>تنظیمات رمز عبور</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">رمز عبور</p>
                  <p className="text-xs text-muted-foreground">آخرین تغییر: ۲ ماه پیش</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleChangePassword}>
                تغییر رمز عبور
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">بخش خطرناک</CardTitle>
              <CardDescription>حذف حساب کاربری</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                با حذف حساب، تمامی داده‌های شما از جمله وبسایت‌ها و محصولات برای همیشه پاک خواهند شد.
              </p>
              <Button variant="destructive" className="w-full" onClick={() => toast.error("این قابلیت در نسخه دمو غیرفعال است")}>
                حذف حساب کاربری
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
