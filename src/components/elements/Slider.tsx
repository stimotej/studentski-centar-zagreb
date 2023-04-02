import clsx from "clsx";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface Slide {
  src: string;
  title: string;
  subtitle: string;
  actionTitle: string;
  actionHref: string;
}

interface SliderProps {
  slides: Slide[];
  className?: string;
}

export default function Slider({ slides, className }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderDisabled, setSliderDisabled] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const endX = useRef(0);
  const endY = useRef(0);

  const slideTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearInterval(slideTimerRef.current);
    slideTimerRef.current = setInterval(() => {
      if (currentSlide === slides.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 5000);

    return () => clearInterval(slideTimerRef.current);
  }, [currentSlide, slides.length]);

  function handlePrevSlide() {
    if (sliderDisabled) return;

    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }

    setSliderDisabled(true);
    setTimeout(() => setSliderDisabled(false), 800);
  }

  function handleNextSlide() {
    if (sliderDisabled) return;

    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }

    setSliderDisabled(true);
    setTimeout(() => setSliderDisabled(false), 800);
  }

  function handleSwipeStart(event: React.MouseEvent<HTMLDivElement>) {
    startX.current = event.clientX;
    startY.current = event.clientY;
  }

  function handleSwipeEnd(event: React.MouseEvent<HTMLDivElement>) {
    endX.current = event.clientX;
    endY.current = event.clientY;
    const deltaX = endX.current - startX.current;
    const deltaY = endY.current - startY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) handleNextSlide();
      else handlePrevSlide();
    }
  }

  // Set event type for touch events
  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    startX.current = event.touches[0]?.clientX || 0;
    startY.current = event.touches[0]?.clientY || 0;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    endX.current = event.changedTouches[0]?.clientX || 0;
    endY.current = event.changedTouches[0]?.clientY || 0;
    const deltaX = endX.current - startX.current;
    const deltaY = endY.current - startY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) handleNextSlide();
      else handlePrevSlide();
    }
  }

  return (
    <div
      className={`group relative h-[100svh] h-[100vh] overflow-hidden ${
        className || ""
      }`}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          onMouseDown={handleSwipeStart}
          onMouseUp={handleSwipeEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.title}
            className={clsx(
              "absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-300",
              index === currentSlide && "z-[1] opacity-100"
            )}
            width={1600}
            height={900}
          />
          <div
            className={clsx(
              "absolute inset-0 h-full w-full bg-black opacity-60",
              index === currentSlide && "z-10"
            )}
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 z-20 transform-gpu text-center text-white [transition:transform_1s_ease,opacity_0.4s_ease] ${
              index === currentSlide
                ? "-translate-x-1/2 -translate-y-1/2 opacity-100"
                : " -translate-x-1/2 translate-y-full opacity-0"
            }`}
          >
            <h1 className="mb-6 text-3xl font-bold">{slide.title}</h1>
            <p className="mb-4">{slide.subtitle}</p>
            <div className="flex items-center justify-center">
              <a
                href={slide.actionHref}
                className="w-fit rounded-full bg-white/20 px-4 py-3 font-semibold transition-colors hover:bg-primary"
              >
                {slide.actionTitle}
              </a>
            </div>
          </div>
        </div>
      ))}
      <button
        className="absolute top-1/2 left-6 z-30 -translate-x-full transform-gpu text-4xl text-white opacity-0 transition-[transform,opacity] group-hover:translate-x-0 group-hover:opacity-100"
        onClick={handlePrevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-6 z-30 translate-x-full transform-gpu text-4xl text-white opacity-0 transition-[transform,opacity] group-hover:translate-x-0 group-hover:opacity-100"
        onClick={handleNextSlide}
      >
        &#10095;
      </button>
      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 transform">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`mx-1 h-2 w-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-white" : "bg-white/20"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
