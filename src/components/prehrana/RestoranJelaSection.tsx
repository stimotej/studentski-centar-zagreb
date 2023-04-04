import Image from "next/image";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Button from "../elements/Button";

interface RestoranJelaProps {
  className?: string;
}

const alergeni = [
  {
    label: "A",
    description: "žitarice koje sadrže gluten i proizvodi od tih žitarica",
  },
  {
    label: "B",
    description: "rakovi i proizvodi od rakova",
  },
  {
    label: "C",
    description: "jaja i proizvodi od jaja",
  },
  {
    label: "D",
    description: "riba i riblji proizvodi",
  },
  {
    label: "E",
    description: "kikiriki i proizvodi od kikirikija",
  },
  {
    label: "F",
    description: "zrna soje i proizvodi od soje",
  },
  {
    label: "G",
    description: "mlijeko i mliječni proizvodi (uključujući laktozu)",
  },
  {
    label: "H",
    description: "orašasto voće i njegovi proizvodi",
  },
  {
    label: "I",
    description: "celer i njegovi proizvodi",
  },
  {
    label: "J",
    description: "gorušica i proizvodi od gorušice",
  },
  {
    label: "K",
    description: "sjeme sezama i proizvodi od sjemena sezama",
  },
  {
    label: "L",
    description: "sumporni dioksid i sulfiti",
  },
  {
    label: "M",
    description: "lupina i proizvodi od lupine",
  },
  {
    label: "N",
    description: "mekušci i proizvodi od mekušaca",
  },
  {
    label: "*",
    description: "može sadržavati navedeni alergen",
  },
];

const RestoranJelaSection: React.FC<RestoranJelaProps> = (props) => {
  const [modalOpened, setModalOpened] = React.useState(false);

  useEffect(() => {
    document.body.style.overflow = modalOpened ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpened]);

  return (
    <section className={props.className}>
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex-1">
          <h3 className="text-[38px] text-text font-semibold leading-normal">
            Sva jela pripremljena su od profesionalnih kuhara sa svježim i
            kvalitetnim sastojcima.
          </h3>
          <p className="mt-4 text-light leading-relaxed">
            Za kvalitetniju pripremu jela koriste se kvalitetni sastojci sa
            fokusom da se pri kuhanju maksimalno iskoriste nutritivne
            vrijednosti namirnica. Detaljan opis alergena potražite na linku u
            nastavku.
          </p>
          <Button
            className="mt-6"
            onClick={() => setModalOpened((isOpened) => !isOpened)}
          >
            Alergeni
          </Button>
        </div>
        <div className="flex-1">
          <Image
            src="/sczg/slike/prehrana/restoran_jela.png"
            alt="Važnost kvalitetne prehrane"
            width={400}
            height={360}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {modalOpened && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 overflow-y-scroll"
            onClick={() => setModalOpened(false)}
          ></div>
          <div className="p-6 w-[90%] sm:w-3/4 md:w-2/3 max-h-[90%] overflow-y-auto rounded-lg fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50 bg-white">
            <div className="flex item-center justify-between">
              <h5 className="text-xl font-medium">Alergeni</h5>
              <button
                onClick={() => setModalOpened(false)}
                className="p-1 hover:bg-gray-100 active:bg-gray-200 rounded-full"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="w-full mt-4">
              {alergeni.map((alergen) => (
                <div key={alergen.label} className="flex items-center gap-2">
                  <span className="mr-2 text-text font-medium">
                    {alergen.label}
                  </span>
                  <span className="mr-2 text-light border-b border-gray-200 py-2 flex-1">
                    {alergen.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default RestoranJelaSection;
