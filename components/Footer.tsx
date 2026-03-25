/* eslint-disable @next/next/no-img-element */
"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState(2026);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    // Detect mobile for responsive adjustments
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Function to get social media name from image path
  const getSocialMediaName = (imgPath: string) => {
    const name = imgPath.split('/').pop()?.replace('.svg', '') || '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Colorful animation variants for social icons
  const iconVariants = {
    initial: { 
      scale: 1,
      rotate: 0,
      filter: "brightness(1) saturate(1)"
    },
    hover: { 
      scale: isMobile ? 1.1 : 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      filter: "brightness(1.2) saturate(1.5) drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))",
      transition: { 
        duration: 0.4,
        rotate: { duration: 0.5, ease: "easeInOut" }
      }
    },
    tap: { scale: 0.95 }
  };

  // Background gradient animation for icons
  const backgroundVariants = {
    initial: {
      background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)",
      borderColor: "rgba(139,92,246,0.3)"
    },
    hover: {
      background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.2) 100%)",
      borderColor: "rgba(139,92,246,0.6)",
      boxShadow: "0 0 20px rgba(139,92,246,0.3)",
      transition: { duration: 0.3 }
    }
  };

  // Colorful animation for the CTA button
  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0 0 0px rgba(139,92,246,0)" },
    hover: { 
      scale: isMobile ? 1.02 : 1.05,
      boxShadow: "0 0 25px rgba(139,92,246,0.5)",
      transition: { duration: 0.3, yoyo: Infinity, repeatDelay: 1 }
    },
    tap: { scale: 0.98 }
  };

  // Floating animation for the entire footer
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="w-full pb-4 relative overflow-hidden"
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      
      {/* Floating particles effect - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="flex flex-col items-center relative z-10"
        variants={itemVariants}
      >
        <motion.h1 
          className="heading lg:max-w-[45vw] text-center px-4"
          variants={itemVariants}
        >
          Ready to take <span className="text-purple relative inline-block">
            your
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </span> digital
          presence to the next level?
        </motion.h1>
        
        <motion.p 
          className={`text-white-200 ${isMobile ? "mt-5 my-3 p-4 text-base" : "md:mt-10 my-5 p-8 text-lg lg:text-xl"} text-center`}
          variants={itemVariants}
        >
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </motion.p>
        
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate={!isMobile ? {
            y: [0, -5, 0],
          } : {}}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }
          }}
        >
          <a href="mailto:vikastiwari809028@gmail.com">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        className={`flex ${isMobile ? "mt-8" : "mt-16"} md:flex-row flex-col gap-4 justify-between items-center relative z-10 px-4`}
        variants={itemVariants}
      >
        <motion.p 
          className="md:text-base text-sm md:font-normal font-light text-center"
          whileHover={!isMobile ? { scale: 1.05, color: "#a78bfa" } : {}}
          transition={{ duration: 0.3 }}
        >
          Copyright © {currentYear} Vikas Tiwari
        </motion.p>

        <div className={`flex items-center ${isMobile ? "gap-4" : "md:gap-3 gap-6"}`}>
          {socialMedia.map((info, index) => (
            <motion.div
              key={info.id}
              className="relative cursor-pointer"
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              variants={iconVariants}
              initial="initial"
              whileHover={!isMobile ? "hover" : undefined}
              whileTap="tap"
              animate={{
                y: !isMobile && hoveredIndex === index ? -5 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Glow effect behind icon */}
              <motion.div
                className="absolute inset-0 rounded-lg blur-md"
                animate={{
                  opacity: !isMobile && hoveredIndex === index ? 0.8 : 0,
                  scale: !isMobile && hoveredIndex === index ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(59,130,246,0.4) 100%)",
                }}
              />
              
              {/* Icon container with animated background */}
              <motion.div
                className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 rounded-lg border relative overflow-hidden`}
                variants={backgroundVariants}
                initial="initial"
                whileHover={!isMobile ? "hover" : undefined}
                style={{
                  background: "rgba(0,0,0,0.75)",
                  borderWidth: "1px",
                }}
              >
                {/* Animated gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{
                    opacity: !isMobile && hoveredIndex === index ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #ec489a)",
                  }}
                />
                
                {/* Icon image with color animation */}
                <motion.img 
                  src={info.img} 
                  alt={`Social media icon ${index + 1}`}
                  width={isMobile ? 16 : 20}
                  height={isMobile ? 16 : 20}
                  className="relative z-10"
                  animate={{
                    filter: !isMobile && hoveredIndex === index 
                      ? "brightness(1.2) saturate(1.5) drop-shadow(0 0 4px rgba(139,92,246,0.8))" 
                      : "brightness(1) saturate(1)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Tooltip on hover - only on desktop */}
              {!isMobile && (
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 rounded text-xs whitespace-nowrap pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {getSocialMediaName(info.img)}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative animated border at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.footer>
  );
};

export default Footer;