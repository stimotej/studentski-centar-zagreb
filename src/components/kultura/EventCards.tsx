import type { Post, Event } from "@/features/types";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DisplayHTML from "../elements/DisplayHTML";
import Spinner from "../elements/Spinner";
import Card from "../shared/Card";

interface EventCardsProps {
  events: Event[] | undefined;
  loading: boolean;
  emptyMessage?: string;
  className?: string;
  classNameEmpty?: string;
  classNameLoading?: string;
}

const EventCards: React.FC<EventCardsProps> = (props) => {
  return props.loading ? (
    <div
      className={clsx(
        "py-12 flex items-center justify-center",
        props.classNameLoading
      )}
    >
      <Spinner />
    </div>
  ) : props.events && props.events.length <= 0 ? (
    <div className={clsx("text-light text-center", props.classNameEmpty)}>
      {props.emptyMessage || "Nema evenata za prikaz"}
    </div>
  ) : (
    <div className={props.className}>
      {props.events?.map((event, index) => (
        <EventCard
          key={event.slug + event.event_date}
          title={event.title}
          location={event.location}
          date={event.event_date}
          image={event.image}
          link={`/kultura/eventi/${event.slug}`}
          reverse={index % 2 === 0}
        />
      ))}
    </div>
  );
};

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  link: string;
  reverse?: boolean;
}

const EventCard: React.FC<EventCardProps> = (props) => {
  return (
    <div
      className={clsx(
        "relative p-3 border-gray-200 w-full lg:w-1/2",
        props.reverse
          ? "border-l-2 lg:border-l-0 lg:border-r-2 lg:ml-px"
          : "border-l-2 ml-0 lg:ml-auto lg:mr-px"
      )}
    >
      <div
        className={clsx(
          "w-3 h-3 bg-gray-200 rounded-full absolute top-1/2 transform -translate-y-1/2",
          props.reverse
            ? "-left-[7px] lg:left-auto lg:-right-[7px]"
            : "-left-[7px]"
        )}
      ></div>
      <Link href={props.link}>
        <Card
          className={clsx(
            props.reverse
              ? "flex-row lg:flex-row-reverse text-left lg:text-right"
              : "flex-row",
            "flex gap-4 !p-4"
          )}
        >
          <Image
            src={props.image}
            alt={props.title}
            width={60}
            height={60}
            className="w-[60px] h-[60px] rounded-lg object-cover"
          />
          <div className="flex flex-col gap-2">
            <div className="text-light">{`${dayjs(props.date).format(
              "DD.MM.YYYY [u] HH:mm[h]"
            )}, ${props.location}`}</div>
            <DisplayHTML
              html={props.title}
              className="text-text text-lg font-semibold"
            />
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default EventCards;
