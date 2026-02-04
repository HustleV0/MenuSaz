"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  ArrowRight, 
  Save, 
  Trash2, 
  ImagePlus, 
  X,
  Plus,
  GripVertical
} from "lucide-react"
import { mockProducts, mockCategories } from "@/lib/mock-data"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const product = mockProducts.find(p => p.id === id)
  
  const [isAvailable, setIsAvailable] = useState(product?.isAvailable ?? true)
  const [variants, setVariants] = useState([
    { id: "1", name: "معمولی", price: product?.price ?? 0 },
    { id: "2", name: "بزرگ", price: (product?.price ?? 0) + 50000 },
  ])
  const [tags, setTags] = useState(product?.tags ?? [])
  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    toast.success("تغییرات با موفقیت ذخیره شد")
    setIsLoading(false)
  }

  const handleDelete = () => {
    toast.success("محصول با موفقیت حذف شد")
    router.push("/dashboard/products")
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const addVariant = () => {
    setVariants([
      ...variants,
      { id: Date.now().toString(), name: "", price: 0 }
    ])
  }

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter(v => v.id !== id))
    }
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-xl font-semibold mb-2">محصول یافت نشد</h2>
        <p className="text-muted-foreground mb-4">محصول مورد نظر وجود ندارد یا حذف شده است</p>
        <Button asChild>
          <Link href="/dashboard/products">بازگشت به لیست محصولات</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/products">
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">ویرایش محصول</h1>
            <p className="text-muted-foreground mt-1">{product.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive hover:text-destructive bg-transparent">
                <Trash2 className="h-4 w-4 ml-2" />
                حذف
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                <AlertDialogDescription>
                  این عمل قابل بازگشت نیست. محصول &quot;{product.name}&quot; برای همیشه حذف خواهد شد.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleDelete}
                >
                  حذف محصول
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button className="gap-2" onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4" />
            {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات اصلی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">نام محصول</Label>
                <Input id="name" defaultValue={product.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">توضیحات</Label>
                <Textarea 
                  id="description" 
                  defaultValue={product.description}
                  rows={4}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">دسته‌بندی</Label>
                  <Select defaultValue={product.categoryId}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">ترتیب نمایش</Label>
                  <Input id="order" type="number" defaultValue={product.order} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Variants */}
          <Card>
            <CardHeader>
              <CardTitle>قیمت و تنوع</CardTitle>
              <CardDescription>
                تنوع‌های مختلف محصول با قیمت‌های متفاوت را تعریف کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {variants.map((variant, index) => (
                <div key={variant.id} className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                  <Input 
                    placeholder="نام تنوع (مثلا: کوچک، متوسط، بزرگ)"
                    value={variant.name}
                    onChange={(e) => {
                      const newVariants = [...variants]
                      newVariants[index].name = e.target.value
                      setVariants(newVariants)
                    }}
                    className="flex-1"
                  />
                  <div className="relative">
                    <Input 
                      type="number"
                      value={variant.price}
                      onChange={(e) => {
                        const newVariants = [...variants]
                        newVariants[index].price = Number(e.target.value)
                        setVariants(newVariants)
                      }}
                      className="w-40 pl-12"
                      dir="ltr"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      تومان
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeVariant(variant.id)}
                    disabled={variants.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addVariant} className="w-full gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                افزودن تنوع جدید
              </Button>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>برچسب‌ها</CardTitle>
              <CardDescription>
                برچسب‌هایی مثل &quot;پرفروش&quot;، &quot;جدید&quot;، &quot;تخفیف&quot; اضافه کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    {tag}
                    <button 
                      onClick={() => removeTag(tag)}
                      className="p-0.5 rounded hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="برچسب جدید..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button variant="outline" onClick={addTag}>افزودن</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">پیشنهادی:</span>
                {["پرفروش", "جدید", "ویژه", "تخفیف", "محبوب"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => !tags.includes(suggestion) && setTags([...tags, suggestion])}
                    className="text-sm text-primary hover:underline"
                    disabled={tags.includes(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>وضعیت</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>موجود</Label>
                  <p className="text-sm text-muted-foreground">
                    آیا این محصول موجود است؟
                  </p>
                </div>
                <Switch 
                  checked={isAvailable} 
                  onCheckedChange={setIsAvailable}
                />
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تاریخ ایجاد</span>
                  <span>۱۴۰۴/۱۰/۱۵</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">آخرین ویرایش</span>
                  <span>۱۴۰۴/۱۱/۰۲</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle>تصویر محصول</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.image ? (
                <div className="relative aspect-square rounded-lg overflow-hidden border">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-2 left-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">آپلود تصویر</span>
                </div>
              )}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <ImagePlus className="h-4 w-4" />
                تغییر تصویر
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                فرمت‌های مجاز: JPG, PNG, WebP (حداکثر ۲ مگابایت)
              </p>
            </CardContent>
          </Card>

          {/* Nutritional Info */}
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات تغذیه‌ای</CardTitle>
              <CardDescription>اختیاری</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="calories" className="text-xs">کالری</Label>
                  <Input id="calories" placeholder="۳۵۰" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein" className="text-xs">پروتئین (گرم)</Label>
                  <Input id="protein" placeholder="۲۵" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs" className="text-xs">کربوهیدرات (گرم)</Label>
                  <Input id="carbs" placeholder="۴۰" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat" className="text-xs">چربی (گرم)</Label>
                  <Input id="fat" placeholder="۱۵" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
