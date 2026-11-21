import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import Toast from '../Toast';

const ToastList = ({
  data,
  position = 'top-right',
  removeToast,
}: {
  data: any[];
  position?: string;
  removeToast: Function;
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo(0, position.startsWith('top') ? el.scrollHeight : 0);
  }, [position, data]);

  return (
    <div
      className="toast-list fixed p-[1em] w-full max-w-[400px] max-h-screen top-0 right-0 xl:top-2 overflow-x-hidden overflow-y-auto"
      aria-live="assertive"
      ref={listRef}
    >
      <AnimatePresence initial={false}>
        {data.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

ToastList.propTypes = {
  data: PropTypes.array.isRequired,
  position: PropTypes.string,
  removeToast: PropTypes.func.isRequired,
};

export default ToastList;
