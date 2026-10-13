"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Reveal from "@/components/Animations/Reveal";

type CategoryItem = {
  _id: string;
  name: string;
  image: string;
};

type CategoriesSliderProps = {
  categories: CategoryItem[];
};

const arrowButtonClass =
  "flex size-9 sm:size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm cursor-pointer transition-all duration-200 hover:border-primary-600 hover:bg-primary-600 hover:text-white hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-700 disabled:active:scale-100";

export default function CategoriesSlider({ categories }: CategoriesSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncEdges = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section
      aria-labelledby="categories-heading"
      className="py-10 sm:py-12 lg:py-14"
    >
      <div className="container mx-auto">
        <Reveal from="bottom">
          <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
            <div className="title min-w-0">
              <h2
                id="categories-heading"
                className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl"
              >
                Shop by <span className="text-primary-600">Category</span>
              </h2>
              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Browse our wide range of fresh categories
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link
                href="/categories"
                className="mr-1 hidden cursor-pointer text-sm font-semibold text-primary-600 transition-colors duration-200 hover:text-primary-700 hover:underline sm:inline"
              >
                View All
              </Link>

              <button
                type="button"
                aria-label="Previous categories"
                disabled={isBeginning}
                onClick={() => swiperRef.current?.slidePrev()}
                className={arrowButtonClass}
              >
                <IconChevronLeft stroke={2.5} className="size-5" />
              </button>

              <button
                type="button"
                aria-label="Next categories"
                disabled={isEnd}
                onClick={() => swiperRef.current?.slideNext()}
                className={arrowButtonClass}
              >
                <IconChevronRight stroke={2.5} className="size-5" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} from="bottom">
          <Swiper
            className="category-cards -mx-1 px-1 pt-2 pb-4"
            slidesPerView={2}
            spaceBetween={12}
            grabCursor={true}
            speed={500}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 12 },
              768: { slidesPerView: 4, spaceBetween: 16 },
              1024: { slidesPerView: 6, spaceBetween: 16 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncEdges(swiper);
            }}
            onSlideChange={syncEdges}
            onBreakpoint={syncEdges}
            onResize={syncEdges}
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id} className="h-auto">
                <Link
                  href={`/categories/${category._id}`}
                  className="group flex h-full cursor-pointer flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:p-4"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, (min-width: 480px) 33vw, 50vw"
                      draggable={false}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="w-full truncate text-sm font-semibold text-gray-800 transition-colors duration-200 group-hover:text-primary-600 sm:text-base">
                    {category.name}
                  </h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        <Reveal delay={0.2} className="mt-2 text-center sm:hidden">
          <Link
            href="/categories"
            className="inline-block cursor-pointer text-sm font-semibold text-primary-600 transition-colors duration-200 hover:text-primary-700 hover:underline"
          >
            View All Categories
          </Link>
        </Reveal>
      </div>
    </section>
  );
}