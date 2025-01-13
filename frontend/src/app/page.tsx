import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
      <img src="/IMG_20250113_191141.jpg" style={{width : "32vw"}} className='mb-6 shadow-md rounded-sm' /> 
      <h1 className="text-4xl font-bold mb-6">به زیب و کو خوش آمدید</h1>
      <p className="text-xl mb-8 text-center text-muted-foreground">سامانه فروش شمش و طلای آب شده</p>
      <Link href="/entry">
        <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg">
          ورود / ثبت نام
        </Button>
      </Link>
    </div>
  )
}

