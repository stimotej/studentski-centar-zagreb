import React from "react";
import Card from "../shared/Card";
import Image from "next/image";
import Link from "next/link";

interface UlazniceZaTDProps {
  className?: string;
}

const UlazniceZaTD: React.FC<UlazniceZaTDProps> = (props) => {
  return (
    <Card className={props.className}>
      <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-6">
        <div className="flex-1">
          <h3 className="text-xl lg:text-2xl font-bold">
            Ulaznice za &TD dostupne i u online prodaji!
          </h3>
          <p className="mt-2 text-light">
            Ulaznice za predstave Teatra &TD, koncerte i određene filmske
            projekcije u SC-u, osim na našim blagajnama možete kupiti i putem
            online platforme za prodaju ulaznica Ulaznice.hr te na njihovim
            prodajnim mjestima.
          </p>
        </div>
        <a href="https://www.ulaznice.hr/web/">
          <Image
            width={230}
            height={70}
            alt="Ulaznice.hr logo"
            src="/slike/logo-ulaznice-hr.png"
            className="lg:w-[200px] h-auto object-cover"
          />
        </a>
      </div>
    </Card>
  );
};

export default UlazniceZaTD;
