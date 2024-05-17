// components/SplashScreen.js

import { motion } from "framer-motion";
import { exit } from "process";

const splashScreenVariants = {
  hidden: { translateY: 1000 },
  visible: { opacity: 1, translateY: 0 },
  exit: { translateY: -1000 },
};

const spanVariants = (delay: number) => {
  return {
    hidden: {
      translateY: 100,
      opacity: 0,
    },
    visible: {
      translateY: 1,
      opacity: 1,
      transition: {
        type: "spring",
        ease: "linear",
        duration: 1.5,
        delay,
      },
    },
  };
};

export default function SplashScreen() {
  return (
    <motion.div
      className="flex justify-center items-center flex-col lg:flex-row gap-2 h-screen w-full bg-white text-black"
      variants={splashScreenVariants}
      initial="visible"
      //   animate="visible"
      exit="exit"
      transition={{ ease: "backInOut", duration: 1 }}
    >
      <motion.span
        initial="hidden"
        animate="visible"
        variants={spanVariants(0)}
        className="font-anton text-8xl"
      >
        Dawn,
      </motion.span>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={spanVariants(0.3)}
        className="font-anton text-8xl"
      >
        Dreams,
      </motion.span>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={spanVariants(0.6)}
        className="font-anton text-8xl"
      >
        Dusk
      </motion.span>
    </motion.div>
  );
}
