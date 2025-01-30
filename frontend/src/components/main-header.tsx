import Image from "next/image"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MainHeader() {
  return (
    <div className="w-full bg-white py-4 px-4 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-64">
          <Image
            src={`/logo.png`}
            alt="Money Metals Exchange"
            width={240}
            height={80}
            className="w-auto h-auto"
          />
        </div>

        <div className="flex-1 max-w-xl px-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="جستجوی محصولات و مطالب..."
              className="w-full pr-4 pl-12 py-2 border rounded text-right"
            />
            <Button
              variant="default"
              size="icon"
              className="absolute right-0 top-0 bottom-0 bg-blue-600 hover:bg-blue-700"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="text-right">
            <div className="text-sm text-gray-600">(شنبه-پنجشنبه) • آنلاین ۲۴/۷</div>
            <div className="text-2xl font-bold text-[#444444]">۰۲۱.۲۳۴۵۶۷۸۹</div>
          </div>

          <Button variant="destructive" className="bg-orange-500 hover:bg-orange-600">
            <ShoppingCart className="ml-2 h-4 w-4" />
            سبد خرید (۰)
          </Button>
        </div>
      </div>
    </div>
  )
}

