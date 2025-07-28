import Image from "next/image";
import React, { Suspense, lazy } from "react";
import { FaLocationArrow } from "react-icons/fa6";

const MagicButton = lazy(() => import("./ui/MagicButton"));
const TextGenerateEffect = lazy(() => import("./ui/TextGenerateEffect"));

const Hero = () => {
  return (
    <div className="pb-12 pt-36">
      <Suspense fallback={<div>Loading...</div>}>
        {/* Lazy-loaded components */}
        <div className="flex justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-3xl lg:max-w-[70vw] flex flex-col items-center justify-center">
            <TextGenerateEffect
              words="Transforming Concepts into Seamless User Experiences"
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
            />

            <div className="flex flex-col items-center justify-center mt-4  lg:flex-row">
              
                <Image
                  src="/myself.jpg"
                  alt="Hero Image"
                  width={200}
                  height={200}
                  className="p-1 rounded-full shadow-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  priority
                />
              
              <p className="text-center p-4 my-4 text-md md:text-lg lg:text-xl">
                Hi! I’m Vikas Tiwari, a passionate Full Stack Developer and
                DevOps Engineer building scalable web apps, turning ideas into
                reality, and constantly trying to explore new technologies.
              </p>
            </div>

            <div className="flex flex-wrap mt-4 gap-2 justify-center">
              <a
                className="m-2"
                href="https://drive.google.com/file/d/1HFrZMCR8zvNjAsrGwZMRg4V610uoRB2X/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagicButton
                  title="My Resume"
                  icon={<FaLocationArrow />}
                  position="right"
                />
              </a>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Hero;
