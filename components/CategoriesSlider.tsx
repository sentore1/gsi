'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants/categories'

export default function CategoriesSlider() {
  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .slider-track {
          display: flex;
          width: max-content;
          animation: slide 30s linear infinite;
        }
        .slider-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="slider-track gap-6">
        {[...CATEGORIES, ...CATEGORIES].map((category, i) => {
          const IconComponent = category.icon
          return (
            <Link
              key={i}
              href={`/businesses?category=${category.value}`}
              className="transition-all duration-200 group flex-shrink-0 mx-3"
            >
              <div className="flex flex-col items-center space-y-1.5 w-24">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center transition-all shadow-md group-hover:bg-black">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <span className="text-center font-semibold text-gray-900 group-hover:text-black transition-colors text-sm">
                  {category.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
