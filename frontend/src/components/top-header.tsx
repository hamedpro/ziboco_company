export default function TopHeader() {
  return (
    <div className="w-full bg-[#1a1a1a] text-white px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4 space-x-reverse">
          <a href="#" className="hover:text-gray-300 flex items-center">
            <span className="ml-2">📞</span> تماس با ما
          </a>
          <span className="text-gray-400">|</span>
          <span className="italic">ارسال رایگان برای سفارشات بالای ۱۹۹ تومان به علاوه بهترین خدمات مشتری...</span>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <a href="#" className="hover:text-gray-300">
            ایجاد حساب
          </a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-gray-300">
            ورود
          </a>
        </div>
      </div>
    </div>
  )
}

