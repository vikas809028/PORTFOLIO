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
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <TextGenerateEffect
              words="Transforming Concepts into Seamless User Experiences"
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
            />

            <p className="text-center p-4 md:tracking-wider my-4 text-sm md:text-lg lg:text-xl">
              Hi! I’m Vikas, a passionate MERN Developer building scalable web
              apps, turning ideas into reality, and constantly exploring new
              technologies.
            </p>

            <div className="flex flex-wrap mt-4 gap-2 justify-center">
            <a href="#about" className="m-2">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
              
            </a>
            <a className="m-2" href="https://drive.google.com/file/d/1fusTlhuvpbGfvukQGUWTBf7xNtbbNNGt/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
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
