import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Toast from "../Toast";

const ToastList = ({ data, position, removeToast }: { data: any[], position: string, removeToast: Function }) => {
  const listRef = useRef(null);

  const handleScrolling = (el: HTMLElement | null) => {
    const isTopPosition = ["top-left", "top-right"].includes(position);
    el?.scrollTo(0, el.scrollHeight);
    if (isTopPosition) {
    } else {
      el?.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [position, data]);


  return (
    data.length > 0 && (
      <div
        className="fixed p-[1em] w-full max-w-[400px] max-h-screen top-0 right-0 xl:top-2 overflow-x-hidden overflow-y-auto"
        aria-live="assertive"
        ref={listRef}
      >
        {data.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    )
  );
};

ToastList.defaultProps = {
  position: "top-right",
};

ToastList.propTypes = {
  data: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired,
  removeToast: PropTypes.func.isRequired,
};

export default ToastList;
