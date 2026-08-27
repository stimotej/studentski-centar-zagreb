import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface CardImageProps {
  src: string;
  alt: string;
  /** The box the image lives in, e.g. "aspect-[16/10] w-full". */
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Shows the whole image, never cropped, inside a fixed-ratio box.
 * A blurred, scaled copy of the same image fills the leftover space so that
 * off-ratio uploads (posters, portraits) still read as a designed card.
 * Both layers share one src, so the browser downloads the image once.
 */
const CardImage: React.FC<CardImageProps> = (props) => {
  const sizes = props.sizes || "(max-width: 768px) 90vw, 400px";

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-lg bg-neutral-100",
        props.className
      )}
    >
      <Image
        src={props.src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className="object-cover scale-125 blur-2xl saturate-150 opacity-60"
      />
      <Image
        src={props.src}
        alt={props.alt}
        fill
        sizes={sizes}
        priority={props.priority}
        className="relative object-contain"
      />
    </div>
  );
};

export default CardImage;
