"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Grid3X3,
  List,
} from "lucide-react"
import { mockProducts, mockCategories, formatPrice } from "@/lib/mock-data"

type ViewMode = "grid" | "table"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [products, setProducts] = useState(mockProducts)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" || product.categoryId === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
    toast.success("محصول با موفقیت حذف شد")
  }

  const handleToggleAvailability = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
    ))
    const product = products.find(p => p.id === id)
    toast.success(`${product?.name} ${!product?.isAvailable ? 'فعال' : 'غیرفعال'} شد`)
  }

  const getCategoryName = (categoryId: string) => {
    return mockCategories.find((c) => c.id === categoryId)?.name || ""
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">محصولات</h1>
          <p className="text-muted-foreground">
            {mockProducts.length} محصول در منو
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            افزودن محصول
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجوی محصول..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه دسته‌ها</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-l-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("table")}
                className="rounded-r-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              {/* Product Image */}
              <div className="relative aspect-square bg-muted">
                {product.image && (
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                )}
                {/* Badges */}
                <div className="absolute right-2 top-2 flex flex-col gap-1">
                  {product.isPopular && (
                    <Badge className="gap-1">
                      <Star className="h-3 w-3" />
                      محبوب
                    </Badge>
                  )}
                  {!product.isAvailable && (
                    <Badge variant="destructive">ناموجود</Badge>
                  )}
                </div>
                {/* Actions */}
                <div className="absolute left-2 top-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${product.id}`}>
                          <Pencil className="ml-2 h-4 w-4" />
                          ویرایش
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleAvailability(product.id)}>
                        {product.isAvailable ? (
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
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="ml-2 h-4 w-4" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Product Info */}
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">
                  {getCategoryName(product.categoryId)}
                </p>
                <h3 className="mt-1 font-semibold">{product.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {product.discountPrice ? (
                    <>
                      <span className="font-bold">
                        {formatPrice(product.discountPrice)} تومان
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold">
                      {formatPrice(product.price)} تومان
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Products Table View */}
      {viewMode === "table" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">محصول</TableHead>
                  <TableHead className="min-w-[120px]">دسته‌بندی</TableHead>
                  <TableHead className="min-w-[120px]">قیمت</TableHead>
                  <TableHead className="min-w-[100px]">وضعیت</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                          {product.image && (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{product.name}</p>
                            {product.isPopular && (
                              <Star className="h-3 w-3 fill-primary text-primary shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {getCategoryName(product.categoryId)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="whitespace-nowrap">
                        {product.discountPrice ? (
                          <>
                            <p className="font-medium">
                              {formatPrice(product.discountPrice)} تومان
                            </p>
                            <p className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.price)}
                            </p>
                          </>
                        ) : (
                          <p className="font-medium">
                            {formatPrice(product.price)} تومان
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.isAvailable ? "default" : "destructive"}
                        className="whitespace-nowrap"
                      >
                        {product.isAvailable ? "موجود" : "ناموجود"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/products/${product.id}`}>
                              <Pencil className="ml-2 h-4 w-4" />
                              ویرایش
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleAvailability(product.id)}>
                            {product.isAvailable ? (
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
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="ml-2 h-4 w-4" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">محصولی یافت نشد</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              محصولی با این مشخصات وجود ندارد
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
