import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import "./Carousel.css";

const Carousel = ({ slides, autoScroll = true, interval = 4000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoScroll) return;
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(timer);
  }, [current, autoScroll, interval]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
      {/* Slide wrapper */}
      <motion.div
        className="flex w-full h-full"
        animate={{ x: `-${current * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-full object-cover"
            />
            {/* Overlay Card */}
            <div className="carousel-card absolute top-1/2 left-10 sm:left-13 md:left-17 transform -translate-y-1/2 bg-white/90 p-3 sm:p-4 md:p-6 rounded-lg shadow-lg max-w-[80%] sm:max-w-xs md:max-w-md">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                {slide.heading}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-3 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-3 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
              i === current ? "bg-white" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
