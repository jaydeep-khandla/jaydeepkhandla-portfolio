"use client";
import React from "react";
import { delay, motion } from "framer-motion";
import PropTypes from "prop-types";

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
  </svg>
);

const fadeOut = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      ease: "linear",
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const Toast = ({
  message,
  onClose,
}: {
  message: string;
  type: string;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeOut}
      transition={{ ease: "backInOut", duration: 0.8 }}
      className="relative flex justify-between items-center border-2 border-white p-[1em] text-white rounded-lg"
      role="alert"
    >
      <div className="flex gap-[1em] items-start">
        <p>{message}</p>
      </div>
      <button
        className="leading-none h-[1em] w-[1em] cursor-pointer text-inherit opacity-75 p-0 border-[none]"
        onClick={onClose}
      >
        <span className="w-[1em] h-[1em] fill-current">
          <CloseIcon />
        </span>
      </button>
    </motion.div>
  );
};

Toast.defaultProps = {
  type: "success",
  message: "Add a meaningful toast message here.",
};

Toast.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
