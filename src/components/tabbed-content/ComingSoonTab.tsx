"use client";

export default function ComingSoonTab() {
  return (
    <div className="flex flex-col items-center justify-center bg-purple-50 rounded-xl p-8 text-center min-h-[400px]">
      <div className="mb-6 text-purple-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        به زودی...
      </h3>
      <p className="text-gray-600 max-w-md mx-auto text-lg">
        این بخش در حال آماده‌سازی است و به زودی با ویژگی‌های جدید رونمایی خواهد شد
      </p>
    </div>
  );
} 