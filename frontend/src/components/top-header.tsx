import React from 'react';

const PersianNavbar = () => {
  return (
    <><div dir="rtl" className="print:hidden bg-slate-900 text-slate-100">
      <div className="max-w-screen-xl mx-auto flex justify-center md:justify-between">
        <div className="mmx-top-right md:ml-5 flex items-center">
          <ul className="flex space-x-2">
            <li className="hidden md:block">
              <a
                href="https://www.moneymetals.com/contact"
                className="flex items-center space-x-1 hover:bg-slate-700 py-1 px-2 transition duration-500"
              >
                <svg
                  className="text-slate-100 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>تماس با ما</p>
              </a>
            </li>
            <li className="py-1 hidden lg:inline-block">|</li>
            <li>
              <a
                href="https://www.moneymetals.com/buy"
                className="block lg:italic py-1 px-2 hover:bg-slate-700 transition duration-500"
              >
                ارسال رایگان برای سفارش‌های بالای ۱۹۹ هزار تومان{' '}
                <span className="hidden lg:inline-block">
                  به‌علاوه بهترین خدمات مشتری در صنعت...
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mmx-top-left hidden mr-5 md:flex items-center">
          <ul className="flex space-x-5">
            <li>
              <a
                href="/auth/entry"
                className="py-1 px-2 hover:bg-slate-700 transition duration-500 flex items-center space-x-1"
              >
                <svg
                  className="text-slate-100 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <p>ایجاد حساب</p>
              </a>
            </li>
            <li>
              <a
                href="/auth/entry"
                className="py-1 px-2 hover:bg-slate-700 transition duration-500 flex items-center space-x-1"
              >
                <svg
                  className="text-slate-100 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <p>ورود</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div><div
      dir="rtl"
      className="border-b border-slate-200 bg-gray-50 px-4 py-4 lg:px-0 lg:py-2 print:hidden"
    >
        <div className="mx-auto flex max-w-screen-xl flex-col justify-center gap-y-4 md:flex-row md:justify-start md:gap-x-8 md:gap-y-0 lg:justify-center lg:gap-x-40">
          <div className="group flex justify-center gap-x-2">
            <div>
              <div className="font-bold text-red-600 transition duration-300">
                <a
                  className="underline underline-offset-4"
                  href="https://www.moneymetals.com/buy/specials"
                >
                  پیشنهادهای شگفت‌انگیز برای سکه‌ها و شمش‌های نقره و طلا
                </a>
              </div>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-red-600 transition duration-300 rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </div></>
  );
};

export default PersianNavbar;
