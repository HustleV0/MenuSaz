"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
} from "lucide-react"
import { mockCategories, mockProducts } from "@/lib/mock-data"

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<typeof mockCategories[0] | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const getProductCount = (categoryId: string) => {
    return mockProducts.filter((p) => p.categoryId === categoryId).length
  }

  const handleOpenDialog = (category?: typeof mockCategories[0]) => {
    if (category) {
      setEditingCategory(category)
      setFormData({
        name: category.name,
        description: category.description || "",
      })
    } else {
      setEditingCategory(null)
      setFormData({ name: "", description: "" })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingCategory) {
      // Update existing
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: formData.name, description: formData.description }
            : c
        )
      )
      toast.success("دسته‌بندی با موفقیت ویرایش شد")
    } else {
      // Add new
      const newCategory = {
        id: String(categories.length + 1),
        restaurantId: "1",
        name: formData.name,
        description: formData.description,
        order: categories.length + 1,
        isActive: true,
      }
      setCategories([...categories, newCategory])
      toast.success("دسته‌بندی جدید با موفقیت اضافه شد")
    }
    setIsDialogOpen(false)
    setFormData({ name: "", description: "" })
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id))
    toast.success("دسته‌بندی حذف شد")
  }

  const toggleActive = (id: string) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, isActive: !c.isActive } : c
      )
    )
    const category = categories.find(c => c.id === id)
    toast.success(`${category?.name} ${!category?.isActive ? 'فعال' : 'غیرفعال'} شد`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">دسته‌بندی‌ها</h1>
          <p className="text-muted-foreground">
            {categories.length} دسته‌بندی
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4" />
              افزودن دسته‌بندی
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "اطلاعات دسته‌بندی را ویرایش کنید"
                  : "دسته‌بندی جدید برای محصولات ایجاد کنید"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">نام دسته‌بندی</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="مثال: نوشیدنی گرم"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">توضیحات</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="توضیح کوتاه..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                انصراف
              </Button>
              <Button onClick={handleSave}>
                {editingCategory ? "ذخیره تغییرات" : "افزودن"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">لیست دسته‌بندی‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center gap-4 rounded-lg border border-border p-4 transition-colors ${
                  !category.isActive ? "opacity-50" : ""
                }`}
              >
                {/* Drag Handle */}
                <button className="cursor-grab text-muted-foreground hover:text-foreground">
                  <GripVertical className="h-5 w-5" />
                </button>

                {/* Image */}
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {category.image && (
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{category.name}</h3>
                    {!category.isActive && (
                      <Badge variant="secondary">غیرفعال</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.description || "بدون توضیحات"}
                  </p>
                </div>

                {/* Product Count */}
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    {getProductCount(category.id)}
                  </p>
                  <p className="text-xs text-muted-foreground">محصول</p>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenDialog(category)}>
                      <Pencil className="ml-2 h-4 w-4" />
                      ویرایش
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleActive(category.id)}>
                      {category.isActive ? (
                        <>
                          <EyeOff className="ml-2 h-4 w-4" />
                          غیرفعال کردن
                        </>
                      ) : (
                        <>
                          <Eye className="ml-2 h-4 w-4" />
                          فعال کردن
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="ml-2 h-4 w-4" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                هنوز دسته‌بندی ایجاد نکرده‌اید
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => handleOpenDialog()}
              >
                افزودن اولین دسته‌بندی
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
