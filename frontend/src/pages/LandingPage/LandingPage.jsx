import React from "react";
import ThemeToggle from "../../components/ThemeButton/ThemeButton";
import { assets } from "../../assets/assets";
import Header from "../../components/Header/Header.jsx";
import Companies from "../../components/Companies/Companies.jsx";
import Carousel from "../../components/Carousel/Carousel.jsx";
import FeaturedCoursesSection from "../../components/FeaturedCoursesSection/FeaturedCoursesSection.jsx";
import FeatureCard from "../../components/FeatureCard/FeatureCard.jsx";

const slidesData = [
  {
    image: assets.carousel_1,
    heading: "Skills that drive you forward",
    description:
      "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
  },
  {
    image: assets.carousel_2,
    heading: "Learn from the best",
    description: "Top industry experts to guide you at every step.",
  },
  {
    image: assets.carousel_3,
    heading: "A World of Knowledge Awaits",
    description:
      "With a constantly expanding library of courses on cutting-edge topics, your next learning adventure is just a click away.",
  },
];
const featureCardData = [
  {
    image: assets.featured_course_1,
    title: "Build & Deploy: Full Stack Web Development",
    rating: "4.9",
    hours: "50+",
  },
  {
    image: assets.featured_course_2,
    title: "Smart Systems: Applied Machine Learning",
    rating: "4.9",
    hours: "50+",
  },
  {
    image: assets.featured_course_3,
    title: "Docker & Kubernetes: Mastering Containers",
    rating: "4.9",
    hours: "50+",
  },
];
const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Companies />
      </div>
      <div className="carousel-component w-full">
        <Carousel slides={slidesData} />
      </div>
      <div className="featured-component w-full ">
        <FeaturedCoursesSection />
      </div>
      <div className="featured-card-row w-full flex flex-wrap justify-evenly gap-5 mb-20 md:mb-30">
        {featureCardData.map((card, index) => (
          <FeatureCard
            key={index}
            image={card.image}
            title={card.title}
            rating={card.rating}
            hours={card.hours}
          />
        ))}
      </div>
    </>
  );
};

export default LandingPage;
