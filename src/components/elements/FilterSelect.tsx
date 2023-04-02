import clsx from "clsx";
import React from "react";
import Spinner from "./Spinner";

interface FilterSelectProps {
  value: number;
  onChange: (value: number) => void;
  title: string;
  className?: string;
  loading?: boolean;
  items: { title: string; value: number }[];
}

const FilterSelect: React.FC<FilterSelectProps> = (props) => {
  return (
    <div className={clsx(props.className)}>
      <div className="h-1 w-6 bg-primary mb-1"></div>
      <div className="text-lg font-medium">{props.title}</div>
      <div className="flex flex-col mt-3">
        {props.items.map((item) => (
          <button
            key={item.value}
            onClick={() => props.onChange(item.value)}
            className={clsx(
              "flex items-center justify-between text-sm text-left p-4 text-text  border-b border-gray-100",
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
    </div>
  );
};

export default FilterSelect;
