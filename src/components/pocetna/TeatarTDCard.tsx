import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Card from "../shared/Card";

interface TeatarTDCardProps {
  className?: string;
}

const TeatarTDCard: React.FC<TeatarTDCardProps> = (props) => {
  return (
    <Card className={clsx("w-full", props.className)}>
      <Image
        src="/sczg/slike/teatar-td-logo.jpg"
        alt="Teata&TD"
        width={200}
        height={200}
        className="w-full h-[200px] object-contain"
      />
      <p className="text-light">
        Ulaznice za predstave Teatra &TD, koncerte i određene filmske projekcije
        u SC-u, osim na našim blagajnama možete kupiti i putem online platforme
        za prodaju ulaznica Ulaznice.hr te na njihovim prodajnim mjestima.
      </p>
    </Card>
  );
};

export default TeatarTDCard;
