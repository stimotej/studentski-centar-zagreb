import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { MdClose, MdFilterList } from "react-icons/md";
import Spinner from "./Spinner";
import { motion } from "framer-motion";

interface FilterSelectProps {
  value: number;
  onChange: (value: number) => void;
  title: string;
  className?: string;
  loading?: boolean;
  items: { title: string; value: number }[];
}

const FilterSelect: React.FC<FilterSelectProps> = (props) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  return (
    <>
      {opened && (
        <div className="md:hidden fixed inset-0 bg-black/40 z-50"></div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={clsx(
          "md:static md:block md:p-0 md:rounded-none",
          opened
            ? "fixed inset-0 top-8 z-50 overflow-auto bg-white p-6 rounded-lg"
            : "hidden",
          props.className
        )}
      >
        <h3 className="md:hidden text-xl text-text font-semibold mb-8">
          Filteri
        </h3>
        <div className="h-1 w-6 bg-primary mb-1"></div>
        <div className="text-lg font-medium">{props.title}</div>
        <div className="flex flex-col mt-3">
          {props.items.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                props.onChange(item.value);
                setOpened(false);
              }}
              className={clsx(
                "flex items-center justify-between text-sm text-left p-4 text-text border-b border-gray-100",
                item.value === props.value
                  ? "bg-primary/5 border-b-primary/25"
                  : "hover:bg-gray-50"
              )}
            >
              {item.title}
              {item.value === props.value && props.loading && (
                <Spinner size={18} />
              )}
            </button>
          ))}
        </div>
      </motion.div>
      <button
        onClick={() => setOpened(!opened)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-primary text-white rounded-full p-4"
      >
        {opened ? <MdClose size={24} /> : <MdFilterList size={24} />}
      </button>
    </>
  );
};

export default FilterSelect;
