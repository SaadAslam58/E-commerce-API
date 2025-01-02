import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full md:h-screen h-screen  justify-center items-center flex ">
      <div className="flex lg:flex-row md:flex-col flex-col gap-5 lg:gap-0 md:gap-5 justify-between w-[90%] items-center ">
        <div className="flex flex-col gap-7">
          <h1 className=" text-center md:text-left text-3xl md:text-6xl font-bold font-mono">
            Discover the Best Deals Today!
          </h1>
          <p className="md:flex flex-row md:flex-col text-lg md:text-2xl  font-semibold  font-serif">
            Explore our wide range of products{" "}
            <span> and enjoy unbeatable discounts.</span>
          </p>
        </div>
        <div className="relative">
          <Image
            src="/hero.jpg"
            alt="image"
            width={500}
            height={500}
            className="rounded-3xl shadow-lg border"
          />
          <p className="absolute inset-0 text-center content-center text-3xl right-2 -rotate-6">
            Shop No<span className="text-white text-4xl">w!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
