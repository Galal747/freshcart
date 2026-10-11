"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import HomeSliderImg from "../../../assets/images/home-slider-1.png";

type Cta = { label: string; href: string };

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primaryCta: { label: "Shop Now", href: "/featured" },
    secondaryCta: { label: "View Deals", href: "/offers" },
  },
  {
    id: 2,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primaryCta: { label: "Shop Now", href: "/featured" },
    secondaryCta: { label: "View Deals", href: "/offers" },
  },
  {
    id: 3,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primaryCta: { label: "Shop Now", href: "/featured" },
    secondaryCta: { label: "View Deals", href: "/offers" },
  },
];

const GRADIENT_OVERLAY =
  "linear-gradient(to bottom right, rgb(39 241 115 / 80%), rgb(26 182 83 / 80%))";

const arrowButtonClass =
  "absolute top-1/2 z-10 hidden size-10 lg:size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-600 shadow-lg backdrop-blur-sm cursor-pointer transition-all duration-200 hover:bg-white hover:scale-110 hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex";

const primaryBtnClass =
  "btn inline-flex items-center justify-center bg-white text-primary-600 border-white shadow-md transition-all duration-200 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const secondaryBtnClass =
  "btn inline-flex items-center justify-center bg-transparent border-2 border-white/70 text-white transition-all duration-200 hover:bg-white hover:text-primary-600 hover:border-white hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function HomeSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-label="Featured promotions" className="relative">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        speed={700}
        grabCursor={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex min-h-72 items-center overflow-hidden text-white sm:min-h-80 lg:min-h-96">
              <Image
                src={HomeSliderImg}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ backgroundImage: GRADIENT_OVERLAY }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/10"
              />

              <div className="container relative z-10 mx-auto w-full pt-10 pb-14 sm:pt-12 sm:pb-16">
                <div className="md:px-14 min-[1400px]:px-0">
                  <h2 className="max-w-md text-2xl font-bold leading-tight tracking-tight drop-shadow-sm sm:text-3xl lg:max-w-lg lg:text-4xl">
                    {slide.title}
                  </h2>

                  <p className="mt-3 text-base text-white/95 drop-shadow-sm sm:text-lg">
                    {slide.subtitle}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={slide.primaryCta.href}
                      className={primaryBtnClass}
                    >
                      {slide.primaryCta.label}
                    </Link>
                    <Link
                      href={slide.secondaryCta.href}
                      className={secondaryBtnClass}
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className={`left-3 lg:left-4 min-[1400px]:left-6 ${arrowButtonClass}`}
      >
        <IconChevronLeft stroke={2.5} className="size-5 lg:size-6" />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className={`right-3 lg:right-4 min-[1400px]:right-6 ${arrowButtonClass}`}
      >
        <IconChevronRight stroke={2.5} className="size-5 lg:size-6" />
      </button>

      <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 sm:bottom-5">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                isActive
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
