import React from "react";
import Card from "../shared/Card";
import Image from "next/image";

interface UlazniceZaTDProps {
  className?: string;
}

const UlazniceZaTD: React.FC<UlazniceZaTDProps> = (props) => {
  return (
    <Card className={props.className}>
      <div className="flex flex-col items-center justify-center gap-4">
        <a href="https://www.ulaznice.hr/web/">
          <Image
            width={230}
            height={70}
            alt="Ulaznice.hr logo"
            src="/slike/logo-ulaznice-hr.png"
            className="lg:w-[200px] h-auto object-cover"
          />
        </a>
        <p className="text-light text-center">
          Ulaznice za predstave Teatra &TD, koncerte i određene filmske
          projekcije u SC-u, osim na našim blagajnama možete kupiti i putem
          online platforme za prodaju ulaznica Ulaznice.hr te na njihovim
          prodajnim mjestima.
        </p>
      </div>
    </Card>
  );
};

export default UlazniceZaTD;
