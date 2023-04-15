import React, { useEffect, useState } from "react";
import { MdExpandLess } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const ScrollToTop: React.FC = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.pageYOffset;

      if (scrollOffset > 500 && !opened) {
        setOpened(true);
      } else if (scrollOffset <= 500 && opened) {
        setOpened(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [opened]);

  const handleScrollToTop = () => {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollStep = scrollTop / 20;
      const scrollInterval = setInterval(() => {
        if (window.pageYOffset > 0) {
          window.scrollBy(0, -scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 16);
    }
  };

  return (
    <AnimatePresence>
      {opened ? (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          exit={{ width: 0 }}
          className="fixed top-3/4 right-0 flex items-start z-50"
        >
          <button
            onClick={handleScrollToTop}
            className="bg-light text-white p-2 rounded-l-lg"
          >
            <MdExpandLess size={24} />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ScrollToTop;
