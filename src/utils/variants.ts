export const scaleUp = (delay?: number) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        ease: "linear",
        duration: 1.2,
        delay,
      },
    },
  };
};

export const fadeIn = (direction: string, delay?: number) => {

  return {
    hidden: {
      y: direction === "up" ? -40 : direction == "down" ? 40 : 0,
      x: direction === "left" ? -40 : direction == "right" ? 40 : 0,
      opacity: 0,
    },
    visible: {
    y: 0,
    x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: [0.25, 0.25, 0.25, 0.75],
        duration: 1.2,
        delay,
      },
    },
  };
};
