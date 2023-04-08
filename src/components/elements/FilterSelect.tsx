import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { MdClose, MdFilterList } from "react-icons/md";
import Spinner from "./Spinner";
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence>
        {opened && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpened(false)}
              className={clsx(
                "fixed inset-0 bg-black/40 z-50",
                !opened && "md:hidden"
              )}
            ></motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className={clsx(
                "fixed left-0 bottom-0 right-0 max-h-[90%] z-50 overflow-auto bg-white rounded-lg",
                !opened && "md:hidden",
                props.className
              )}
            >
              <div className="p-6">
                <h3 className="text-xl text-text font-semibold mb-8">
                  Filteri
                </h3>
                <Filters
                  title={props.title}
                  value={props.value}
                  onChange={(value) => {
                    props.onChange(value);
                    setOpened(false);
                  }}
                  loading={props.loading}
                  items={props.items}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div
        className={clsx(
          "hidden md:static md:block md:p-0 md:rounded-none",
          props.className
        )}
      >
        <Filters
          title={props.title}
          value={props.value}
          onChange={(value) => {
            props.onChange(value);
            setOpened(false);
          }}
          loading={props.loading}
          items={props.items}
        />
      </div>
      <button
        onClick={() => setOpened(!opened)}
        className={clsx(
          "fixed bottom-4 right-4 z-50 bg-primary text-white rounded-full p-4",
          !opened && "md:hidden"
        )}
      >
        {opened ? <MdClose size={24} /> : <MdFilterList size={24} />}
      </button>
    </>
  );
};

interface FiltersProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  loading?: boolean;
  items: { title: string; value: number }[];
}

const Filters: React.FC<FiltersProps> = (props) => {
  return (
    <>
      <div className="h-1 w-6 bg-primary mb-1"></div>
      <div className="text-lg font-medium">{props.title}</div>
      <div className="flex flex-col mt-3">
        {props.items.map((item) => (
          <button
            key={item.value}
            onClick={() => {
              props.onChange(item.value);
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
    </>
  );
};

export default FilterSelect;
