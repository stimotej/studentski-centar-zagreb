import Image from "next/image";
import React, { useState } from "react";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import DisplayHTML from "../elements/DisplayHTML";
import BlueCard from "../shared/BlueCard";

export type InfoToggleItem = {
  id: number;
  image: string;
  title: string;
  content: string;
};

interface InfoTogglesProps {
  className?: string;
  items: InfoToggleItem[];
}

const InfoToggles: React.FC<InfoTogglesProps> = (props) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const items = props.items;

  if (!items.length) return null;

  return (
    <BlueCard className={props.className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ToggleCard
            key={item.id}
            active={activeCard === item.id}
            onClick={() =>
              item.id === activeCard
                ? setActiveCard(null)
                : setActiveCard(item.id)
            }
            image={item.image}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
      {activeCard ? (
        <div className="mt-6 hidden lg:block">
          <DisplayHTML
            html={items.find((item) => item.id === activeCard)?.content || ""}
            className="white-links"
          />
        </div>
      ) : null}
    </BlueCard>
  );
};

interface ToggleCardProps {
  active: boolean;
  onClick: () => void;
  image: string;
  title: string;
  content: string;
}

const ToggleCard: React.FC<ToggleCardProps> = (props) => {
  return (
    <div className="flex-1">
      <div className="bg-white p-8 rounded-lg">
        {!!props.image && (
          <Image
            src={props.image}
            alt={props.title}
            width={90}
            height={90}
            className="w-[90px] h-[90px] object-contain mx-auto"
          />
        )}
        <div className="text-text font-semibold uppercase text-xs tracking-wider text-center mt-6">
          {props.title}
        </div>
      </div>
      <button
        onClick={props.onClick}
        className="flex w-full py-4 items-center justify-between gap-4 text-xs uppercase font-medium tracking-wider"
      >
        Više informacija
        {props.active ? (
          <MdRemoveCircle className="text-white/60" size={16} />
        ) : (
          <MdAddCircle className="text-white/60" size={16} />
        )}
      </button>
      {props.active ? (
        <div className="mt-6 lg:hidden">
          <DisplayHTML html={props.content} className="white-links" />
        </div>
      ) : null}
    </div>
  );
};

export default InfoToggles;
