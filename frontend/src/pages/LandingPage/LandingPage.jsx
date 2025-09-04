import React from "react";
import ThemeToggle from "../../components/ThemeButton/ThemeButton";
import { assets } from "../../assets/assets";
import Header from "../../components/Header/Header.jsx";
import Companies from "../../components/Companies/Companies.jsx";
import Carousel from "../../components/Carousel/Carousel.jsx";

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
  // {
  //   image: img3,
  //   heading: "Flexible Learning",
  //   description: "Study at your own pace and boost your career.",
  // },
];

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Companies />
      </div>
      <div className="carousel-componentw-full">

      <Carousel slides={slidesData} />
      </div>
    </>
  );
};

export default LandingPage;
