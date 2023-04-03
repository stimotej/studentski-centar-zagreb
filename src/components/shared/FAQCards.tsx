import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { MdAddCircle, MdDoNotDisturbOn } from "react-icons/md";
import DisplayHTML from "../elements/DisplayHTML";
import Spinner from "../elements/Spinner";

interface FAQCardsProps {
  items: { title: string; content: string }[];
  emptyText?: string;
  className?: string;
  loading?: boolean;
}

const FAQCards: React.FC<FAQCardsProps> = (props) => {
  if (props.loading) return <Spinner size={24} className="mx-auto" />;
  const numberOfItems = props.items.length;
  return (
    <div className={clsx("flex flex-col lg:flex-row", props.className)}>
      <div className="flex flex-col flex-1">
        {props.items.slice(0, numberOfItems / 2).map((item, index) => (
          <FAQSingleCard
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
      <div className="flex flex-col flex-1">
        {props.items
          .slice(numberOfItems / 2, numberOfItems)
          .map((item, index) => (
            <FAQSingleCard
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
      </div>
    </div>
  );
};

interface FAQSingleCardProps {
  title: string;
  content: string;
}

const FAQSingleCard: React.FC<FAQSingleCardProps> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="border-b border-primary/10">
      <button
        onClick={() => setOpened((isOpened) => !isOpened)}
        className="uppercase text-sm font-medium text-light tracking-wide hover:bg-gray-100 flex items-center justify-between w-full p-6"
      >
        <DisplayHTML html={props.title} className="text-left flex-1" />
        {opened ? (
          <MdDoNotDisturbOn size={18} className="text-primary" />
        ) : (
          <MdAddCircle size={18} className="text-primary" />
        )}
      </button>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="px-6 overflow-hidden"
          >
            <DisplayHTML html={props.content} className="text-light !pb-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQCards;
